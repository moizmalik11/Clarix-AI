from app.core.gemini import generate_content_with_fallback
import json

def generate_quiz(text: str, question_count: int, difficulty: str):
    prompt = f"""
    You are an expert strict examiner. Generate {question_count} multiple-choice questions (MCQs) strictly from the provided text below.
    Difficulty level: {difficulty}.
    
    
    Ensure NO external knowledge is used. Only reference facts present in the text above.
    """
    try:
        response_text = generate_content_with_fallback(prompt)
        response_text = response_text.replace("```json", "").replace("```", "").strip()
        data = json.loads(response_text)
        # Ensure it's a list
        if isinstance(data, dict) and "questions" in data:
            data = data["questions"]
        return data
    except Exception as e:
        print("Quiz Generation :", e)
        return []
