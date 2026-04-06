from fastapi import APIRouter, File, UploadFile, HTTPException
from app.utils.file_handler import save_temp_file, delete_file
from app.services.extractor import process_file
from app.utils.text_cleaner import clean_extracted_text
from app.models.upload_model import UploadResponse
from app.core.gemini import generate_content_with_fallback
import json

router = APIRouter()

@router.post("/upload", response_model=UploadResponse)
async def upload_file(file: UploadFile = File(...)):
    try:
        file_path = save_temp_file(file)
        raw_text = process_file(file_path, file.filename)
        clean_text = clean_extracted_text(raw_text)
        delete_file(file_path)
        
        if not clean_text or len(clean_text.strip()) < 10:
            raise HTTPException(status_code=400, detail="Document appears to be an image or scanned PDF. No readable/selectable text found. Please upload a standard text PDF/DOCX.")
        
        prompt = f"Extract a list of 3-5 main topics or headings from the following text. Return ONLY a JSON array of strings.\n\nText:\n{clean_text[:5000]}"
        topics = []
        try:
            # Only try to fetch topics if API key is setup correctly
            response_text = generate_content_with_fallback(prompt)
            topics = json.loads(response_text.replace("```json", "").replace("```", "").strip())
        except Exception as e:
            print("Gemini topic extract error:", e)
            topics = ["General Overview", "Core Principles", "Summary"]

        return UploadResponse(
            filename=file.filename,
            message="File processed successfully",
            extracted_text=clean_text,
            topics=topics
        )
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
