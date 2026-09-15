from pydantic import BaseModel, ConfigDict, Field

from app.schemas.task import TaskResponse


class ColumnCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    position: int


class BoardCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    columns: list[ColumnCreate]


class ColumnUpdate(BaseModel):
    id: int | None = None
    name: str = Field(min_length=1, max_length=100)
    position: int


class BoardUpdate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    columns: list[ColumnUpdate]


class ColumnResponse(BaseModel):
    id: int
    name: str
    position: int
    board_id: int
    tasks: list[TaskResponse]

    model_config = ConfigDict(from_attributes=True)


class BoardResponse(BaseModel):
    id: int
    name: str
    columns: list[ColumnResponse]

    model_config = ConfigDict(from_attributes=True)