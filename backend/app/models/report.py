from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config.database import Base


class Report(Base):
    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    scan_id: Mapped[int] = mapped_column(
        ForeignKey("scans.id"),
        unique=True,
        nullable=False
    )

    scan_summary: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    security_findings: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    ai_analysis: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    intrusion_analysis: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    recommendations: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    scan = relationship(
        "Scan",
        back_populates="report"
    )