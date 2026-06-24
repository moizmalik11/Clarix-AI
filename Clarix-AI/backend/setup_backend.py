import os

def create_structure_and_files():
    base_dir = r"E:\Projects\Clarix\Clarix-AI\backend"
    
    # Define the directory structure
    directories = [
        "app",
        "app/api",
        "app/services",
        "app/models",
        "app/core",
        "app/utils",
        "uploads"
    ]
    
    for directory in directories:
        os.makedirs(os.path.join(base_dir, directory), exist_ok=True)
        # Create __init__.py in python packages
        if directory.startswith("app"):
            with open(os.path.join(base_dir, directory, "__init__.py"), "w") as f:
                f.write("")

    # main.py
    with open(os.path.join(base_dir, "main.py"), "w", encoding="utf-8") as f:
        f.write('''from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.upload import router as upload_router
from app.api.study import router as study_router
from app.api.quiz import router as quiz_router

app = FastAPI(title="Clarix-AI Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router, prefix="/api", tags=["Upload"])
app.include_router(study_router, prefix="/api", tags=["Study"])
app.include_router(quiz_router, prefix="/api", tags=["Quiz"])

@app.get("/")
def root():
    return {"message": "Welcome to Clarix-AI API"}
''')

    # requirements.txt
    with open(os.path.join(base_dir, "requirements.txt"), "w", encoding="utf-8") as f:
        f.write('''fastapi
uvicorn
python-multipart
pdfplumber
python-docx
google-generativeai
python-dotenv
pydantic
''')

    # .env
    with open(os.path.join(base_dir, ".env"), "w", encoding="utf-8") as f:
        f.write('''GEMINI_API_KEY=your_gemini_api_key_here
''')

    # README.md
    with open(os.path.join(base_dir, "README.md"), "w", encoding="utf-8") as f:
        f.write('''# Clarix AI Backend
FastAPI backend for processing documents and generating AI study materials.
''')

    # app/core/gemini.py
    with open(os.path.join(base_dir, "app/core/gemini.py"), "w", encoding="utf-8") as f:
        f.write('''import google.generativeai as genai
from app.core.config import settings

if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_gemini_api_key_here":
    genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash')
''')

    # app/utils/file_handler.py
    with open(os.path.join(base_dir, "app/utils/file_handler.py"), "w", encoding="utf-8") as f:
        f.write('''import os
from fastapi import UploadFile
import shutil

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_temp_file(file: UploadFile) -> str:
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return file_path

def delete_file(file_path: str):
    if os.path.exists(file_path):
        os.remove(file_path)
''')

    # app/utils/text_cleaner.py
    with open(os.path.join(base_dir, "app/utils/text_cleaner.py"), "w", encoding="utf-8") as f:
        f.write('''import re

def clean_extracted_text(text: str) -> str:
    if not text:
        return ""
    text = re.sub(r'\\s+', ' ', text).strip()
    return text
''')

   
    # app/models/upload_model.py
    with open(os.path.join(base_dir, "app/models/upload_model.py"), "w", encoding="utf-8") as f:
        f.write('''from pydantic import BaseModel
from typing import List

class UploadResponse(BaseModel):
    filename: str
    message: str
    extracted_text: str
    topics: List[str] = []
''')

    # app/models/study_model.py
    with open(os.path.join(base_dir, "app/models/study_model.py"), "w", encoding="utf-8") as f:
        f.write('''from pydantic import BaseModel

class StudyRequest(BaseModel):
    text: str

class StudyResponse(BaseModel):
    core_concepts: str
    key_points: str
    summary: str
    prepared_notes: str
''')

    # app/models/quiz_model.py
    with open(os.path.join(base_dir, "app/models/quiz_model.py"), "w", encoding="utf-8") as f:
        f.write('''from pydantic import BaseModel
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
''')

    # app/services/study_service.py
    with open(os.path.join(base_dir, "app/services/study_service.py"), "w", encoding="utf-8") as f:
        f.write('''from app.core.gemini import model
import json

def generate_study_material(text: str):
    prompt = f"""
    You are an expert AI tutor. Analyze the following text and provide a structured study guide.
    Return the result ONLY as a valid JSON object with the exact following keys:
    - "core_concepts": A clear explanation of the main concepts.
    - "key_points": Bullet points of the most important information.
    - "summary": A brief summary of the entire text.
    - "prepared_notes": Detailed notes prepared for exam study.

    Text to analyze:
    {text[:20000]}
    """
    try:
        response = model.generate_content(prompt)
        response_text = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(response_text)
    except Exception as e:
        return {
            "core_concepts": "Error generating content.",
            "key_points": str(e),
            "summary": "Please try again.",
            "prepared_notes": ""
        }
''')

    # app/services/quiz_service.py
    with open(os.path.join(base_dir, "app/services/quiz_service.py"), "w", encoding="utf-8") as f:
        f.write('''from app.core.gemini import model
import json

def generate_quiz(text: str, question_count: int, difficulty: str):
    prompt = f"""
    You are an expert examiner. Generate {question_count} multiple-choice questions (MCQs) from the provided text.
    Difficulty level: {difficulty}.
    
    Return the result ONLY as a valid JSON array of objects (do NOT wrap it in any other object), where each object has:
    - "question": The question text.
    - "options": An array of exactly 4 objects, each with "text" (string) and "is_correct" (boolean, only one should be true).
    - "explanation": A brief explanation of the correct answer.

    Text:
    {text[:20000]}
    """
    try:
        response = model.generate_content(prompt)
        response_text = response.text.replace("```json", "").replace("```", "").strip()
        data = json.loads(response_text)
        return data
    except Exception as e:
        print("Quiz Generation Error:", e)
        return []
''')

    # app/api/upload.py
    with open(os.path.join(base_dir, "app/api/upload.py"), "w", encoding="utf-8") as f:
        f.write('''from fastapi import APIRouter, File, UploadFile, HTTPException
from app.utils.file_handler import save_temp_file, delete_file
from app.services.extractor import process_file
from app.utils.text_cleaner import clean_extracted_text
from app.models.upload_model import UploadResponse
from app.core.gemini import model
import json

router = APIRouter()

@router.post("/upload", response_model=UploadResponse)
async def upload_file(file: UploadFile = File(...)):
    try:
        file_path = save_temp_file(file)
        raw_text = process_file(file_path, file.filename)
        clean_text = clean_extracted_text(raw_text)
        delete_file(file_path)
        
        if not clean_text:
            raise HTTPException(status_code=400, detail="Could not extract text from the file.")
        
        prompt = f"Extract a list of 3-5 main topics or headings from the following text. Return ONLY a JSON array of strings.\\n\\nText:\\n{clean_text[:5000]}"
        topics = []
        try:
            # Only try to fetch topics if API key is setup correctly
            response = model.generate_content(prompt)
            topics = json.loads(response.text.replace("```json", "").replace("```", "").strip())
        except Exception as e:
            print("Gemini topic extract error:", e)
            topics = ["General Overview", "Core Principles", "Summary"]

        return UploadResponse(
            filename=file.filename,
            message="File processed successfully",
            extracted_text=clean_text,
            topics=topics
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
''')

    # app/api/study.py
    with open(os.path.join(base_dir, "app/api/study.py"), "w", encoding="utf-8") as f:
        f.write('''from fastapi import APIRouter, HTTPException
from app.models.study_model import StudyRequest, StudyResponse
from app.services.study_service import generate_study_material

router = APIRouter()

@router.post("/study", response_model=StudyResponse)
async def study_content(request: StudyRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="Text is required")
    
    result = generate_study_material(request.text)
    return StudyResponse(**result)
''')

    # app/api/quiz.py
    with open(os.path.join(base_dir, "app/api/quiz.py"), "w", encoding="utf-8") as f:
        f.write('''from fastapi import APIRouter, HTTPException
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
''')

if __name__ == "__main__":
    create_structure_and_files()
    print("Backend structure and files generated successfully!")
