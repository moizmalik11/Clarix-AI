from pydantic import BaseModel

class StudyRequest(BaseModel):
    text: str

class StudyResponse(BaseModel):
    core_concepts: str
    key_points: str
    summary: str
    prepared_notes: str
