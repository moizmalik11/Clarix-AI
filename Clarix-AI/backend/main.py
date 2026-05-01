from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.upload import router as upload_router
from app.api.study import router as study_router
from app.api.quiz import router as quiz_router

app = FastAPI(title="Clarix-AI Backend", version="1.0.0")

