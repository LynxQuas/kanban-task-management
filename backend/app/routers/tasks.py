from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.board import Board
from app.models.column import Column
from app.models.task import Task
from app.schemas.board import BoardCreate, BoardResponse
from app.schemas.task import TaskCreate, TaskResponse,  TaskUpdate
from app.models.user import User
from app.core.security import get_current_user


router = APIRouter()

@router.get("/", response_model=list[TaskResponse])
def get_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)):
    tasks = db.query(Task).all()
    return tasks

@router.post("/", response_model=TaskResponse)
def create_task(
    task_data: TaskCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)):
    column = db.query(Column).filter(Column.id == task_data.column_id).first()

    if not column:
        raise HTTPException(status_code=404, detail="column not found")

    task = Task(
        title = task_data.title,
        description = task_data.description,
        priority = task_data.priority,
        due_date = task_data.due_date,
        column_id = task_data.column_id
        )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task

@router.delete("/{task_id}")
def delete_task(
    task_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task_title = task.title

    db.delete(task)
    db.commit()

    return {
        "message": f"{task_title} has been deleted successfully."
    }

@router.get("/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return task


@router.patch("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    if task_data.column_id is not None:
        column = (
            db.query(Column)
            .filter(Column.id == task_data.column_id)
            .first()
        )

        if not column:
            raise HTTPException(
                status_code=404,
                detail="Column not found"
            )

    update_data = task_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(task, field, value)

    db.commit()
    db.refresh(task)

    return task