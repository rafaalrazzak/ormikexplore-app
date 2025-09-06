# ORMIK Hybrid AI ChatBot - Deployment Guide

## 🚀 Ollama Server Setup

### Prerequisites
1. Server dengan Ollama terinstall
2. Network yang sama dengan Coolify deployment
3. Model Llama 3.1 8B sudah di-pull

### Server Configuration

```bash
# 1. Install Ollama di server Anda
curl -fsSL https://ollama.ai/install.sh | sh

# 2. Pull model untuk Bahasa Indonesia
ollama pull llama3.1:8b

# 3. Start Ollama service (persistent)
systemctl enable ollama
systemctl start ollama

# 4. Verifikasi service berjalan
ollama list
curl http://localhost:11434/api/tags
```

### Network Configuration

```bash
# 5. Cek IP server internal
ip addr show

# 6. Test koneksi dari Coolify ke Ollama server
# Dari container Coolify:
curl http://[SERVER_IP]:11434/api/tags
```

## 🔧 Environment Variables

### Development (.env.local)
```env
NODE_ENV=development
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
```

### Production (Coolify Environment)
```env
NODE_ENV=production
OLLAMA_BASE_URL=http://[YOUR_SERVER_IP]:11434
OLLAMA_MODEL=llama3.1:8b
```

**Replace [YOUR_SERVER_IP] dengan IP internal server Ollama Anda**

## 📊 Performance Optimization

### Rate Limiting Configuration
- **Per IP**: 10 requests per hour
- **Token Limits**: 
  - Input: 2000 tokens (~1500 words)
  - Output: 800 tokens (~600 words)
- **Timeout**: 15 seconds per request

### Resource Management
```typescript
// Dalam API route, sudah dikonfigurasi:
- Queue system untuk concurrent requests
- Automatic fallback ke keyword system
- Memory management untuk 200-400 users
```

## 🛡️ Security & Limits

### ORMIK-Specific Training
```typescript
// AI hanya trained untuk menjawab:
✅ Pertanyaan tentang ORMIK 2025
✅ Informasi STT Nurul Fikri
✅ Guidance & educational content

❌ Pertanyaan di luar scope
❌ Personal information
❌ Real-time data
```

### Auto-Denial System
```typescript
// Built-in filtering:
- Relevance checking
- Scope validation  
- Automatic "tidak tahu" response untuk off-topic
- Redirect ke Instagram @ormikxplore untuk non-ORMIK queries
```

## 🔄 Hybrid System Flow

```
User Query
    ↓
[Keyword Confidence Check]
    ↓ (< 0.85 confidence)
[Ollama Health Check]
    ↓ (healthy)
[Complex Query Detection]
    ↓ (complex)
[Ollama Processing]
    ↓ (success/failure)
[Keyword Fallback]
```

## 📈 Monitoring

### Health Checks
- `/api/ai` GET endpoint untuk status
- UI indicator di ChatBot header
- Automatic fallback bila Ollama down

### Performance Metrics
```bash
# Monitor dari server Ollama:
htop                    # CPU usage
free -h                 # Memory usage
netstat -tulpn | grep 11434  # Connection status
```

## 🚨 Troubleshooting

### Common Issues

1. **Ollama Connection Failed**
   ```bash
   # Check service
   systemctl status ollama
   
   # Restart if needed
   systemctl restart ollama
   ```

2. **Model Not Found**
   ```bash
   # Re-pull model
   ollama pull llama3.1:8b
   ```

3. **Network Issues**
   ```bash
   # Test dari Coolify container
   curl http://[SERVER_IP]:11434/api/tags
   ```

4. **High Memory Usage**
   ```bash
   # Monitor model memory
   ollama ps
   
   # Consider lighter model jika perlu
   ollama pull llama3.1:3b
   ```

## 🎯 Deployment Checklist

- [ ] Server Ollama setup & running
- [ ] Model llama3.1:8b downloaded
- [ ] Network connectivity tested
- [ ] Environment variables configured
- [ ] Coolify deployment successful
- [ ] Health check endpoint responding
- [ ] ChatBot UI showing "healthy" status
- [ ] Fallback to keyword system working

## 💰 Cost Estimation

### Server Requirements (200-400 users)
```
Minimum Server Specs:
- 4 Core CPU
- 16GB RAM  
- 50GB Storage
- Network: 100Mbps

Estimated Monthly Cost: $30-60/month
Response Time: 2-8 seconds
Concurrent Users: 5-10
```

### Alternative: Cloud API
```
Groq API (jika Ollama bermasalah):
- Cost: ~$5-15/month
- Response: <1 second
- Unlimited concurrent
- No server maintenance
```

---

**Setup selesai! ChatBot hybrid sudah siap untuk production dengan Ollama integration.** 🚀
