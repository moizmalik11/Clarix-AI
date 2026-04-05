import google.generativeai as genai
from app.core.config import settings

if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_gemini_api_key_here":
    genai.configure(api_key=settings.GEMINI_API_KEY)

# Use the highly stable 'gemini-pro' model which works perfectly for all generations and API keys
model = genai.GenerativeModel('gemini-pro')
