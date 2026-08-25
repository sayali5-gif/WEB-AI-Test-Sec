from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.models.scan import Scan
from app.schemas.scan import ScanCreate, ScanResponse


router = APIRouter(
    prefix="/api/scans",
    tags=["Scans"]
)


@router.post(
    "",
    response_model=ScanResponse
)
def create_scan(
    scan_data: ScanCreate,
    db: Session = Depends(get_db)
):
    scan = Scan(
        user_id=1,
        target=scan_data.target,
        scan_type=scan_data.scan_type,
        status="pending",
        started_at=datetime.utcnow()
    )

    db.add(scan)
    db.commit()
    db.refresh(scan)

    return scan


@router.get(
    "",
    response_model=list[ScanResponse]
)
def get_scans(
    db: Session = Depends(get_db)
):
    return db.query(Scan).all()


@router.get(
    "/{scan_id}",
    response_model=ScanResponse
)
def get_scan(
    scan_id: int,
    db: Session = Depends(get_db)
):
    scan = db.query(Scan).filter(
        Scan.id == scan_id
    ).first()

    if not scan:
        raise HTTPException(
            status_code=404,
            detail="Scan not found"
        )

    return scan