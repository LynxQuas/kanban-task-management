from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.board import Board
from app.models.column import Column
from app.models.task import Task
from app.schemas.board import BoardCreate, BoardResponse
from app.schemas.task import TaskCreate, TaskResponse

router = APIRouter()

@router.get("/", response_model=list[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()
    return tasks

@router.post("/", response_model=TaskResponse)
def create_task(task_data: TaskCreate, db: Session = Depends(get_db)):
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








