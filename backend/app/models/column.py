from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.base import Base

if TYPE_CHECKING:
    from app.models.board import Board
    from app.models.task import Task


class Column(Base):
    __tablename__ = "columns"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    position: Mapped[int] = mapped_column(nullable=False)

    board_id: Mapped[int] = mapped_column( ForeignKey("boards.id"), nullable=False)
    board: Mapped["Board"] = relationship( back_populates="columns")

    tasks: Mapped[list["Task"]] = relationship(back_populates="column", cascade="all, delete-orphan")
