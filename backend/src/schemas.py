from pydantic import BaseModel

class Sentence(BaseModel):
    text: str

class Word(BaseModel):
    original_text: str
    source_language: str
    target_language: str