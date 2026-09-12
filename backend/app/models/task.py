from typing import TYPE_CHECKING
from sqlalchemy import Date, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date

from app.base import Base

if TYPE_CHECKING:
    from app.models.column import Column

class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(String(1000))
    priority: Mapped[str] = mapped_column(String(100))
    due_date: Mapped[date] = mapped_column(Date)

    column_id: Mapped[int] = mapped_column(ForeignKey("columns.id"))
    column: Mapped["Column"] = relationship(back_populates="tasks")




