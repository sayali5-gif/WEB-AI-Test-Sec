from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.models.report import Report


router = APIRouter(
    prefix="/api/reports",
    tags=["Reports"]
)


@router.get("")
def get_reports(
    db: Session = Depends(get_db)
):
    reports = db.query(Report).order_by(
        Report.created_at.desc()
    ).all()

    return reports


@router.get("/{report_id}")
def get_report(
    report_id: int,
    db: Session = Depends(get_db)
):
    report = db.query(Report).filter(
        Report.id == report_id
    ).first()

    if not report:
        return {
            "error": "Report not found"
        }

    return report