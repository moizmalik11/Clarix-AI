import os
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
