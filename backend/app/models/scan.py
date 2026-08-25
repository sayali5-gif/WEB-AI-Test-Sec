from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config.database import Base

if TYPE_CHECKING:
    from app.models.ai_prediction import AIPrediction
    from app.models.report import Report
    from app.models.risk_score import RiskScore
    from app.models.scan_result import ScanResult
    from app.models.user import User
    from app.models.vulnerability import Vulnerability


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
        default="security_scan",
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="pending",
        nullable=False
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

    # User relationship
    user: Mapped["User"] = relationship(
        "User",
        back_populates="scans"
    )

    # Vulnerabilities
    vulnerabilities: Mapped[list["Vulnerability"]] = relationship(
        "Vulnerability",
        back_populates="scan",
        cascade="all, delete-orphan"
    )

    # AI predictions
    ai_predictions: Mapped[list["AIPrediction"]] = relationship(
        "AIPrediction",
        back_populates="scan",
        cascade="all, delete-orphan"
    )

    # Risk scores
    risk_scores: Mapped[list["RiskScore"]] = relationship(
        "RiskScore",
        back_populates="scan",
        cascade="all, delete-orphan"
    )

    # One-to-one relationship with Report
    report: Mapped["Report | None"] = relationship(
        "Report",
        back_populates="scan",
        uselist=False,
        cascade="all, delete-orphan"
    )

    # One-to-many relationship with ScanResult
    results: Mapped[list["ScanResult"]] = relationship(
        "ScanResult",
        back_populates="scan",
        cascade="all, delete-orphan"
    )
