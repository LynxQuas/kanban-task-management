from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.board import Board
from app.models.column import Column
from app.schemas.board import BoardCreate, BoardResponse, BoardUpdate
from app.models.user import User
from app.core.security import get_current_user
router = APIRouter()

@router.get("/", response_model=list[BoardResponse])
def get_boards(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    boards = (
        db.query(Board)
        .filter(Board.user_id == current_user.id)
        .all()
    )

    return boards

@router.delete("/{board_id}")
def delete_board(
    board_id: int, db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)):
    board = db.query(Board).filter(Board.id == board_id, Board.user_id == current_user.id).first()

    if not board:
        raise HTTPException(status_code=404, detail="Board not found")

    db.delete(board)
    db.commit()

    return {"message": "Board deleted successfully"}

@router.get("/{board_id}", response_model=BoardResponse)
def get_board(
    board_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)):
    board = db.query(Board).filter(Board.id == board_id, Board.user_id == current_user.id).first()

    if not board:
        raise HTTPException( status_code=404, detail="Board not found")

    return board


@router.post("/")
def create_board( 
    board_data: BoardCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)):

    board = Board(
    name=board_data.name,
    user_id=current_user.id,
)

    db.add(board)
    db.flush()

    for column_data in board_data.columns:
        column = Column(
            name=column_data.name,
            position=column_data.position,
            board_id=board.id,
        )

        db.add(column)

    db.commit()
    db.refresh(board)

    return board

@router.put("/{board_id}", response_model=BoardResponse)
def update_board(
    board_id: int,
    board_data: BoardUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    board = db.query(Board).filter(Board.id == board_id, Board.user_id == current_user.id).first()

    if not board:
        raise HTTPException(
            status_code=404,
            detail="Board not found",
        )

    board.name = board_data.name

    existing_columns = {
        column.id: column
        for column in board.columns
    }

    updated_column_ids = {
        column_data.id
        for column_data in board_data.columns
        if column_data.id is not None
    }

    # Delete removed columns
    for column in board.columns:
        if column.id not in updated_column_ids:
            db.delete(column)

    # Update existing columns / create new columns
    for column_data in board_data.columns:

        if column_data.id is not None and column_data.id in existing_columns:
            column = existing_columns[column_data.id]

            column.name = column_data.name
            column.position = column_data.position

        else:
            new_column = Column(
                name=column_data.name,
                position=column_data.position,
                board_id=board.id,
            )

            db.add(new_column)

    db.commit()
    db.refresh(board)

    return board