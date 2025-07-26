from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
MONGODB_URI = os.getenv('MONGODB_URI')

# MongoDB setup
client = MongoClient(MONGODB_URI)
db = client['portfolio-gen']
users_collection = db['users']
portfolios_collection = db['portfolios']

# FastAPI app
app = FastAPI()

# CORS (allow frontend to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class UserProfile(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    personalInfo: dict
    skills: List[str]
    experience: List[dict]
    education: List[dict]
    projects: List[dict]
    socialLinks: dict
    interests: List[str]
    selectedTemplate: str
    customizations: dict

class Portfolio(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    userId: str
    name: str
    template: str
    createdAt: str
    lastModified: str
    status: str
    views: int
    thumbnail: str

# Helper to convert ObjectId
def fix_id(doc):
    if doc and '_id' in doc:
        doc['_id'] = str(doc['_id'])
    return doc

# --- User Profile Endpoints ---
@app.get("/api/profile/{email}")
def get_profile(email: str):
    user = users_collection.find_one({"personalInfo.email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return fix_id(user)

@app.post("/api/profile")
def create_or_update_profile(profile: UserProfile):
    email = profile.personalInfo['email']
    users_collection.update_one(
        {"personalInfo.email": email},
        {"$set": profile.dict(by_alias=True, exclude_unset=True)},
        upsert=True
    )
    user = users_collection.find_one({"personalInfo.email": email})
    return fix_id(user)

# --- Portfolio Endpoints ---
@app.get("/api/portfolios/{email}")
def get_portfolios(email: str):
    portfolios = list(portfolios_collection.find({"userId": email}))
    return [fix_id(p) for p in portfolios]

@app.post("/api/portfolios")
def create_portfolio(portfolio: Portfolio):
    result = portfolios_collection.insert_one(portfolio.dict(by_alias=True, exclude_unset=True))
    portfolio = portfolios_collection.find_one({"_id": result.inserted_id})
    return fix_id(portfolio)

@app.put("/api/portfolios/{portfolio_id}")
def update_portfolio(portfolio_id: str, portfolio: Portfolio):
    portfolios_collection.update_one(
        {"_id": ObjectId(portfolio_id)},
        {"$set": portfolio.dict(by_alias=True, exclude_unset=True)}
    )
    updated = portfolios_collection.find_one({"_id": ObjectId(portfolio_id)})
    return fix_id(updated)

@app.delete("/api/portfolios/{portfolio_id}")
def delete_portfolio(portfolio_id: str):
    result = portfolios_collection.delete_one({"_id": ObjectId(portfolio_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return {"detail": "Deleted"} 