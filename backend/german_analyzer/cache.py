import redis
import json
import hashlib
from datetime import datetime
import logging
from .config import REDIS_URL, REDIS_PASSWORD, CACHE_TTL, CACHE_ENABLED

logger = logging.getLogger(__name__)

redis_client = None
if CACHE_ENABLED:
    try:
        redis_client = redis.from_url(
            REDIS_URL,
            password=REDIS_PASSWORD,
            decode_responses=True,
            socket_connect_timeout=5,
            socket_timeout=5,
            retry_on_timeout=True,
            health_check_interval=30
        )
        redis_client.ping()
        logger.info("Redis connection established successfully")
    except Exception as e:
        logger.warning(f"Redis connection failed: {e}. Running without cache.")
        redis_client = None
        CACHE_ENABLED = False
else:
    logger.info("Caching disabled via configuration")

def generate_cache_key(sentence: str) -> str:
    normalized = sentence.strip().lower()
    sentence_hash = hashlib.md5(normalized.encode('utf-8')).hexdigest()
    return f"grammar_analysis:{sentence_hash}"

def get_from_cache(sentence: str):
    if not CACHE_ENABLED or not redis_client:
        return None
    try:
        cache_key = generate_cache_key(sentence)
        cached_data = redis_client.get(cache_key)
        if cached_data:
            logger.info(f"Cache hit for sentence: {sentence[:50]}...")
            return json.loads(cached_data)
    except Exception as e:
        logger.warning(f"Cache retrieval error: {e}")
    return None

def save_to_cache(sentence: str, analysis_data: dict) -> None:
    if not CACHE_ENABLED or not redis_client:
        return
    try:
        cache_key = generate_cache_key(sentence)
        cache_data = {
            **analysis_data,
            "cached_at": datetime.now().isoformat(),
            "cache_ttl": CACHE_TTL
        }
        redis_client.setex(
            cache_key,
            CACHE_TTL,
            json.dumps(cache_data, ensure_ascii=False)
        )
        logger.info(f"Cached analysis for sentence: {sentence[:50]}...")
    except Exception as e:
        logger.warning(f"Cache storage error: {e}")

def clear_cache_pattern(pattern: str = "*") -> int:
    if not CACHE_ENABLED or not redis_client:
        return 0
    try:
        keys = redis_client.keys(f"grammar_analysis:{pattern}")
        if keys:
            deleted = redis_client.delete(*keys)
            logger.info(f"Cleared {deleted} cache entries")
            return deleted
    except Exception as e:
        logger.warning(f"Cache clearing error: {e}")
    return 0 