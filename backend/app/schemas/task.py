from datetime import date

from pydantic import BaseModel, ConfigDict, Field


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    description: str = Field(min_length=10, max_length=1000)
    priority: str
    due_date: date
    column_id: int


class TaskResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str
    priority: str
    due_date: date
    column_id: int
