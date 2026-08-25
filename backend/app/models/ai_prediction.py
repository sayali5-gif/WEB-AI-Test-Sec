from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config.database import Base


class AIPrediction(Base):
    __tablename__ = "ai_predictions"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    scan_id: Mapped[int] = mapped_column(
        ForeignKey("scans.id"),
        nullable=False
    )

    input_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    prediction: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    confidence: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    model_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    scan = relationship(
        "Scan",
        back_populates="ai_predictions"
    )