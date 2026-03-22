"""
PortfolioAI — FastAPI entry point
Run with:  uvicorn app:app --reload
Docs at:   http://localhost:8000/docs
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.profile import router as profile_router
from routes.portfolio import router as portfolio_router

# ---------------------------------------------------------------------------
# App instance
# ---------------------------------------------------------------------------
app = FastAPI(
    title="PortfolioAI API",
    description="Backend API for the AI-powered portfolio generator",
    version="1.0.0",
)

# ---------------------------------------------------------------------------
# CORS — allow the Vite dev server (and any origin in dev)
# In production, replace "*" with your actual frontend domain.
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(profile_router)
app.include_router(portfolio_router)


# ---------------------------------------------------------------------------
# Health-check
# ---------------------------------------------------------------------------
@app.get("/", tags=["Health"])
def root():
    return {"status": "ok", "message": "PortfolioAI API is running"}