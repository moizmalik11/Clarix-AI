from pydantic import BaseModel
from typing import List

class QuizRequest(BaseModel):
    text: str
    question_count: int = 5
    difficulty: str = "medium"

class MCQOption(BaseModel):
    text: str
    is_correct: bool

class MCQQuestion(BaseModel):
    question: str
    options: List[MCQOption]
    explanation: str

class QuizResponse(BaseModel):
    questions: List[MCQQuestion]
