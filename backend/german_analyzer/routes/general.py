from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import FileResponse
from fastapi.openapi.utils import get_openapi
from slowapi import Limiter
from slowapi.util import get_remote_address
from datetime import datetime
import os
from ..config import ENVIRONMENT

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

@router.get("/")
@limiter.limit("10/minute")
async def root(request: Request):
    return {
        "message": "German Grammar Analyzer API",
        "docs": "/docs",
        "version": "1.0.0",
        "status": "operational"
    }

@router.get("/debug/headers")
async def debug_headers(request: Request):
    if ENVIRONMENT == "production":
        raise HTTPException(status_code=404, detail="Not found")
    return {
        "headers": dict(request.headers),
        "client_ip": get_remote_address(request),
        "url": str(request.url),
        "method": request.method
    }

@router.get("/test", include_in_schema=False)
async def test_page():
    test_file_path = os.path.join(os.path.dirname(__file__), "..", "test.html")
    if os.path.exists(test_file_path):
        return FileResponse(test_file_path, media_type="text/html")
    else:
        return {"message": "Test page not found", "docs": "/docs", "redoc": "/redoc"}

@router.get("/openapi.json", include_in_schema=False)
async def get_openapi_schema(request: Request):
    app = request.app
    if hasattr(app, "openapi_schema") and app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )
    app.openapi_schema = openapi_schema
    return openapi_schema 