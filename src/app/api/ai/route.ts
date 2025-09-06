import { NextRequest, NextResponse } from 'next/server'

// Ollama configuration
const OLLAMA_CONFIG = {
  development: {
    baseUrl: 'http://localhost:11434',
    model: 'llama3.1:8b'
  },
  production: {
    // Your local network Ollama server
    baseUrl: process.env.OLLAMA_BASE_URL || 'http://192.168.1.100:11434',
    model: process.env.OLLAMA_MODEL || 'llama3.1:8b'
  }
}

// Rate limiting untuk mencegah overload
const requestCounts = new Map<string, { count: number, resetTime: number }>()
const RATE_LIMIT = {
  maxRequests: 10, // per IP per hour
  windowMs: 60 * 60 * 1000 // 1 hour
}

// Token management untuk mencegah limit
const MAX_INPUT_TOKENS = 2000  // ~1500 words
const MAX_OUTPUT_TOKENS = 800  // ~600 words

function getRateLimitKey(ip: string): string {
  return `rate_limit:${ip}`
}

function isRateLimited(ip: string): boolean {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const record = requestCounts.get(key)
  
  if (!record || now > record.resetTime) {
    requestCounts.set(key, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
    return false
  }
  
  if (record.count >= RATE_LIMIT.maxRequests) {
    return true
  }
  
  record.count++
  return false
}

function truncateInput(text: string, maxTokens: number = MAX_INPUT_TOKENS): string {
  // Simple token estimation: ~1 token = 4 characters for Indonesian
  const maxChars = maxTokens * 4
  if (text.length <= maxChars) return text
  
  return text.substring(0, maxChars) + '...'
}

function buildORMIKPrompt(userQuery: string): string {
  const truncatedQuery = truncateInput(userQuery)
  
  return `Kamu adalah ZEERO, AI Assistant khusus untuk ORMIK Explore 2025 di STT Terpadu Nurul Fikri.

ATURAN PENTING:
1. HANYA jawab pertanyaan tentang ORMIK 2025 dan STT Nurul Fikri
2. Jika pertanyaan di luar topik tersebut, jawab: "Maaf, saya hanya bisa membantu pertanyaan seputar ORMIK 2025 dan STT Nurul Fikri. Silakan hubungi @ormikxplore di Instagram untuk informasi lainnya."
3. Gunakan Bahasa Indonesia yang ramah dan informatif
4. Maksimal 400 kata per response
5. Gunakan emoji dan format markdown untuk menarik

KONTEKS ORMIK 2025:
- Orientasi Mahasiswa Ikatan Keluarga (ORMIK) STT Nurul Fikri
- Jadwal: PRA ORMIK (8 Sept), DAY 1-3 (16-18 Sept), LAST DAY (20 Sept 2025)
- Lokasi: STT Terpadu Nurul Fikri, Lenteng Agung, Jakarta Selatan
- Contact: Instagram @ormikxplore
- Tema: "ZEERO" - Zero to Hero Exploration

PERTANYAAN USER: ${truncatedQuery}

JAWABAN (maksimal 400 kata, fokus ORMIK/STT NF saja):`
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json({
        error: 'Rate limit exceeded. Please try again later.',
        fallback: true
      }, { status: 429 })
    }

    const { message } = await request.json()
    
    if (!message || message.trim().length === 0) {
      return NextResponse.json({
        error: 'Message is required',
        fallback: true
      }, { status: 400 })
    }

    // Get Ollama configuration based on environment
    const isDev = process.env.NODE_ENV === 'development'
    const config = isDev ? OLLAMA_CONFIG.development : OLLAMA_CONFIG.production
    
    // Build specialized ORMIK prompt
    const prompt = buildORMIKPrompt(message)
    
    // Call Ollama API with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout
    
    const ollamaResponse = await fetch(`${config.baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          top_k: 40,
          num_predict: MAX_OUTPUT_TOKENS,
          stop: ['USER:', 'HUMAN:', '\n\nUser:', '\n\nHuman:']
        }
      }),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!ollamaResponse.ok) {
      throw new Error(`Ollama API error: ${ollamaResponse.status}`)
    }
    
    const data = await ollamaResponse.json()
    
    // Clean and validate response
    let response = data.response?.trim() || ''
    
    // Remove any potential prompt leakage
    response = response.replace(/ATURAN PENTING:[\s\S]*?JAWABAN/g, '')
    response = response.replace(/KONTEKS ORMIK[\s\S]*?JAWABAN/g, '')
    
    // Ensure response is about ORMIK/STT NF
    const isRelevant = /ormik|stt|nurul fikri|zeero|orientasi|mahasiswa/i.test(response.toLowerCase())
    
    if (!isRelevant && response.length > 50) {
      response = "Maaf, saya hanya bisa membantu pertanyaan seputar ORMIK 2025 dan STT Nurul Fikri. Silakan hubungi @ormikxplore di Instagram untuk informasi lainnya. 😊"
    }
    
    return NextResponse.json({
      response: response,
      model: config.model,
      timestamp: new Date().toISOString(),
      fallback: false
    })
    
  } catch (error) {
    console.error('Ollama API Error:', error)
    
    // Return fallback indicator for hybrid system
    return NextResponse.json({
      error: 'AI service temporarily unavailable',
      fallback: true,
      timestamp: new Date().toISOString()
    }, { status: 503 })
  }
}

// Health check endpoint
export async function GET() {
  try {
    const isDev = process.env.NODE_ENV === 'development'
    const config = isDev ? OLLAMA_CONFIG.development : OLLAMA_CONFIG.production
    
    const response = await fetch(`${config.baseUrl}/api/tags`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    })
    
    if (response.ok) {
      return NextResponse.json({ 
        status: 'healthy', 
        environment: isDev ? 'development' : 'production',
        baseUrl: config.baseUrl 
      })
    } else {
      throw new Error('Ollama not responding')
    }
  } catch (error) {
    return NextResponse.json({ 
      status: 'unhealthy', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 503 })
  }
}
