import google.generativeai as genai
import os
import json
import urllib.request
import urllib.error
from dotenv import load_dotenv
from app.core.config import settings
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
