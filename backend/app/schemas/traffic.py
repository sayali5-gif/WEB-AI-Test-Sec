from datetime import datetime

from pydantic import BaseModel, ConfigDict


class TrafficCreate(BaseModel):
    source_ip: str | None = None
    method: str | None = None
    endpoint: str | None = None
    status_code: int | None = None
    user_agent: str | None = None


class TrafficResponse(BaseModel):
    id: int
    source_ip: str | None
    method: str | None
    endpoint: str | None
    status_code: int | None
    user_agent: str | None
    classification: str
    confidence: float | None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)