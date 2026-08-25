from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config.database import Base


class Scan(Base):
    __tablename__ = "scans"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )

    target: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    scan_type: Mapped[str] = mapped_column(
        String(100),
        default="security_scan"
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="pending"
    )

    started_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True
    )

    summary: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    user = relationship(
        "User",
        back_populates="scans"
    )

    vulnerabilities = relationship(
        "Vulnerability",
        back_populates="scan",
        cascade="all, delete-orphan"
    )

    ai_predictions = relationship(
        "AIPrediction",
        back_populates="scan",
        cascade="all, delete-orphan"
    )

    risk_scores = relationship(
        "RiskScore",
        back_populates="scan",
        cascade="all, delete-orphan"
    )

