from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.models.traffic import TrafficLog
from app.schemas.traffic import (
    TrafficCreate,
    TrafficResponse
)


router = APIRouter(
    prefix="/api/traffic",
    tags=["Traffic"]
)


@router.post(
    "",
    response_model=TrafficResponse
)
def create_traffic(
    data: TrafficCreate,
    db: Session = Depends(get_db)
):
    traffic = TrafficLog(
        source_ip=data.source_ip,
        method=data.method,
        endpoint=data.endpoint,
        status_code=data.status_code,
        user_agent=data.user_agent,
        classification="normal"
    )

    db.add(traffic)
    db.commit()
    db.refresh(traffic)

    return traffic


@router.get(
    "",
    response_model=list[TrafficResponse]
)
def get_traffic(
    db: Session = Depends(get_db)
):
    return db.query(TrafficLog).order_by(
        TrafficLog.created_at.desc()
    ).all()