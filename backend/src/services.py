import os
from groq import Groq
from dotenv import load_dotenv
import json
from prompts import get_analysis_prompt, get_translation_prompt, get_review_prompt

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def call_llm(prompt: str):
    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
        max_completion_tokens=1024,
        top_p=1,
        stream=False,
        response_format={"type": "json_object"},
        stop=None,
    )
    
    response_str = completion.choices[0].message.content
    try:
        parsed_json = json.loads(response_str)
        print("Parsed JSON:", parsed_json)
        return parsed_json
    except json.JSONDecodeError as e:
        print("Failed to parse JSON:", e)
        return {"error": "Failed to parse JSON", "details": str(e), "raw_output": response_str}
    
def analyze(sentence: str):
    prompt = get_analysis_prompt(sentence)
    return call_llm(prompt)

def translate(word: str, from_: str, to: str):
    prompt = get_translation_prompt(word, from_, to)
    return call_llm(prompt)

def review(text: str):
    prompt = get_review_prompt(text)
    return call_llm(prompt)