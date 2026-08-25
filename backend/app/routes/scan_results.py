from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.models.scan import Scan
from app.models.scan_result import ScanResult
from app.models.user import User
from app.schemas.scan_result import (
    ScanResultCreate,
    ScanResultResponse
)
from app.utils.security import get_current_user


router = APIRouter(
    prefix="/api/scan-results",
    tags=["Scan Results"]
)


@router.post(
    "",
    response_model=ScanResultResponse,
    status_code=status.HTTP_201_CREATED
)
def create_scan_result(
    data: ScanResultCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    scan = db.query(Scan).filter(
        Scan.id == data.scan_id,
        Scan.user_id == current_user.id
    ).first()

    if not scan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scan not found"
        )

    result = ScanResult(
        scan_id=data.scan_id,
        result_type=data.result_type,
        title=data.title,
        description=data.description,
        raw_data=data.raw_data
    )

    db.add(result)
    db.commit()
    db.refresh(result)

    return result


@router.get(
    "/scan/{scan_id}",
    response_model=list[ScanResultResponse]
)
def get_scan_results(
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
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Scan not found"
        )

    return db.query(ScanResult).filter(
        ScanResult.scan_id == scan_id
    ).order_by(
        ScanResult.id.desc()
    ).all()
