from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ScanResultCreate(BaseModel):
    scan_id: int
    result_type: str
    title: str
    description: str | None = None
    raw_data: str | None = None


class ScanResultResponse(BaseModel):
    id: int
    scan_id: int
    result_type: str
    title: str
    description: str | None
    raw_data: str | None
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )