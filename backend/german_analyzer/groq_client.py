import os
import logging
from groq import Groq
from .config import logger

try:
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    if not os.getenv("GROQ_API_KEY"):
        raise ValueError("GROQ_API_KEY environment variable is required")
except Exception as e:
    logger.error(f"Failed to initialize Groq client: {e}")
    raise 