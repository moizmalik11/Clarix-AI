from app.core.gemini import model
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
    {text[:20000]}
    """
    try:
        response = model.generate_content(prompt)
        response_text = response.text.replace("```json", "").replace("```", "").strip()
        data = json.loads(response_text)
        return {"questions": data}
    except Exception as e:
        print("Quiz Generation Error:", e)
        return {"questions": []}
