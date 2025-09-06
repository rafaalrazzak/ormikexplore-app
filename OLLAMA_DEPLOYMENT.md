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

1. **Ollama Connection Failed (127.0.0.1:11434)**
   ```bash
   # Check if Ollama is running
   curl http://127.0.0.1:11434/api/tags
   
   # If connection refused:
   ollama serve
   
   # Check process
   ps aux | grep ollama
   ```

2. **Model Not Found**
   ```bash
   # Check available models
   ollama list
   
   # Pull required model
   ollama pull llama3.1:8b
   
   # Verify model exists
   curl http://127.0.0.1:11434/api/tags
   ```

3. **Service Unavailable (503 Error)**
   ```bash
   # Run debugging script
   bash debug-ollama.sh
   # atau untuk Windows:
   .\debug-ollama.ps1
   
   # Manual checks:
   systemctl status ollama    # Linux
   Get-Process ollama         # Windows
   ```

4. **Network Issues in Docker/Coolify**
   ```bash
   # Test from container
   docker exec [CONTAINER_ID] curl http://127.0.0.1:11434/api/tags
   
   # If 127.0.0.1 not accessible from container, try:
   # - host.docker.internal:11434 (Docker Desktop)
   # - 172.17.0.1:11434 (Docker Linux)
   # - Your actual IP address
   ```

5. **High Memory Usage**
   ```bash
   # Monitor model memory
   ollama ps
   
   # Use lighter model if needed
   ollama pull llama3.1:3b
   ```

### Debugging Tools

1. **Enhanced API Logs**
   - Check Coolify application logs
   - Look for detailed error messages dengan troubleshooting hints
   - Response includes connection test commands

2. **Health Check Endpoint**
   ```bash
   # Detailed health check
   curl https://your-app.coolify.io/api/ai
   
   # Returns:
   # - Connection status
   # - Available models
   # - Response times
   # - Troubleshooting commands
   ```

3. **Debug Scripts**
   ```bash
   # Linux/Mac
   bash debug-ollama.sh
   
   # Windows PowerShell
   .\debug-ollama.ps1
   ```

### Specific Fix for 127.0.0.1 Issues

Jika menggunakan `127.0.0.1:11434` dan masih error:

```bash
# 1. Pastikan Ollama running
ollama serve

# 2. Test koneksi lokal
curl http://127.0.0.1:11434/api/tags

# 3. Jika berhasil lokal tapi gagal dari Coolify:
# Update environment variable ke IP yang accessible dari container
# Cek IP dengan:
ip route get 1.1.1.1 | grep -oP 'src \K\S+'

# 4. Update di Coolify:
OLLAMA_BASE_URL=http://[ACTUAL_IP]:11434
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
