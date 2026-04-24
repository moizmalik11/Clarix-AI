from app.core.gemini import generate_content_with_fallback
import json

def generate_quiz(text: str, question_count: int, difficulty: str):
    prompt = f"""
    You are an expert strict examiner. Generate {question_count} multiple-choice questions (MCQs) strictly from the provided text below.
    Difficulty level: {difficulty}.
    
    IMPORTANT RULES:
    1. Base all questions AND answers ONLY on the provided text. Do not use outside knowledge.
    2. If the text does not contain enough information to generate {question_count} questions, generate as many as you can using only the text.
    
    Return the result ONLY as a valid JSON array of objects (do NOT wrap it in any other object), where each object has:
    - "question": The question text.
    - "options": An array of exactly 4 objects, each with "text" (string) and "is_correct" (boolean, only one should be true).
    - "explanation": A brief explanation of the correct answer based on the text.

    Text to base the questions strictly on:
    {text}
    
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
        print("Quiz Generation Error:", e)
        return []
