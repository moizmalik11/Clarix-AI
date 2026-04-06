from app.core.gemini import generate_content_with_fallback
import json

def generate_quiz(text: str, question_count: int, difficulty: str):
    prompt = f"""
    You are an expert examiner. Generate {question_count} multiple-choice questions (MCQs) from the provided text.
    Difficulty level: {difficulty}.
    
    Return the result ONLY as a valid JSON array of objects (do NOT wrap it in any other object), where each object has:
    - "question": The question text.
    - "options": An array of exactly 4 objects, each with "text" (string) and "is_correct" (boolean, only one should be true).
    - "explanation": A brief explanation of the correct answer.

    Text:
    {text[:15000]}
    """
    try:
        response_text = generate_content_with_fallback(prompt)
        response_text = response_text.replace("```json", "").replace("```", "").strip()
        data = json.loads(response_text)
        return data
    except Exception as e:
        print("Quiz Generation Error:", e)
        return []
