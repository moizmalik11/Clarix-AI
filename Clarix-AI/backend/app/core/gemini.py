import google.generativeai as genai
from app.core.config import settings

if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_gemini_api_key_here":
    genai.configure(api_key=settings.GEMINI_API_KEY)

# Use gemini-2.5-flash for free tier users as it provides better rate limits
model = genai.GenerativeModel('gemini-2.5-flash')
