from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.database import Base, engine
from app.models import (
    User,
    Scan,
    Vulnerability,
    TrafficLog,
    AIPrediction,
    RiskScore,
    Report
)

from app.routes import (
    auth,
    scans,
    vulnerabilities,
    traffic,
    reports
)
from app.routes import (
    auth,
    scans,
    vulnerabilities,
    traffic,
    reports,
    scan_results
)


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="AI-WebSecTest API",
    description=(
        "AI-Assisted Automated Security Testing and "
        "Intrusion Detection for Web Applications"
    ),
    version="1.0.0"
)


# React frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def root():
    return {
        "message": "AI-WebSecTest Backend is running",
        "status": "success"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AI-WebSecTest Backend",
        "database": "connected"
    }


# Register API routers

app.include_router(auth.router)
app.include_router(scans.router)
app.include_router(vulnerabilities.router)
app.include_router(traffic.router)
app.include_router(reports.router)
app.include_router(scan_results.router)