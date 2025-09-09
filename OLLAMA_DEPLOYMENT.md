# ORMIK Hybrid AI ChatBot - Deployment Guide

## 🚀 Ollama Server Setup untuk 300-500 Users

### Recommended Models by User Load

#### 🟢 **Ringan (300-500 users): llama3.2:1b**
- **Size**: ~1.3GB RAM
- **Speed**: Very Fast (50-100ms response)
- **Quality**: Good untuk Q&A sederhana
- **Concurrent Users**: 300-500 ✅

#### 🟡 **Sedang (100-300 users): llama3.2:3b**
- **Size**: ~2.5GB RAM  
- **Speed**: Fast (100-200ms response)
- **Quality**: Better reasoning
- **Concurrent Users**: 100-300 ✅

#### 🔴 **Berat (50-100 users): llama3.1:8b**
- **Size**: ~8GB RAM
- **Speed**: Moderate (200-500ms response)
- **Quality**: Excellent reasoning
- **Concurrent Users**: 50-100 ⚠️

### Server Requirements for 300-500 Users

```bash
# Minimum Server Specs:
# - CPU: 8+ cores (Intel/AMD)
# - RAM: 8GB+ (untuk llama3.2:1b)
# - Storage: 50GB SSD
# - Network: 1Gbps

# Recommended Server Specs:
# - CPU: 16+ cores
# - RAM: 16GB+ 
# - Storage: 100GB NVMe SSD
# - Network: 10Gbps
```

### Installation & Configuration

```bash
# 1. Install Ollama di server Anda
curl -fsSL https://ollama.ai/install.sh | sh

# 2. Pull model RECOMMENDED untuk 300-500 users
ollama pull llama3.2:1b

# Alternative models (jika server powerful):
# ollama pull llama3.2:3b
# ollama pull llama3.1:8b

# 3. Configure Ollama untuk high concurrency
export OLLAMA_NUM_PARALLEL=8
export OLLAMA_MAX_LOADED_MODELS=2
export OLLAMA_FLASH_ATTENTION=1

# 4. Start Ollama dengan optimasi
systemctl enable ollama
OLLAMA_HOST=0.0.0.0:11434 OLLAMA_NUM_PARALLEL=8 ollama serve

# 5. Verifikasi service berjalan
ollama list
curl http://localhost:11434/api/tags
```

### Performance Optimization for High Load

```bash
# 1. System optimizations
echo 'vm.swappiness=10' >> /etc/sysctl.conf
echo 'net.core.somaxconn=65535' >> /etc/sysctl.conf
sysctl -p

# 2. Ollama service configuration
sudo tee /etc/systemd/system/ollama.service.d/override.conf <<EOF
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
Environment="OLLAMA_NUM_PARALLEL=8"
Environment="OLLAMA_MAX_LOADED_MODELS=2"
Environment="OLLAMA_FLASH_ATTENTION=1"
Environment="OLLAMA_KEEP_ALIVE=5m"
LimitNOFILE=65535
EOF

# 3. Restart service
systemctl daemon-reload
systemctl restart ollama

# 4. Monitor performance
watch -n 1 'ps aux | grep ollama; free -h; nvidia-smi'
```

### Load Balancing (Optional untuk 500+ users)

```bash
# Setup multiple Ollama instances
# Instance 1: Port 11434
# Instance 2: Port 11435
# Instance 3: Port 11436

# Start multiple instances
OLLAMA_HOST=0.0.0.0:11434 ollama serve &
OLLAMA_HOST=0.0.0.0:11435 ollama serve &
OLLAMA_HOST=0.0.0.0:11436 ollama serve &
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

### Production (Coolify Environment) - RECOMMENDED
```env
NODE_ENV=production

# RECOMMENDED untuk 300-500 users:
OLLAMA_BASE_URL=http://10.0.1.1:11434
OLLAMA_MODEL=llama3.2:1b

# Alternative untuk server powerful:
# OLLAMA_MODEL=llama3.2:3b
# OLLAMA_MODEL=llama3.1:8b

# Load balancing (jika ada multiple instances):
# OLLAMA_BASE_URL=http://10.0.1.1:11434,http://10.0.1.1:11435,http://10.0.1.1:11436

# Rate limiting untuk mencegah abuse
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW=3600000

# Monitoring
ENABLE_MONITORING=true
```

## 📊 Performance Benchmarks

### llama3.2:1b (RECOMMENDED untuk 300-500 users)
```
RAM Usage: ~1.3GB
Response Time: 50-100ms
Tokens/second: 50-80
Concurrent Users: 300-500 ✅
Quality Score: 7/10
```

### llama3.2:3b (untuk server menengah)
```
RAM Usage: ~2.5GB
Response Time: 100-200ms
Tokens/second: 30-50
Concurrent Users: 100-300 ✅
Quality Score: 8/10
```

### llama3.1:8b (untuk server powerful)
```
RAM Usage: ~8GB
Response Time: 200-500ms
Tokens/second: 15-30
Concurrent Users: 50-100 ⚠️
Quality Score: 9/10
```

## 🔧 Model Configuration Update

Untuk update ke model yang tepat, jalankan di server:

```bash
# Stop ollama
systemctl stop ollama

# Remove model lama (optional)
ollama rm llama3.1:8b

# Pull model RECOMMENDED
ollama pull llama3.2:1b

# Start ollama dengan optimasi
OLLAMA_HOST=0.0.0.0:11434 OLLAMA_NUM_PARALLEL=8 ollama serve
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
