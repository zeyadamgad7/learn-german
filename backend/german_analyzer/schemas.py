from pydantic import BaseModel, Field, validator
from typing import List, Optional
from datetime import datetime
from .security import sanitize_and_validate_input, detect_prompt_injection, check_suspicious_patterns, validate_german_text, validate_sentence_structure
from .config import MAX_SENTENCE_LENGTH
import logging

logger = logging.getLogger(__name__)

class GermanSentence(BaseModel):
    sentence: str = Field(
        ...,
        min_length=1,
        max_length=MAX_SENTENCE_LENGTH,
        description="German sentence to analyze (max 500 characters)"
    )
    @validator('sentence')
    def validate_sentence(cls, v):
        if not v or not v.strip():
            raise ValueError('Sentence cannot be empty')
        sanitized = sanitize_and_validate_input(v)
        is_injection, injection_reason = detect_prompt_injection(sanitized)
        if is_injection:
            logger.warning(f"Prompt injection attempt blocked: {injection_reason}")
            raise ValueError(f'Input rejected: {injection_reason}')
        if check_suspicious_patterns(sanitized):
            raise ValueError('Input contains potentially harmful content')
        if not validate_german_text(sanitized):
            raise ValueError('Input contains invalid characters for German text')
        if not validate_sentence_structure(sanitized):
            raise ValueError('Sentence is too long or contains too many words')
        return sanitized

class WordAnalysis(BaseModel):
    word: str
    part_of_speech: str
    role: str
    case: Optional[str]
    person: Optional[str]
    number: Optional[str]
    explanation: str

class GrammarAnalysisResponse(BaseModel):
    sentence: str
    analysis: List[WordAnalysis]
    analysis_timestamp: datetime = Field(default_factory=datetime.now)
    word_count: int
    cached: bool = False
    cached_at: Optional[datetime] = None
    processing_time_ms: Optional[float] = None 