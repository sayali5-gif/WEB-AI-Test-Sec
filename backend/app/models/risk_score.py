from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config.database import Base


class RiskScore(Base):
    __tablename__ = "risk_scores"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    scan_id: Mapped[int] = mapped_column(
        ForeignKey("scans.id"),
        nullable=False
    )

    severity_score: Mapped[float] = mapped_column(
        Float,
        default=0.0
    )

    ai_confidence: Mapped[float] = mapped_column(
        Float,
        default=0.0
    )

    impact_score: Mapped[float] = mapped_column(
        Float,
        default=0.0
    )

    final_score: Mapped[float] = mapped_column(
        Float,
        default=0.0
    )

    priority: Mapped[str] = mapped_column(
        String(50),
        default="LOW"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    scan = relationship(
        "Scan",
        back_populates="risk_scores"
    )