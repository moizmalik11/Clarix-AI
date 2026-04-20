from fastapi import APIRouter, HTTPException
from app.models.quiz_model import QuizRequest, QuizResponse, MCQQuestion
from app.services.quiz_service import generate_quiz

router = APIRouter()

