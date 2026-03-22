from fastapi import APIRouter
from models.portfolio import Portfolio
from services.portfolio_service import (
    get_portfolios_by_user,
    create_portfolio,
    update_portfolio,
    delete_portfolio,
)

router = APIRouter(prefix="/api", tags=["Portfolio"])


@router.get("/portfolios/{email}", summary="List all portfolios for a user")
def list_portfolios(email: str):
    """Return every portfolio document that belongs to the given user email."""
    return get_portfolios_by_user(email)


@router.post("/portfolios", summary="Create a new portfolio")
def create_new_portfolio(portfolio: Portfolio):
    """Insert a new portfolio record. MongoDB generates the _id automatically."""
    return create_portfolio(portfolio)


@router.put("/portfolios/{portfolio_id}", summary="Update an existing portfolio")
def update_existing_portfolio(portfolio_id: str, portfolio: Portfolio):
    """Update a portfolio by its MongoDB ObjectId string. Returns 404 if not found."""
    return update_portfolio(portfolio_id, portfolio)


@router.delete("/portfolios/{portfolio_id}", summary="Delete a portfolio")
def delete_existing_portfolio(portfolio_id: str):
    """Hard-delete a portfolio by its MongoDB ObjectId string. Returns 404 if not found."""
    return delete_portfolio(portfolio_id)
