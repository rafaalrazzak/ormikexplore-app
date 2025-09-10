import { NextRequest, NextResponse } from 'next/server'

// ZEERO AI configuration
const ZEERO_CONFIG = {
     development: {
          baseUrl: process.env.ZEERO_API_URL || 'http://localhost:6969',
          endpoint: '/v1/chat'
     },
     production: {
          baseUrl: process.env.ZEERO_API_URL || '',
          endpoint: '/v1/chat'
     }
}

// Rate limiting untuk mencegah overload
const requestCounts = new Map<string, { count: number, resetTime: number }>()
const RATE_LIMIT = {
     maxRequests: 500, // per IP per hour - increased for your own AI agent
     windowMs: 60 * 60 * 1000 // 1 hour
}

// Token management untuk mencegah limit
const MAX_INPUT_TOKENS = 8000  // ~6000 words - increased capacity

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

function buildORMIKQuery(userMessage: string): string {
     const truncatedMessage = truncateInput(userMessage)
     
     // Format query untuk ZEERO AI dengan konteks ORMIK
     return `Pertanyaan tentang ORMIK 2025 STT Nurul Fikri: ${truncatedMessage}`
}

export async function POST(request: NextRequest) {
     const startTime = Date.now()
     
     // Get ZEERO AI configuration based on environment
     const isDev = process.env.NODE_ENV === 'development'
     const config = isDev ? ZEERO_CONFIG.development : ZEERO_CONFIG.production
     
     try {
          // Get client IP for rate limiting
          const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown'

          // Check rate limit
          if (isRateLimited(ip)) {
               return NextResponse.json({
                    error: 'Rate limit exceeded. Please try again later.',
                    fallback: true,
                    debug: { rateLimited: true, ip }
               }, { status: 429 })
          }

          const { message } = await request.json()

          if (!message || message.trim().length === 0) {
               return NextResponse.json({
                    error: 'Message is required',
                    fallback: true,
                    debug: { emptyMessage: true }
               }, { status: 400 })
          }

          // Build ORMIK query for ZEERO AI
          const query = buildORMIKQuery(message)

          // Call ZEERO AI API with timeout
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 30000) // Increased to 30 seconds

          const zeeroResponse = await fetch(`${config.baseUrl}${config.endpoint}`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify({ query }),
               signal: controller.signal
          })

          clearTimeout(timeoutId)
          
          const responseTime = Date.now() - startTime

          if (!zeeroResponse.ok) {
               const errorText = await zeeroResponse.text()
               console.error(`[ZEERO_ERROR] ${zeeroResponse.status}: ${errorText}`)
               throw new Error(`ZEERO AI API error: ${zeeroResponse.status} - ${errorText}`)
          }

          const data = await zeeroResponse.json()

          // Extract response from ZEERO AI (matching FastAPI response structure)
          const response = data.answer || data.response || data.message || ''

          if (!response) {
               throw new Error('No response received from ZEERO AI')
          }

          // Log additional ZEERO AI metadata
          const confidence = data.confidence || 0
          const topicOk = data.topic_ok !== undefined ? data.topic_ok : true
          const truncated = data.truncated || false

          return NextResponse.json({
               response: response,
               service: 'ZEERO AI',
               confidence: confidence,
               topicOk: topicOk,
               truncated: truncated,
               timestamp: new Date().toISOString(),
               fallback: false,
               debug: {
                    responseTime: Date.now() - startTime
               }
          })

     } catch (error) {
          const responseTime = Date.now() - startTime
          
          // Simplified error logging - only essential info
          console.error(`[ZEERO_ERROR] ${responseTime}ms: ${error instanceof Error ? error.message : String(error)}`)
          
          // Network-specific error details
          if (error instanceof Error) {
               if (error.message.includes('ECONNREFUSED')) {
                    console.error(`[CONNECTION_ERROR] ZEERO AI not accessible at ${config.baseUrl}`)
               } else if (error.message.includes('ETIMEDOUT') || error.message.includes('aborted')) {
                    console.error(`[TIMEOUT_ERROR] Request timeout to ${config.baseUrl}`)
               }
          }

          return NextResponse.json({
               error: 'AI service temporarily unavailable',
               fallback: true,
               timestamp: new Date().toISOString(),
               debug: {
                    responseTime,
                    errorMessage: error instanceof Error ? error.message : String(error)
               }
          }, { status: 503 })
     }
}

// Health check endpoint - simplified logging
export async function GET() {
     const startTime = Date.now()
     const isDev = process.env.NODE_ENV === 'development'
     const config = isDev ? ZEERO_CONFIG.development : ZEERO_CONFIG.production
     
     try {
          const response = await fetch(`${config.baseUrl}/health`, {
               method: 'GET',
               signal: AbortSignal.timeout(10000) // Increased to 10 seconds
          })
          
          const responseTime = Date.now() - startTime

          if (response.ok) {
               const data = await response.json()
               
               return NextResponse.json({
                    status: 'healthy',
                    environment: isDev ? 'development' : 'production',
                    baseUrl: config.baseUrl,
                    service: 'ZEERO AI',
                    responseTime,
                    serviceHealth: data,
                    timestamp: new Date().toISOString(),
                    debug: {
                         connectionTest: 'SUCCESS',
                         serviceStatus: data.ok || 'unknown'
                    }
               })
          } else {
               const errorText = await response.text()
               console.error(`[HEALTH_CHECK] ${response.status}: ${errorText}`)
               throw new Error(`ZEERO AI responded with ${response.status}: ${errorText}`)
          }
     } catch (error) {
          const responseTime = Date.now() - startTime
          console.error(`[HEALTH_CHECK] ${responseTime}ms: ${error instanceof Error ? error.message : String(error)}`)

          return NextResponse.json({
               status: 'unhealthy',
               service: 'ZEERO AI',
               responseTime,
               error: error instanceof Error ? error.message : 'Unknown error',
               timestamp: new Date().toISOString()
          }, { status: 503 })
     }
}
