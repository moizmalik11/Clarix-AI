from pydantic import BaseModel
from typing import List, Optional

class StudyRequest(BaseModel):
    text: str
    topics: Optional[List[str]] = []
