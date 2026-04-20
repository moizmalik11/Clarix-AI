from fastapi import APIRouter, HTTPException
from app.models.quiz_model import QuizRequest, QuizResponse, MCQQuestion
from app.services.quiz_service import generate_quiz

router = APIRouter()

@router.post("/quiz", response_model=QuizResponse)
async def create_quiz(request: QuizRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="Text is required")
    
    questions = generate_quiz(request.text, request.question_count, request.difficulty)
    if not questions:
        raise HTTPException(status_code=500, detail="Failed to generate quiz. Check API key and format.")
        
    return QuizResponse(questions=questions)
