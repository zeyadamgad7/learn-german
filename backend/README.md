# German Grammar Analyzer API

A FastAPI-powered web service that analyzes German sentences for grammar, parts of speech, and grammatical roles using Groq's LLM with Redis caching for improved performance.

## Features

- 🔍 **Grammar Analysis**: Analyze German sentences word by word
- 📝 **Part of Speech**: Identify nouns, verbs, articles, prepositions, etc.
- 🎯 **Grammatical Roles**: Determine subject, object, predicate roles
- 📊 **Case Analysis**: Identify Nominative, Accusative, Dative, Genitive cases
- ⚡ **Redis Caching**: Fast response times for repeated queries
- 🌐 **REST API**: Easy-to-use HTTP endpoints
- 📖 **Interactive Docs**: Auto-generated API documentation
- 🔒 **Security**: Input sanitization and injection attack prevention

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up Redis (Optional but recommended):**
   
   **Option 1: Local Redis installation**
   ```bash
   # macOS with Homebrew
   brew install redis
   brew services start redis
   
   # Ubuntu/Debian
   sudo apt update
   sudo apt install redis-server
   sudo systemctl start redis-server
   
   # Docker
   docker run -d -p 6379:6379 --name redis redis:alpine
   ```

   **Option 2: Use Redis Cloud or managed service**
   - Set `REDIS_URL` to your Redis connection string
   
   **Option 3: Docker Compose (recommended for development)**
   ```bash
   # Start Redis and Redis Commander (web UI)
   docker-compose up -d
   
   # Stop services
   docker-compose down
   
   # Access Redis Commander web UI at http://localhost:8081
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` with your configuration:
     ```
     GROQ_API_KEY=your_groq_api_key_here
     REDIS_URL=redis://localhost:6379
     CACHE_ENABLED=true
     CACHE_TTL=3600
     ```

4. **Start the server:**

   **Option 1: Simple startup (no auto-reload)**
   ```bash
   python main.py
   ```

   **Option 2: Development with auto-reload**
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

   **Option 3: Using the startup script**
   ```bash
   python start.py
   ```

   **Option 4: Production mode**
   ```bash
   ENVIRONMENT=production python start.py
   ```

## API Endpoints

### 🏠 Root
- **GET** `/` - Welcome message and link to docs

### 📊 Analyze German Sentence
- **POST** `/analyze`
- **Body**: `{"sentence": "Ich spiele Fußball mit meinem Freund."}`
- **Response**: Detailed grammatical analysis of each word
- **Features**: Automatic caching for improved performance

### ❤️ Health Check
- **GET** `/health` - Service health status including Redis connection

### 🔧 Admin Endpoints (Development only)
- **GET** `/admin/cache/stats` - Cache statistics and memory usage
- **POST** `/admin/cache/clear` - Clear all cached analyses

## Redis Caching

The API includes Redis caching for improved performance:

- **Automatic Caching**: Analysis results are automatically cached
- **Cache Key**: Based on normalized sentence content (case-insensitive)
- **TTL**: Configurable cache expiration (default: 1 hour)
- **Fallback**: Gracefully handles Redis connection failures
- **Statistics**: Monitor cache performance via admin endpoints

### Cache Configuration

```bash
# Environment variables
CACHE_ENABLED=true          # Enable/disable caching
CACHE_TTL=3600             # Cache TTL in seconds
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=            # Optional Redis password
```

### Cache Benefits

- ⚡ **Fast Response Times**: Cached results return in ~1ms vs ~2-5s for API calls
- 💰 **Cost Savings**: Reduces API calls to Groq
- 🔄 **Reliability**: Cached results available even during API outages
- 📊 **Monitoring**: Built-in cache statistics and health checks

## Usage Examples

### Using curl:
```bash
curl -X POST "http://localhost:8000/analyze" \
     -H "Content-Type: application/json" \
     -d '{"sentence": "Ich spiele Fußball mit meinem Freund."}'
```

### Using Python:
```python
import requests

response = requests.post(
    "http://localhost:8000/analyze",
    json={"sentence": "Ich spiele Fußball mit meinem Freund."}
)

result = response.json()
print(result)
```

### Using the test script:
```bash
python test_api.py
```

### Testing cache functionality:
```bash
python test_cache.py
```

## Response Format

The API returns a detailed analysis with the following structure:

```json
{
  "sentence": "Ich spiele Fußball mit meinem Freund.",
  "analysis": [
    {
      "word": "Ich",
      "part_of_speech": "Pronoun",
      "role": "Subject",
      "case": "Nominative",
      "person": "1st",
      "number": "Singular",
      "explanation": "First person singular pronoun serving as the subject of the sentence."
    }
    // ... more words
  ],
  "analysis_timestamp": "2025-07-14T10:30:00.123456",
  "word_count": 6,
  "cached": false,
  "cached_at": null,
  "processing_time_ms": 2341.5
}
```

### Response Fields

- `sentence`: The original input sentence
- `analysis`: Array of word analyses
- `analysis_timestamp`: When the analysis was performed
- `word_count`: Number of words analyzed
- `cached`: Whether the result came from cache
- `cached_at`: When the result was cached (if applicable)
- `processing_time_ms`: Processing time in milliseconds
```

## Interactive Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Development

The application uses:
- **FastAPI** for the web framework
- **Pydantic** for data validation
- **Groq** for LLM-powered grammar analysis
- **Uvicorn** as the ASGI server

## Environment Variables

- `GROQ_API_KEY` - Your Groq API key (required)
