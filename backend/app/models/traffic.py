from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text, Float
from sqlalchemy.orm import Mapped, mapped_column

from app.config.database import Base


class TrafficLog(Base):
    __tablename__ = "traffic_logs"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    source_ip: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    method: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    endpoint: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    status_code: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    user_agent: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    classification: Mapped[str] = mapped_column(
        String(50),
        default="normal"
    )

    confidence: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )