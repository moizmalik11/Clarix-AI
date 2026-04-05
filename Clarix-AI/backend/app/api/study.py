from fastapi import APIRouter, HTTPException
from app.models.study_model import StudyRequest, StudyResponse
from app.services.study_service import generate_study_material

router = APIRouter()

@router.post("/study", response_model=StudyResponse)
async def study_content(request: StudyRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="Text is required")
    
    result = generate_study_material(request.text)
    return StudyResponse(**result)
