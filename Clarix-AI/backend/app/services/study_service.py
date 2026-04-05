from app.core.gemini import model
import json

def generate_study_material(text: str):
    prompt = f"""
    You are an expert AI tutor. Analyze the following text and provide a structured study guide.
    Return the result ONLY as a valid JSON object with the exact following keys:
    - "core_concepts": A clear explanation of the main concepts.
    - "key_points": Bullet points of the most important information.
    - "summary": A brief summary of the entire text.
    - "prepared_notes": Detailed notes prepared for exam study.

    Text to analyze:
    {text[:20000]}
    """
    try:
        response = model.generate_content(prompt)
        response_text = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(response_text)
    except Exception as e:
        return {
            "core_concepts": "Error generating content.",
            "key_points": str(e),
            "summary": "Please try again.",
            "prepared_notes": ""
        }
