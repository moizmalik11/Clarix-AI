from fastapi import FastAPI
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

