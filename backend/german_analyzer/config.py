import os
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Security configurations
MAX_SENTENCE_LENGTH = 500
MAX_WORDS_PER_SENTENCE = 50
ALLOWED_CHARACTERS = r'^[a-zA-ZäöüÄÖÜß0-9\s\.,!?;:\-\'\"()]+$'

# Redis configuration
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD")
CACHE_TTL = int(os.getenv("CACHE_TTL", "3600"))  # Default 1 hour
CACHE_ENABLED = os.getenv("CACHE_ENABLED", "true").lower() == "true"

# Environment
ENVIRONMENT = os.getenv("ENVIRONMENT", "development") 