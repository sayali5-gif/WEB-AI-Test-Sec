from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ScanCreate(BaseModel):
    target: str
    scan_type: str = "security_scan"


class ScanResponse(BaseModel):
    id: int
    user_id: int
    target: str
    scan_type: str
    status: str
    started_at: datetime | None
    completed_at: datetime | None
    summary: str | None

    model_config = ConfigDict(from_attributes=True)