from fastapi import APIRouter, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from datetime import datetime
from ..groq_client import client
from ..cache import redis_client, CACHE_ENABLED, CACHE_TTL
from ..config import ENVIRONMENT

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

@router.get("/health")
@limiter.limit("30/minute")
async def health_check(request: Request):
    health_status = {"status": "healthy"}
    try:
        test_completion = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[{"role": "user", "content": "Test"}],
            max_completion_tokens=10,
            temperature=0
        )
        groq_status = "healthy" if test_completion else "unhealthy"
    except Exception:
        groq_status = "unhealthy"
        health_status["status"] = "degraded"
    redis_status = "disabled"
    redis_info = {}
    if CACHE_ENABLED and redis_client:
        try:
            redis_client.ping()
            redis_status = "healthy"
            info = redis_client.info()
            redis_info = {
                "connected_clients": info.get("connected_clients", 0),
                "used_memory_human": info.get("used_memory_human", "unknown"),
                "redis_version": info.get("redis_version", "unknown"),
                "uptime_in_seconds": info.get("uptime_in_seconds", 0)
            }
        except Exception:
            redis_status = "unhealthy"
            health_status["status"] = "degraded"
    return {
        **health_status,
        "service": "German Grammar Analyzer",
        "timestamp": datetime.now().isoformat(),
        "groq_service": groq_status,
        "redis_service": redis_status,
        "redis_info": redis_info,
        "cache_enabled": CACHE_ENABLED,
        "cache_ttl": CACHE_TTL,
        "environment": ENVIRONMENT
    } 