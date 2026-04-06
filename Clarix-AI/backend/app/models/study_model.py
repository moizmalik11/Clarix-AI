from pydantic import BaseModel
from typing import List, Optional

class StudyRequest(BaseModel):
    text: str
    topics: Optional[List[str]] = []

class StudyResponse(BaseModel):
    core_concepts: str
    key_points: str
    summary: str
    study_notes: str
