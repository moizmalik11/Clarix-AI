import pdfplumber
import fitz  # PyMuPDF
import docx

def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    # Try pdfplumber first

        
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

def