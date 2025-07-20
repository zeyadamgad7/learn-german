import re
import html
import bleach
import logging
from .config import ALLOWED_CHARACTERS, MAX_SENTENCE_LENGTH, MAX_WORDS_PER_SENTENCE

logger = logging.getLogger(__name__)

SUSPICIOUS_PATTERNS = [
    r'<script', r'javascript:', r'eval\(', r'exec\(', r'__import__', r'subprocess', r'os\.', r'system\(', r'shell', r'\..*\(',
    r'ignore\s+previous\s+instructions', r'ignore\s+all\s+previous', r'forget\s+your\s+instructions', r'you\s+are\s+now',
    r'new\s+instructions', r'system\s*:', r'user\s*:', r'assistant\s*:', r'###\s*instruction', r'```\s*system',
    r'pretend\s+you\s+are', r'act\s+as\s+if', r'roleplay\s+as', r'simulate\s+being', r'override\s+your', r'disregard\s+your',
    r'jailbreak', r'dan\s+mode', r'developer\s+mode', r'god\s+mode', r'admin\s+mode', r'bypass\s+your', r'break\s+out\+of',
    r'escape\s+your', r'violate\s+your', r'circumvent\s+your', r'instead\s+of\s+analyzing', r'rather\s+than\s+analyzing',
    r'but\s+first', r'however\s*,?\s*before', r'wait\s*,?\s*ignore', r'actually\s*,?\s*ignore', r'nevermind\s+that',
    r'scratch\s+that', r'forget\s+what\s+i\s+said', r'["\'].*["\'].*[:,].*["\']',
]

def sanitize_input(text: str) -> str:
    sanitized = bleach.clean(text, tags=[], attributes={}, strip=True)
    sanitized = html.escape(sanitized)
    return sanitized

def validate_german_text(text: str) -> bool:
    return bool(re.match(ALLOWED_CHARACTERS, text))

def check_suspicious_patterns(text: str) -> bool:
    text_lower = text.lower()
    for pattern in SUSPICIOUS_PATTERNS:
        if re.search(pattern, text_lower):
            logger.warning(f"Suspicious pattern detected: {pattern} in text: {text[:50]}...")
            return True
    return False

def detect_prompt_injection(text: str) -> tuple[bool, str]:
    text_lower = text.lower().strip()
    role_patterns = [
        r'\b(?:system|user|assistant|ai|bot|chatbot)\s*[:=]',
        r'you\s+are\s+(?:now|actually|really)\s+(?:a|an|the)',
        r'pretend\s+(?:to\s+be|you\s+are)',
        r'act\s+as\s+(?:if|a|an|the)',
        r'roleplay\s+as',
        r'simulate\s+being'
    ]
    for pattern in role_patterns:
        if re.search(pattern, text_lower):
            return True, f"Role confusion attempt detected: {pattern}"
    override_patterns = [
        r'ignore\s+(?:previous|all|your|the)\s+(?:instructions|rules|context)',
        r'forget\s+(?:your|previous|all)\s+(?:instructions|rules|context)',
        r'disregard\s+(?:your|previous|all)\s+(?:instructions|rules|context)',
        r'override\s+(?:your|previous|all)\s+(?:instructions|rules|context)',
        r'new\s+(?:instructions|rules|context)',
        r'instead\s+of\s+analyzing',
        r'rather\s+than\s+analyzing',
        r'but\s+first\s+(?:tell|show|explain|do)',
        r'however\s*,?\s*(?:before|first)'
    ]
    for pattern in override_patterns:
        if re.search(pattern, text_lower):
            return True, f"Instruction override attempt detected: {pattern}"
    context_break_patterns = [
        r'break\s+out\s+of',
        r'escape\s+(?:your|the)\s+(?:context|role|instructions)',
        r'step\s+out\s+of\s+(?:character|role)',
        r'exit\s+(?:the|your)\s+(?:mode|role|context)',
        r'end\s+(?:the|your)\s+(?:session|role|context)'
    ]
    for pattern in context_break_patterns:
        if re.search(pattern, text_lower):
            return True, f"Context breaking attempt detected: {pattern}"
    jailbreak_keywords = [
        'jailbreak', 'dan mode', 'developer mode', 'god mode', 'admin mode',
        'unrestricted', 'uncensored', 'unlimited', 'bypass', 'hack',
        'exploit', 'vulnerability', 'backdoor'
    ]
    for keyword in jailbreak_keywords:
        if keyword in text_lower:
            return True, f"Jailbreak keyword detected: {keyword}"
    if len(re.findall(r'[!@#$%^&*()_+=\[\]{}|;:",.<>?/~`]', text)) > len(text) * 0.3:
        return True, "Excessive special characters detected"
    if re.search(r'(.)\1{10,}', text):
        return True, "Repeated character pattern detected"
    non_german_chars = re.findall(r'[^\w\säöüÄÖÜß\s\.,!?;:\-\'\"()]', text)
    if len(non_german_chars) > 5:
        return True, "Non-German character encoding detected"
    return False, ""

def sanitize_and_validate_input(text: str) -> str:
    sanitized = sanitize_input(text.strip())
    sanitized = re.sub(r'\\[ux][0-9a-fA-F]{2,4}', '', sanitized)
    sanitized = re.sub(r'%[0-9a-fA-F]{2}', '', sanitized)
    sanitized = re.sub(r'&#x?[0-9a-fA-F]+;', '', sanitized)
    sanitized = re.sub(r'\s+', ' ', sanitized)
    sanitized = re.sub(r'([!?.,;:]){3,}', r'\1\1', sanitized)
    return sanitized

def validate_sentence_structure(text: str) -> bool:
    words = text.split()
    if len(words) > MAX_WORDS_PER_SENTENCE:
        return False
    if len(text) > MAX_SENTENCE_LENGTH:
        return False
    return True 