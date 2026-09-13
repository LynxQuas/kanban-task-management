from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.board import Board
from app.models.column import Column
from app.schemas.board import BoardCreate, BoardResponse

router = APIRouter()

@router.get("/", response_model=list[BoardResponse])
def get_boards(db: Session = Depends(get_db)):
    boards = db.query(Board).all()
    return boards

@router.delete("/{board_id}")
def delete_board(board_id: int, db: Session = Depends(get_db)):
    board = db.query(Board).filter(Board.id == board_id).first()

    if not board:
        raise HTTPException(status_code=404, detail="Board not found")

    db.delete(board)
    db.commit()

    return {"message": "Board deleted successfully"}

@router.get("/{board_id}", response_model=BoardResponse)
def get_board(board_id: int, db: Session = Depends(get_db)):
    board = db.query(Board).filter(Board.id == board_id).first()

    if not board:
        raise HTTPException( status_code=404, detail="Board not found")

    return board


@router.post("/")
def create_board( board_data: BoardCreate, db: Session = Depends(get_db)):
    board = Board(name=board_data.name)

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


