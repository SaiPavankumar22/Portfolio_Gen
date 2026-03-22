from bson import ObjectId
from fastapi import HTTPException
from database import users_collection
from models.user import UserProfile


def fix_id(doc: dict) -> dict:
    """Convert MongoDB ObjectId to string so it can be JSON-serialised."""
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc


def get_profile_by_email(email: str) -> dict | None:
    """Fetch a user profile by email. Returns None if not found."""
    user = users_collection.find_one({"personalInfo.email": email})
    return fix_id(user) if user else None


def upsert_profile(profile: UserProfile) -> dict:
    """
    Create or update a user profile identified by email.

    Key fix: we strip `_id` from the update payload before calling $set.
    MongoDB forbids modifying the immutable _id field in an update operation,
    so including it (even as None) raises a WriteError.
    """
    email = profile.personalInfo.email
    if not email:
        raise HTTPException(status_code=400, detail="personalInfo.email is required")

    # Serialize to dict using aliases (e.g. _id) and only fields that were supplied
    update_data = profile.model_dump(by_alias=True)

    # ── Critical fix ──────────────────────────────────────────────────────────
    # Always remove _id from the $set payload. MongoDB's _id is immutable once
    # a document is created. Even passing _id: null triggers the WriteError.
    update_data.pop("_id", None)
    # ─────────────────────────────────────────────────────────────────────────

    users_collection.update_one(
        {"personalInfo.email": email},
        {"$set": update_data},
        upsert=True,
    )

    updated = users_collection.find_one({"personalInfo.email": email})
    return fix_id(updated)
