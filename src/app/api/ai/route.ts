import { NextRequest, NextResponse } from 'next/server'

// Ollama configuration
const OLLAMA_CONFIG = {
     development: {
          baseUrl: 'http://localhost:11434',
          model: 'llama3.1:8b'
     },
     production: {
          // Your local network Ollama server
          baseUrl: process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434',
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
     const startTime = Date.now()
     
     // Get Ollama configuration based on environment
     const isDev = process.env.NODE_ENV === 'development'
     const config = isDev ? OLLAMA_CONFIG.development : OLLAMA_CONFIG.production
     
     try {
          // Get client IP for rate limiting
          const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown'

          // Check rate limit
          if (isRateLimited(ip)) {
               console.log(`[RATE_LIMIT] IP ${ip} exceeded rate limit`)
               return NextResponse.json({
                    error: 'Rate limit exceeded. Please try again later.',
                    fallback: true,
                    debug: { rateLimited: true, ip }
               }, { status: 429 })
          }

          const { message } = await request.json()

          if (!message || message.trim().length === 0) {
               console.log(`[VALIDATION_ERROR] Empty message from IP ${ip}`)
               return NextResponse.json({
                    error: 'Message is required',
                    fallback: true,
                    debug: { emptyMessage: true }
               }, { status: 400 })
          }

          // Get Ollama configuration based on environment
          console.log(`[OLLAMA_CONFIG] Environment: ${isDev ? 'development' : 'production'}`)
          console.log(`[OLLAMA_CONFIG] Base URL: ${config.baseUrl}`)
          console.log(`[OLLAMA_CONFIG] Model: ${config.model}`)

          // Build specialized ORMIK prompt
          const prompt = buildORMIKPrompt(message)

          // Pre-connection test
          console.log(`[CONNECTION_TEST] Testing connection to ${config.baseUrl}...`)
          
          // Call Ollama API with timeout
          const controller = new AbortController()
          const timeoutId = setTimeout(() => {
               console.log(`[TIMEOUT] Request to ${config.baseUrl} timed out after 15 seconds`)
               controller.abort()
          }, 15000) // 15 second timeout

          console.log(`[OLLAMA_REQUEST] Sending request to ${config.baseUrl}/api/generate`)
          console.log(`[OLLAMA_REQUEST] Model: ${config.model}`)
          console.log(`[OLLAMA_REQUEST] Prompt length: ${prompt.length} chars`)

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
          
          const responseTime = Date.now() - startTime
          console.log(`[OLLAMA_RESPONSE] Status: ${ollamaResponse.status}`)
          console.log(`[OLLAMA_RESPONSE] Response time: ${responseTime}ms`)

          if (!ollamaResponse.ok) {
               const errorText = await ollamaResponse.text()
               console.error(`[OLLAMA_ERROR] Status: ${ollamaResponse.status}`)
               console.error(`[OLLAMA_ERROR] Response: ${errorText}`)
               
               throw new Error(`Ollama API error: ${ollamaResponse.status} - ${errorText}`)
          }

          const data = await ollamaResponse.json()
          console.log(`[OLLAMA_SUCCESS] Response length: ${data.response?.length || 0} chars`)

          // Clean and validate response
          let response = data.response?.trim() || ''

          // Remove any potential prompt leakage
          response = response.replace(/ATURAN PENTING:[\s\S]*?JAWABAN/g, '')
          response = response.replace(/KONTEKS ORMIK[\s\S]*?JAWABAN/g, '')

          // Ensure response is about ORMIK/STT NF
          const isRelevant = /ormik|stt|nurul fikri|zeero|orientasi|mahasiswa/i.test(response.toLowerCase())

          if (!isRelevant && response.length > 50) {
               response = "Maaf, saya hanya bisa membantu pertanyaan seputar ORMIK 2025 dan STT Nurul Fikri. Silakan hubungi @ormikxplore di Instagram untuk informasi lainnya. 😊"
               console.log(`[RELEVANCE_FILTER] Response filtered for relevance`)
          }

          console.log(`[SUCCESS] Total request time: ${Date.now() - startTime}ms`)

          return NextResponse.json({
               response: response,
               model: config.model,
               timestamp: new Date().toISOString(),
               fallback: false,
               debug: {
                    responseTime: Date.now() - startTime,
                    baseUrl: config.baseUrl,
                    environment: isDev ? 'development' : 'production'
               }
          })

     } catch (error) {
          const responseTime = Date.now() - startTime
          
          // Detailed error logging
          console.error(`[OLLAMA_API_ERROR] Time: ${responseTime}ms`)
          console.error(`[OLLAMA_API_ERROR] Config: ${JSON.stringify(config)}`)
          console.error(`[OLLAMA_API_ERROR] Error name: ${error instanceof Error ? error.name : 'Unknown'}`)
          console.error(`[OLLAMA_API_ERROR] Error message: ${error instanceof Error ? error.message : String(error)}`)
          
          if (error instanceof Error) {
               // Network-specific error details
               if (error.message.includes('ECONNREFUSED')) {
                    console.error(`[CONNECTION_ERROR] Ollama server is not running or not accessible at ${config.baseUrl}`)
               } else if (error.message.includes('ENOTFOUND')) {
                    console.error(`[DNS_ERROR] Cannot resolve hostname in ${config.baseUrl}`)
               } else if (error.message.includes('ETIMEDOUT')) {
                    console.error(`[TIMEOUT_ERROR] Connection to ${config.baseUrl} timed out`)
               } else if (error.message.includes('aborted')) {
                    console.error(`[ABORT_ERROR] Request was aborted (likely timeout)`)
               }
          }

          // Return detailed error for debugging
          return NextResponse.json({
               error: 'AI service temporarily unavailable',
               fallback: true,
               timestamp: new Date().toISOString(),
               debug: {
                    responseTime,
                    baseUrl: config.baseUrl,
                    model: config.model,
                    environment: process.env.NODE_ENV,
                    errorName: error instanceof Error ? error.name : 'Unknown',
                    errorMessage: error instanceof Error ? error.message : String(error),
                    // Connection troubleshooting hints
                    troubleshooting: {
                         checkOllamaRunning: `curl ${config.baseUrl}/api/tags`,
                         checkPort: `telnet ${config.baseUrl.replace('http://', '').split(':')[0]} 11434`,
                         checkNetwork: `ping ${config.baseUrl.replace('http://', '').split(':')[0]}`
                    }
               }
          }, { status: 503 })
     }
}

// Enhanced health check endpoint with detailed diagnostics
export async function GET() {
     const startTime = Date.now()
     
     // Get Ollama configuration based on environment
     const isDev = process.env.NODE_ENV === 'development'
     const config = isDev ? OLLAMA_CONFIG.development : OLLAMA_CONFIG.production
     
     try {

          console.log(`[HEALTH_CHECK] Starting health check...`)
          console.log(`[HEALTH_CHECK] Environment: ${isDev ? 'development' : 'production'}`)
          console.log(`[HEALTH_CHECK] Base URL: ${config.baseUrl}`)
          console.log(`[HEALTH_CHECK] Model: ${config.model}`)

          // Test connection to Ollama
          console.log(`[HEALTH_CHECK] Testing connection to ${config.baseUrl}/api/tags`)
          
          const response = await fetch(`${config.baseUrl}/api/tags`, {
               method: 'GET',
               signal: AbortSignal.timeout(5000)
          })
          
          const responseTime = Date.now() - startTime
          console.log(`[HEALTH_CHECK] Response status: ${response.status}`)
          console.log(`[HEALTH_CHECK] Response time: ${responseTime}ms`)

          if (response.ok) {
               const data = await response.json()
               const models = data.models || []
               const hasRequiredModel = models.some((m: { name: string }) => m.name === config.model)
               
               console.log(`[HEALTH_CHECK] Available models: ${models.map((m: { name: string }) => m.name).join(', ')}`)
               console.log(`[HEALTH_CHECK] Required model ${config.model} available: ${hasRequiredModel}`)

               return NextResponse.json({
                    status: 'healthy',
                    environment: isDev ? 'development' : 'production',
                    baseUrl: config.baseUrl,
                    model: config.model,
                    responseTime,
                    availableModels: models.map((m: { name: string; size: number; modified_at: string }) => ({
                         name: m.name,
                         size: m.size,
                         modifiedAt: m.modified_at
                    })),
                    hasRequiredModel,
                    timestamp: new Date().toISOString(),
                    debug: {
                         connectionTest: 'SUCCESS',
                         modelsFound: models.length
                    }
               })
          } else {
               const errorText = await response.text()
               console.error(`[HEALTH_CHECK] Error response: ${response.status} - ${errorText}`)
               
               throw new Error(`Ollama responded with ${response.status}: ${errorText}`)
          }
     } catch (error) {
          const responseTime = Date.now() - startTime
          
          console.error(`[HEALTH_CHECK_ERROR] Time: ${responseTime}ms`)
          console.error(`[HEALTH_CHECK_ERROR] Config: ${JSON.stringify(config)}`)
          console.error(`[HEALTH_CHECK_ERROR] Error: ${error instanceof Error ? error.message : String(error)}`)

          // Determine error type for better diagnostics
          let errorType = 'UNKNOWN'
          let troubleshootingSteps: string[] = []

          if (error instanceof Error) {
               if (error.message.includes('ECONNREFUSED')) {
                    errorType = 'CONNECTION_REFUSED'
                    troubleshootingSteps = [
                         'Check if Ollama is running: systemctl status ollama',
                         'Start Ollama: systemctl start ollama',
                         'Check port: netstat -tulpn | grep 11434'
                    ]
               } else if (error.message.includes('ENOTFOUND')) {
                    errorType = 'DNS_RESOLUTION'
                    troubleshootingSteps = [
                         'Check hostname resolution',
                         'Verify IP address is correct',
                         'Test ping to host'
                    ]
               } else if (error.message.includes('timeout')) {
                    errorType = 'TIMEOUT'
                    troubleshootingSteps = [
                         'Check network connectivity',
                         'Verify firewall settings',
                         'Test connection: curl ' + config?.baseUrl + '/api/tags'
                    ]
               } else if (error.message.includes('404')) {
                    errorType = 'ENDPOINT_NOT_FOUND'
                    troubleshootingSteps = [
                         'Ollama is running but API endpoints not available',
                         'Check Ollama version compatibility',
                         'Restart Ollama service'
                    ]
               }
          }

          return NextResponse.json({
               status: 'unhealthy',
               environment: process.env.NODE_ENV,
               baseUrl: config.baseUrl,
               model: config.model,
               responseTime,
               error: error instanceof Error ? error.message : 'Unknown error',
               errorType,
               timestamp: new Date().toISOString(),
               debug: {
                    connectionTest: 'FAILED',
                    errorName: error instanceof Error ? error.name : 'Unknown',
                    baseUrlParsed: {
                         protocol: config.baseUrl.split('://')[0],
                         host: config.baseUrl.split('://')[1]?.split(':')[0],
                         port: config.baseUrl.split(':')[2] || '80'
                    }
               },
               troubleshooting: {
                    steps: troubleshootingSteps,
                    quickTest: `curl ${config.baseUrl}/api/tags`,
                    checkService: 'systemctl status ollama',
                    checkPort: 'netstat -tulpn | grep 11434',
                    checkModels: 'ollama list'
               }
          }, { status: 503 })
     }
}
