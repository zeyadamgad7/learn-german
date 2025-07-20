from datetime import datetime
from fastapi import Request
from slowapi.util import get_remote_address
import logging

logger = logging.getLogger(__name__)

async def security_middleware(request: Request, call_next):
    start_time = datetime.now()
    client_ip = get_remote_address(request)
    logger.info(f"Request from {client_ip}: {request.method} {request.url}")
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    if request.url.path in ["/docs", "/redoc"] or request.url.path.startswith("/docs") or request.url.path.startswith("/redoc"):
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com; "
            "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com; "
            "img-src 'self' data: https:; "
            "font-src 'self' https://cdn.jsdelivr.net https://unpkg.com; "
            "connect-src 'self';"
        )
    else:
        response.headers["Content-Security-Policy"] = "default-src 'self'"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    process_time = (datetime.now() - start_time).total_seconds()
    response.headers["X-Process-Time"] = str(process_time)
    return response 