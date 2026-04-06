import google.generativeai as genai
import os
import json
import urllib.request
import urllib.error
from dotenv import load_dotenv
from app.core.config import settings

# Explicitly load .env so os.environ gets populated properly
load_dotenv()

# Collect all Gemini keys from environment variables (e.g., GEMINI_API_KEY_1, GEMINI_API_KEY_2...)
gemini_keys = [v for k, v in os.environ.items() if k.startswith("GEMINI_API_KEY") and v.strip()]

# If no multiple keys found, use the single default one
if not gemini_keys and settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_gemini_api_key_here":
    gemini_keys.append(settings.GEMINI_API_KEY)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def generate_content_with_fallback(prompt: str) -> str:
    """
    Tries multiple Gemini API keys in round-robin fashion.
    If all Gemini keys fail (e.g., 429 Quota Exceeded), falls back to OpenRouter's free models.
    """
    last_error = ""

    # Attempt to process with available Gemini Keys
    for api_key in gemini_keys:
        try:
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-2.0-flash')  # You can switch to gemini-2.5-flash if needed
            response = model.generate_content(prompt)
            if response.text:
                return response.text
        except Exception as e:
            err_str = str(e).lower()
            last_error = err_str
            if "429" in err_str or "quota" in err_str:
                print(f"Gemini Key ending in ...{api_key[-4:]} exhausted limit. Trying next...")
                continue
            else:
                print(f"Gemini General Error with key ending in ...{api_key[-4:]}: {e}")
                continue

    # Fallback Mechanism: If we reach here, all Gemini keys failed
    if OPENROUTER_API_KEY:
        print("All Gemini keys failed or exhausted! Switching to OpenRouter Free Fallback...")
        try:
            url = "https://openrouter.ai/api/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Clarix-AI"
            }
            # Using totally free models as a reliable fallback - Trying multiple if one fails
            free_models = [
                "openrouter/free",
                "google/gemini-2.5-flash-free",
                "meta-llama/llama-3.3-70b-instruct:free"
            ]
            
            for fallback_model in free_models:
                try:
                    data = {
                        "model": fallback_model,
                        "messages": [{"role": "user", "content": prompt}]
                    }
                    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers, method="POST")
                    with urllib.request.urlopen(req) as fallback_res:
                        result = json.loads(fallback_res.read().decode('utf-8'))
                        return result['choices'][0]['message']['content']
                except Exception as model_e:
                    print(f"OpenRouter Model {fallback_model} failed: {model_e}")
                    continue
            
            # If all OpenRouter models fail
            raise Exception("All OpenRouter Free models are currently rate limited or unavailable.")
            
        except Exception as fallback_e:
            print(f"OpenRouter Fallback also failed: {fallback_e}")
            raise Exception("All Primary and Fallback AI models are currently unavailable.")

    # Re-raise the last Gemini error if there's no OpenRouter fallback setup
    raise Exception(f"Ratelimit or Quota Error: {last_error}")

model = None # To prevent external codes from directly accessing the un-rotated model
