# Environment Variables untuk ZEERO AI Integration

## Development (.env.local)
```env
NODE_ENV=development
ZEERO_API_URL=http://localhost:3001

# Rate limiting
RATE_LIMIT_MAX=15
RATE_LIMIT_WINDOW=3600000
```

## Production (Coolify Environment)
```env
NODE_ENV=production
ZEERO_API_URL=https://your-zeero-ai-service.com

# Rate limiting
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW=3600000
```

## ZEERO AI Service Requirements

Your ZEERO AI service should have these endpoints:

### 1. Chat Endpoint: `/v1/chat`
```json
POST /v1/chat
Content-Type: application/json

{
  "query": "Pertanyaan tentang ORMIK 2025 STT Nurul Fikri: apa itu ORMIK?"
}

Response:
{
  "response": "ORMIK adalah Orientasi Mahasiswa Ikatan Keluarga...",
  "status": "success"
}
```

### 2. Health Check Endpoint: `/health`
```json
GET /health

Response:
{
  "status": "healthy",
  "service": "ZEERO AI",
  "version": "1.0.0"
}
```

## Next.js Rewrite Configuration

The Next.js rewrite will proxy `/api/zeero/*` to your ZEERO AI service:

- `/api/zeero/v1/chat` → `${ZEERO_API_URL}/v1/chat`
- `/api/zeero/health` → `${ZEERO_API_URL}/health`

## Migration Steps

1. ✅ Update `next.config.ts` - DONE
2. ✅ Update API route `/api/ai/route.ts` - DONE
3. 🔄 Set environment variables
4. 🔄 Deploy ZEERO AI service
5. 🔄 Test integration

## Testing Commands

```bash
# Test health check
curl https://your-domain.com/api/ai

# Test chat
curl -X POST https://your-domain.com/api/ai \
  -H "Content-Type: application/json" \
  -d '{"message": "apa itu ORMIK?"}'
```
