import { NextRequest, NextResponse } from 'next/server'

// ZEERO AI configuration
const ZEERO_CONFIG = {
     development: {
          baseUrl: process.env.ZEERO_API_URL || 'http://localhost:3001',
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

          // Log ZEERO AI configuration
          console.log(`[ZEERO_CONFIG] Environment: ${isDev ? 'development' : 'production'}`)
          console.log(`[ZEERO_CONFIG] Base URL: ${config.baseUrl}`)
          console.log(`[ZEERO_CONFIG] Endpoint: ${config.endpoint}`)

          // Build ORMIK query for ZEERO AI
          const query = buildORMIKQuery(message)

          // Call ZEERO AI API with timeout
          const controller = new AbortController()
          const timeoutId = setTimeout(() => {
               console.log(`[TIMEOUT] Request to ${config.baseUrl} timed out after 15 seconds`)
               controller.abort()
          }, 15000) // 15 second timeout

          console.log(`[ZEERO_REQUEST] Sending request to ${config.baseUrl}${config.endpoint}`)
          console.log(`[ZEERO_REQUEST] Query length: ${query.length} chars`)

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
          console.log(`[ZEERO_RESPONSE] Status: ${zeeroResponse.status}`)
          console.log(`[ZEERO_RESPONSE] Response time: ${responseTime}ms`)

          if (!zeeroResponse.ok) {
               const errorText = await zeeroResponse.text()
               console.error(`[ZEERO_ERROR] Status: ${zeeroResponse.status}`)
               console.error(`[ZEERO_ERROR] Response: ${errorText}`)
               
               throw new Error(`ZEERO AI API error: ${zeeroResponse.status} - ${errorText}`)
          }

          const data = await zeeroResponse.json()
          console.log(`[ZEERO_SUCCESS] Response received`)

          // Extract response from ZEERO AI (matching FastAPI response structure)
          let response = data.answer || data.response || data.message || ''

          if (!response) {
               throw new Error('No response received from ZEERO AI')
          }

          // Log additional ZEERO AI metadata
          const confidence = data.confidence || 0
          const topicOk = data.topic_ok !== undefined ? data.topic_ok : true
          const truncated = data.truncated || false

          console.log(`[ZEERO_METADATA] Confidence: ${confidence}, Topic OK: ${topicOk}, Truncated: ${truncated}`)
          console.log(`[SUCCESS] Total request time: ${Date.now() - startTime}ms`)

          return NextResponse.json({
               response: response,
               service: 'ZEERO AI',
               confidence: confidence,
               topicOk: topicOk,
               truncated: truncated,
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
          console.error(`[ZEERO_API_ERROR] Time: ${responseTime}ms`)
          console.error(`[ZEERO_API_ERROR] Config: ${JSON.stringify(config)}`)
          console.error(`[ZEERO_API_ERROR] Error name: ${error instanceof Error ? error.name : 'Unknown'}`)
          console.error(`[ZEERO_API_ERROR] Error message: ${error instanceof Error ? error.message : String(error)}`)
          
          if (error instanceof Error) {
               // Network-specific error details
               if (error.message.includes('ECONNREFUSED')) {
                    console.error(`[CONNECTION_ERROR] ZEERO AI server is not running or not accessible at ${config.baseUrl}`)
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
                    environment: process.env.NODE_ENV,
                    errorName: error instanceof Error ? error.name : 'Unknown',
                    errorMessage: error instanceof Error ? error.message : String(error),
                    // Connection troubleshooting hints
                    troubleshooting: {
                         checkServiceRunning: `curl ${config.baseUrl}${config.endpoint}`,
                         checkNetwork: `ping ${config.baseUrl.replace('http://', '').replace('https://', '').split(':')[0]}`,
                         checkEnvironment: 'Verify ZEERO_API_URL environment variable'
                    }
               }
          }, { status: 503 })
     }
}

// Enhanced health check endpoint with detailed diagnostics
export async function GET() {
     const startTime = Date.now()
     
     // Get ZEERO AI configuration based on environment
     const isDev = process.env.NODE_ENV === 'development'
     const config = isDev ? ZEERO_CONFIG.development : ZEERO_CONFIG.production
     
     try {

          console.log(`[HEALTH_CHECK] Starting health check...`)
          console.log(`[HEALTH_CHECK] Environment: ${isDev ? 'development' : 'production'}`)
          console.log(`[HEALTH_CHECK] Base URL: ${config.baseUrl}`)

          // Test connection to ZEERO AI
          console.log(`[HEALTH_CHECK] Testing connection to ${config.baseUrl}/health`)
          
          const response = await fetch(`${config.baseUrl}/health`, {
               method: 'GET',
               signal: AbortSignal.timeout(5000)
          })
          
          const responseTime = Date.now() - startTime
          console.log(`[HEALTH_CHECK] Response status: ${response.status}`)
          console.log(`[HEALTH_CHECK] Response time: ${responseTime}ms`)

          if (response.ok) {
               const data = await response.json()
               
               console.log(`[HEALTH_CHECK] ZEERO AI service is healthy`)

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
               console.error(`[HEALTH_CHECK] Error response: ${response.status} - ${errorText}`)
               
               throw new Error(`ZEERO AI responded with ${response.status}: ${errorText}`)
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
                         'Check if ZEERO AI service is running',
                         'Verify ZEERO_API_URL environment variable',
                         'Test connection manually'
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
                         'Test connection: curl ' + config?.baseUrl
                    ]
               } else if (error.message.includes('404')) {
                    errorType = 'ENDPOINT_NOT_FOUND'
                    troubleshootingSteps = [
                         'ZEERO AI is running but health endpoint not available',
                         'Check service version compatibility',
                         'Restart ZEERO AI service'
                    ]
               }
          }

          return NextResponse.json({
               status: 'unhealthy',
               environment: process.env.NODE_ENV,
               baseUrl: config.baseUrl,
               service: 'ZEERO AI',
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
                    quickTest: `curl ${config.baseUrl}/health`,
                    checkEnvironment: 'echo $ZEERO_API_URL',
                    testEndpoint: `curl ${config.baseUrl}${config.endpoint}`
               }
          }, { status: 503 })
     }
}
