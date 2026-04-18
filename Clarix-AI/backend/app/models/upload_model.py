from pydantic import BaseModel
from typing import List

class UploadResponse(BaseModel):
    filename: str
    message: str
    extracted_text: str
    topics: List[str] = []
