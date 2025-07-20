from fastapi import APIRouter, Request, HTTPException, status
from slowapi import Limiter
from slowapi.util import get_remote_address
from datetime import datetime
from ..cache import clear_cache_pattern, redis_client, CACHE_ENABLED, CACHE_TTL
from ..config import ENVIRONMENT

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

@router.post("/admin/cache/clear")
@limiter.limit("2/minute")
async def clear_cache(request: Request):
    if ENVIRONMENT == "production":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not found"
        )
    if not CACHE_ENABLED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cache is not enabled"
        )
    try:
        cleared_count = clear_cache_pattern("*")
        return {
            "status": "success",
            "message": f"Cleared {cleared_count} cache entries",
            "timestamp": datetime.now().isoformat()
        }
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to clear cache"
        )

@router.get("/admin/cache/stats")
@limiter.limit("10/minute")
async def cache_stats(request: Request):
    if ENVIRONMENT == "production":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not found"
        )
    if not CACHE_ENABLED or not redis_client:
        return {
            "cache_enabled": False,
            "message": "Cache is not enabled or not connected"
        }
    try:
        cache_keys = redis_client.keys("grammar_analysis:*")
        cache_count = len(cache_keys)
        info = redis_client.info("memory")
        return {
            "cache_enabled": True,
            "total_cached_analyses": cache_count,
            "cache_ttl_seconds": CACHE_TTL,
            "redis_memory_used": info.get("used_memory_human", "unknown"),
            "redis_memory_peak": info.get("used_memory_peak_human", "unknown"),
            "timestamp": datetime.now().isoformat()
        }
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve cache statistics"
        ) 