from pydantic import BaseModel, Field
from typing import Optional


class Portfolio(BaseModel):
    """
    Portfolio metadata stored in MongoDB.
    The `_id` field is aliased as `id` for Pydantic.
    It is NEVER included in create/update payloads — services strip it before writing.
    """
    id: Optional[str] = Field(None, alias="_id")
    userId: str
    name: str
    template: str
    createdAt: str
    lastModified: str
    status: str = "draft"
    views: int = 0
    thumbnail: str = ""

    model_config = {"populate_by_name": True}
