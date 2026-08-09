from fastapi import APIRouter
from schemas import Sentence, Word
from services import analyze, translate, review

router = APIRouter()

@router.post("/analyze")
def send_analysis(sentence: Sentence):
    print("Received sentence:", sentence.text)
    analysis = analyze(sentence.text)
    return analysis

@router.post("/translate")
def send_translation(word: Word):
    print("Received word for translation:", word.original_text)
    translation = translate(word.original_text, word.source_language, word.target_language)
    return translation

@router.post("/review")
def send_review(text: Sentence):
    print("Received text for review:", text.text)
    review_result = review(text.text)
    return review_result