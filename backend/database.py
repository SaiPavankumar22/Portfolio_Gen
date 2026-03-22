from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI is not set in the .env file")

client = MongoClient(MONGODB_URI)
db = client["portfolio-gen"]

users_collection = db["users"]
portfolios_collection = db["portfolios"]
