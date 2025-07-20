from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from german_analyzer.security_middleware import security_middleware
from german_analyzer.routes import grammar_analysis, admin, health_check, general
from german_analyzer.config import ENVIRONMENT

# Initialize FastAPI app
app = FastAPI(
    title="German Grammar Analyzer",
    description="Analyze German sentences for grammar, parts of speech, and grammatical roles",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Rate limiting setup
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Add CORS middleware
if ENVIRONMENT == "production":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["https://yourdomain.com"],
        allow_credentials=True,
        allow_methods=["GET", "POST"],
        allow_headers=["*"],
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )

# Add trusted host middleware
if ENVIRONMENT == "production":
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["localhost", "127.0.0.1", "*.localhost", "yourdomain.com"]
    )
else:
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["*"]
    )

# Add security middleware
app.middleware("http")(security_middleware)

# Include routers
app.include_router(general.router)
app.include_router(grammar_analysis.router)
app.include_router(health_check.router)
app.include_router(admin.router)

if __name__ == "__main__":
    import uvicorn
    config = {
        "host": "0.0.0.0",
        "port": 8000,
        "log_level": "info",
        "access_log": True,
        "server_header": False,
        "date_header": False,
    }
    if ENVIRONMENT == "production":
        import os
        config.update({
            "ssl_keyfile": os.getenv("SSL_KEYFILE"),
            "ssl_certfile": os.getenv("SSL_CERTFILE"),
        })
    print(f"🚀 Starting German Grammar Analyzer API on http://{config['host']}:{config['port']}")
    print(f"📚 API Documentation: http://localhost:{config['port']}/docs")
    print(f"🔒 Environment: {ENVIRONMENT}")
    if ENVIRONMENT == "development":
        print("🔄 Development mode: Use 'uvicorn app:app --reload' for auto-reload")
    uvicorn.run(app, **config) 