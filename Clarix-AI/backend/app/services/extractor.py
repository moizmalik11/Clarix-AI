import pdfplumber
import fitz  # PyMuPDF
import docx


    # If pdfplumber failed to extract meaningful text, fallback to PyMuPDF
    if len(text.strip()) < 50:
        text = ""
        try:
            doc = fitz.open(file_path)
            for page in doc:
                text += page.get_text() + "\n"
        except Exception as e:
            print("PyMuPDF extraction error:", e)
            
    return text

def extract_text_from_docx(file_path: str) -> str:
    doc = docx.Document(file_path)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text

def process_file(file_path: str, filename: str) -> str:
    text = ""
    ext = filename.split(".")[-1].lower()
    if ext == "pdf":
        text = extract_text_from_pdf(file_path)
    elif ext in ["doc", "docx"]:
        text = extract_text_from_docx(file_path)
    else:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            text = f.read()
    return text
