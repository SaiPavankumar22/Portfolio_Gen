from pydantic import BaseModel, Field
from typing import List, Optional


class UserPersonalInfo(BaseModel):
    fullName: str = ""
    email: str = ""
    phone: str = ""
    location: str = ""
    professionalTitle: str = ""
    summary: str = ""
    profilePicture: Optional[str] = ""
    resume: Optional[str] = ""


class WorkExperience(BaseModel):
    id: str
    company: str = ""
    position: str = ""
    startDate: str = ""
    endDate: str = ""
    current: bool = False
    description: str = ""
    achievements: List[str] = []


class Education(BaseModel):
    id: str
    institution: str = ""
    degree: str = ""
    fieldOfStudy: str = ""
    startDate: str = ""
    endDate: str = ""
    gpa: Optional[str] = None
    achievements: Optional[List[str]] = []


class Project(BaseModel):
    id: str
    name: str = ""
    description: str = ""
    technologies: List[str] = []
    liveUrl: Optional[str] = None
    githubUrl: Optional[str] = None
    images: Optional[List[str]] = []
    achievements: Optional[List[str]] = []


class SocialLinks(BaseModel):
    linkedin: Optional[str] = ""
    github: Optional[str] = ""
    twitter: Optional[str] = ""
    website: Optional[str] = ""
    portfolio: Optional[str] = ""


class TemplateCustomization(BaseModel):
    colorPalette: str = "navy-blue"
    fontSize: str = "medium"
    layout: str = "standard"
    accentColor: str = "#2196f3"


class UserProfile(BaseModel):
    """
    Full user profile stored in MongoDB.
    The `_id` field is aliased as `id` for Pydantic but is MongoDB's ObjectId (as string).
    It is NEVER included in update payloads — services strip it before writing.
    """
    id: Optional[str] = Field(None, alias="_id")
    personalInfo: UserPersonalInfo = UserPersonalInfo()
    skills: List[str] = []
    experience: List[WorkExperience] = []
    education: List[Education] = []
    projects: List[Project] = []
    socialLinks: SocialLinks = SocialLinks()
    interests: List[str] = []
    selectedTemplate: str = "modern-minimalist"
    customizations: TemplateCustomization = TemplateCustomization()

    model_config = {"populate_by_name": True}
