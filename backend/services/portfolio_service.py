from bson import ObjectId
from bson.errors import InvalidId
from fastapi import HTTPException
from database import portfolios_collection
from models.portfolio import Portfolio


def fix_id(doc: dict) -> dict:
    """Convert MongoDB ObjectId to string so it can be JSON-serialised."""
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc


def _parse_object_id(portfolio_id: str) -> ObjectId:
    """Parse a string to ObjectId, raising 400 on invalid format."""
    try:
        return ObjectId(portfolio_id)
    except (InvalidId, Exception):
        raise HTTPException(status_code=400, detail=f"Invalid portfolio id: {portfolio_id}")


def get_portfolios_by_user(email: str) -> list[dict]:
    """Return all portfolios belonging to a user email."""
    portfolios = list(portfolios_collection.find({"userId": email}))
    return [fix_id(p) for p in portfolios]


def create_portfolio(portfolio: Portfolio) -> dict:
    """
    Insert a new portfolio document.

    Key fix: strip _id from insert payload — MongoDB auto-generates _id on insert.
    Including an explicit _id: null or _id: '' causes duplicate-key / type errors.
    """
    data = portfolio.model_dump(by_alias=True)
    data.pop("_id", None)  # Let MongoDB generate a fresh ObjectId

    result = portfolios_collection.insert_one(data)
    created = portfolios_collection.find_one({"_id": result.inserted_id})
    return fix_id(created)


def update_portfolio(portfolio_id: str, portfolio: Portfolio) -> dict:
    """Update an existing portfolio document by its ObjectId string."""
    oid = _parse_object_id(portfolio_id)

    update_data = portfolio.model_dump(by_alias=True)
    update_data.pop("_id", None)  # _id is immutable — never include in $set

    result = portfolios_collection.update_one(
        {"_id": oid},
        {"$set": update_data},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Portfolio not found")

    updated = portfolios_collection.find_one({"_id": oid})
    return fix_id(updated)


def delete_portfolio(portfolio_id: str) -> dict:
    """Hard-delete a portfolio document by its ObjectId string."""
    oid = _parse_object_id(portfolio_id)
    result = portfolios_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return {"detail": "Portfolio deleted successfully"}
