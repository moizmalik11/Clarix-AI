from app.core.gemini import generate_content_with_fallback
import json
from typing import List

def generate_study_material(text: str, topics: List[str] = None):
    topics_str = f"Focus particularly on these key topics: {', '.join(topics)}." if topics else ""
    
    prompt = f"""
    You are an expert AI tutor. Analyze the following text and provide a structured study guide.
    {topics_str}
    
    Return the result ONLY as a valid JSON object with the exact following keys:
    - "summary": A brief summary of the entire text.
    - "core_concepts": A list of clear explanations of the main concepts, expanding on the provided topics.
    - "key_points": A list of bullet points of the most important information.
    - "study_notes": Detailed notes prepared for exam study covering the extracted topics.

    Text to analyze:
    {text[:15000]}
    """
    try:
        response_text = generate_content_with_fallback(prompt)
        response_text = response_text.replace("```json", "").replace("```", "").strip()
        data = json.loads(response_text)
        return data
    except Exception as e:
        print("Study Material Error:", e)
        return {
            "core_concepts": ["Error generating content. Please verify your API key and document."],
            "key_points": [f"Error details: {str(e)}"],
            "summary": "Please try again and ensure the Gemini API is correctly configured.",
            "study_notes": ""
        }
