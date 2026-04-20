from fastapi import APIRouter, HTTPException
from app.models.study_model import StudyRequest, StudyResponse
from app.services.study_service import generate_study_material

router = APIRouter()

