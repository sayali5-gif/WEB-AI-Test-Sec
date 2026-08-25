from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.models.vulnerability import Vulnerability
from app.schemas.vulnerability import (
    VulnerabilityCreate,
    VulnerabilityResponse
)


router = APIRouter(
    prefix="/api/vulnerabilities",
    tags=["Vulnerabilities"]
)


@router.post(
    "",
    response_model=VulnerabilityResponse
)
def create_vulnerability(
    data: VulnerabilityCreate,
    db: Session = Depends(get_db)
):
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
    db: Session = Depends(get_db)
):
    return db.query(Vulnerability).all()