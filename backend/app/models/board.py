from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.base import Base

if TYPE_CHECKING:
    from app.models.column import Column
    from app.models.user import User


class Board(Base):
    __tablename__ = "boards"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    owner: Mapped["User"] = relationship(
        back_populates="boards"
    )

    columns: Mapped[list["Column"]] = relationship(
        back_populates="board",
        cascade="all, delete-orphan",
    )