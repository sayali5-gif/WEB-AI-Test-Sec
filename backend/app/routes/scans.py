from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.models.scan import Scan
from app.models.user import User
from app.schemas.scan import ScanCreate, ScanResponse
from app.utils.security import get_current_user


router = APIRouter(
    prefix="/api/scans",
    tags=["Scans"]
)


@router.post(
    "",
    response_model=ScanResponse,
    status_code=status.HTTP_201_CREATED
)
def create_scan(
    scan_data: ScanCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    scan = Scan(
        user_id=current_user.id,
        target=scan_data.target,
        scan_type=scan_data.scan_type,
        status="pending",
        started_at=None
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
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return (
        db.query(Scan)
        .filter(Scan.user_id == current_user.id)
        .order_by(Scan.id.desc())
        .all()
    )


@router.get(
    "/{scan_id}",
    response_model=ScanResponse
)
def get_scan(
    scan_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    scan = db.query(Scan).filter(
        Scan.id == scan_id,
        Scan.user_id == current_user.id
    ).first()

    if not scan:
        raise HTTPException(
            status_code=404,
            detail="Scan not found"
        )

    return scan


@router.patch(
    "/{scan_id}/start",
    response_model=ScanResponse
)
def start_scan(
    scan_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    scan = db.query(Scan).filter(
        Scan.id == scan_id,
        Scan.user_id == current_user.id
    ).first()

    if not scan:
        raise HTTPException(
            status_code=404,
            detail="Scan not found"
        )

    if scan.status != "pending":
        raise HTTPException(
            status_code=400,
            detail=f"Scan cannot be started from '{scan.status}' status"
        )

    scan.status = "running"
    scan.started_at = datetime.utcnow()

    db.commit()
    db.refresh(scan)

    return scan


@router.patch(
    "/{scan_id}/complete",
    response_model=ScanResponse
)
def complete_scan(
    scan_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    scan = db.query(Scan).filter(
        Scan.id == scan_id,
        Scan.user_id == current_user.id
    ).first()

    if not scan:
        raise HTTPException(
            status_code=404,
            detail="Scan not found"
        )

    if scan.status != "running":
        raise HTTPException(
            status_code=400,
            detail=f"Scan cannot be completed from '{scan.status}' status"
        )

    scan.status = "completed"
    scan.completed_at = datetime.utcnow()

    db.commit()
    db.refresh(scan)

    return scan


@router.patch(
    "/{scan_id}/fail",
    response_model=ScanResponse
)
def fail_scan(
    scan_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    scan = db.query(Scan).filter(
        Scan.id == scan_id,
        Scan.user_id == current_user.id
    ).first()

    if not scan:
        raise HTTPException(
            status_code=404,
            detail="Scan not found"
        )

    if scan.status != "running":
        raise HTTPException(
            status_code=400,
            detail=f"Scan cannot be failed from '{scan.status}' status"
        )

    scan.status = "failed"
    scan.completed_at = datetime.utcnow()

    db.commit()
    db.refresh(scan)

    return scan