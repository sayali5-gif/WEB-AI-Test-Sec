from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.models.scan import Scan
from app.models.user import User
from app.models.vulnerability import Vulnerability
from app.schemas.vulnerability import (
    VulnerabilityCreate,
    VulnerabilityResponse
)
from app.utils.security import get_current_user


router = APIRouter(
    prefix="/api/vulnerabilities",
    tags=["Vulnerabilities"]
)


@router.post(
    "",
    response_model=VulnerabilityResponse,
    status_code=status.HTTP_201_CREATED
)
def create_vulnerability(
    data: VulnerabilityCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    scan = db.query(Scan).filter(
        Scan.id == data.scan_id,
        Scan.user_id == current_user.id
    ).first()

    if not scan:
        raise HTTPException(
            status_code=404,
            detail="Scan not found"
        )

    vulnerability = Vulnerability(
        scan_id=data.scan_id,
        type=data.type,
        severity=data.severity,
        confidence=data.confidence,
        description=data.description,
        recommendation=data.recommendation
    )

    db.add(vulnerability)
    db.commit()
    db.refresh(vulnerability)

    return vulnerability


@router.get(
    "",
    response_model=list[VulnerabilityResponse]
)
def get_vulnerabilities(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return (
        db.query(Vulnerability)
        .join(Scan)
        .filter(Scan.user_id == current_user.id)
        .order_by(Vulnerability.id.desc())
        .all()
    )


@router.get(
    "/scan/{scan_id}",
    response_model=list[VulnerabilityResponse]
)
def get_scan_vulnerabilities(
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

    return (
        db.query(Vulnerability)
        .filter(Vulnerability.scan_id == scan_id)
        .order_by(Vulnerability.id.desc())
        .all()
    )