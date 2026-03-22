from fastapi import APIRouter, HTTPException
from models.user import UserProfile
from services.profile_service import get_profile_by_email, upsert_profile

router = APIRouter(prefix="/api", tags=["Profile"])


@router.get("/profile/{email}", summary="Get user profile by email")
def get_profile(email: str):
    """
    Fetch the full user profile for the given email address.
    Returns 404 if no profile exists yet.
    """
    user = get_profile_by_email(email)
    if not user:
        raise HTTPException(status_code=404, detail=f"No profile found for email: {email}")
    return user


@router.post("/profile", summary="Create or update a user profile")
def create_or_update_profile(profile: UserProfile):
    """
    Upsert a user profile. If a profile with the same email already exists
    it is updated; otherwise a new document is created.
    """
    return upsert_profile(profile)
