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

## ZEERO AI FastAPI Service Structure

### Response Model (ChatResponse):
```json
{
  "answer": "Response text dari ZEERO AI",
  "confidence": 0.8,
  "topic_ok": true,
  "truncated": false
}
```

### Request Model (ChatRequest):
```json
{
  "query": "Pertanyaan tentang ORMIK 2025 STT Nurul Fikri: apa itu ORMIK?"
}
```

### Health Check Response:
```json
{
  "ok": true
}
```

## Integration Flow

1. **Next.js** receives chat request
2. **API Route** `/api/ai` processes and forwards to ZEERO AI
3. **ZEERO AI FastAPI** returns structured response
4. **Next.js** returns formatted response to frontend

## Environment Setup

### Development
```env
NODE_ENV=development
ZEERO_API_URL=http://localhost:8000
```

### Production
```env
NODE_ENV=production
ZEERO_API_URL=https://your-zeero-ai-domain.com
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
