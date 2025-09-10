// ZEERO AI Service for ORMIK ChatBot
// Primary AI service using ZEERO API with minimal keyword fallback
// Focused on intelligent responses from ZEERO AI

interface ZeeroResponse {
     response: string
     service: string
     confidence: number
     topicOk: boolean
     truncated: boolean
     fallback: boolean
     timestamp: string
     hasLinks?: boolean // New field to indicate if response contains links
}

// Export utility functions for external use
export function formatLinksInText(text: string): { formattedText: string; hasLinks: boolean } {
     // Regular expression to match URLs (http, https, ftp, www)
     const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|ftp:\/\/[^\s]+)/gi
     
     let hasLinks = false
     const formattedText = text.replace(urlRegex, (url) => {
          hasLinks = true
          
          // Ensure URL has protocol
          let fullUrl = url
          if (url.startsWith('www.')) {
               fullUrl = 'https://' + url
          }
          
          // Create a clickable link format for markdown-like rendering
          // This will be processed by the ChatBot component
          return `[${url}](${fullUrl})`
     })
     
     // Also handle existing markdown-style links to ensure they're preserved
     const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
     if (markdownLinkRegex.test(formattedText)) {
          hasLinks = true
     }
     
     return { formattedText, hasLinks }
}

// Test function for URL detection (for development/debugging)
export function testUrlDetection() {
     const testCases = [
          "Visit https://www.instagram.com/ormikxplore/ for more info",
          "Check out www.google.com and https://github.com",
          "Already formatted: [Instagram](https://www.instagram.com/ormikxplore/)",
          "Mixed: Visit https://example.com or [Custom Link](https://custom.com)",
          "No links in this text"
     ]
     
     console.log("🔗 URL Detection Test Results:")
     testCases.forEach((test, index) => {
          const result = formatLinksInText(test)
          console.log(`${index + 1}. "${test}"`)
          console.log(`   → "${result.formattedText}" (hasLinks: ${result.hasLinks})`)
          console.log("")
     })
}

class ZeeroAIService {
     private zeeroHealthy: boolean = false
     private lastHealthCheck: number = 0
     private readonly HEALTH_CHECK_INTERVAL = 30000 // 30 seconds
     private readonly API_ENDPOINT = '/api/zeero'

     constructor() {
          this.checkZeeroHealth()
     }

     // Primary method: Always try ZEERO AI first
     async getAIResponse(userInput: string): Promise<ZeeroResponse> {
          try {
               // Always attempt ZEERO AI first
               const zeeroResponse = await this.callZeeroAI(userInput)

               if (zeeroResponse && !zeeroResponse.fallback) {
                    return zeeroResponse
               }

               return this.getMinimalFallback(userInput)

          } catch (error) {
               console.error('[ZEERO_AI] Error calling ZEERO AI:', error)
               return this.getMinimalFallback(userInput)
          }
     }

     // Call ZEERO AI API
     private async callZeeroAI(userInput: string): Promise<ZeeroResponse | null> {
          try {
               const controller = new AbortController()
               const timeoutId = setTimeout(() => controller.abort(), 30000) // Increased to 30 seconds

               const response = await fetch(this.API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: userInput }),
                    signal: controller.signal
               })

               clearTimeout(timeoutId)

               if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`)
               }

               const data = await response.json()

               // Mark as healthy if we get a successful response
               this.zeeroHealthy = true
               this.lastHealthCheck = Date.now()

               // Process response text to format links
               const rawResponse = data.response || ''
               const { formattedText, hasLinks } = formatLinksInText(rawResponse)

               return {
                    response: formattedText,
                    service: data.service || 'ZEERO AI',
                    confidence: data.confidence || 0,
                    topicOk: data.topicOk !== undefined ? data.topicOk : true,
                    truncated: data.truncated || false,
                    fallback: data.fallback || false,
                    timestamp: data.timestamp || new Date().toISOString(),
                    hasLinks: hasLinks
               }

          } catch (error) {
               console.error('[ZEERO_AI] API call failed:', error)
               this.zeeroHealthy = false
               return null
          }
     }

     // Minimal fallback - only for critical failures
     private getMinimalFallback(userInput: string): ZeeroResponse {
          const lowerInput = userInput.toLowerCase()

          let response = ''

          // Very basic emergency responses
          if (lowerInput.includes('halo') || lowerInput.includes('hai') || lowerInput.includes('hello')) {
               response = "Halo! Saya **ZEERO** 🤖, AI Assistant untuk ORMIK 2025. Maaf, sistem utama sedang dalam pemeliharaan. Silakan hubungi @ormikxplore di Instagram untuk informasi lebih lanjut."
          } else if (lowerInput.includes('jadwal') || lowerInput.includes('schedule')) {
               response = "📅 **Jadwal ORMIK 2025:**\n• PRA ORMIK: Senin, 8 September 2025\n• DAY 1: Selasa, 16 September 2025\n• LAST DAY: Sabtu, 20 September 2025\n\nInfo lengkap: @ormikxplore"
          } else if (lowerInput.includes('kontak') || lowerInput.includes('instagram')) {
               response = "📞 **Kontak ORMIK 2025:**\nInstagram: @ormikxplore\nLink: https://www.instagram.com/ormikxplore/\n\nSemua informasi resmi melalui DM Instagram ya! 📱"
          } else {
               response = "Maaf, sistem ZEERO sedang dalam pemeliharaan. Untuk informasi lengkap tentang ORMIK 2025, silakan hubungi @ormikxplore di Instagram. Terima kasih! 🙏"
          }

          // Process fallback response for links as well
          const { formattedText, hasLinks } = formatLinksInText(response)

          return {
               response: formattedText,
               service: 'Fallback System',
               confidence: 0.1,
               topicOk: true,
               truncated: false,
               fallback: true,
               timestamp: new Date().toISOString(),
               hasLinks: hasLinks
          }
     }

     // Health check for ZEERO AI
     async checkZeeroHealth(): Promise<boolean> {
          const now = Date.now()

          // Skip if recently checked
          if (now - this.lastHealthCheck < this.HEALTH_CHECK_INTERVAL) {
               return this.zeeroHealthy
          }

          try {
               const response = await fetch(this.API_ENDPOINT, {
                    method: 'GET',
                    signal: AbortSignal.timeout(10000) // Increased to 10 seconds
               })

               this.zeeroHealthy = response.ok
               this.lastHealthCheck = now

               return this.zeeroHealthy

          } catch (error) {
               console.error('[ZEERO_HEALTH] Health check error:', error)
               this.zeeroHealthy = false
               this.lastHealthCheck = now
               return false
          }
     }

     // Get current health status
     getHealthStatus(): { status: string; lastCheck: number; healthy: boolean } {
          return {
               status: this.zeeroHealthy ? 'healthy' : 'unhealthy',
               lastCheck: this.lastHealthCheck,
               healthy: this.zeeroHealthy
          }
     }

     // Get service info
     getServiceInfo() {
          return {
               name: 'ZEERO AI',
               description: 'AI Assistant untuk ORMIK Explore 2025',
               version: '2.0.0',
               primaryService: 'ZEERO AI API',
               fallbackMode: 'Minimal keyword responses'
          }
     }
}

// Export singleton instance
export const zeeroAI = new ZeeroAIService()

// Main export function - prioritize ZEERO AI
export async function getAIResponse(userInput: string): Promise<ZeeroResponse> {
     return await zeeroAI.getAIResponse(userInput)
}

// Health check export
export async function checkAIHealth(): Promise<boolean> {
     return await zeeroAI.checkZeeroHealth()
}

// Service info export
export function getAIServiceInfo() {
     return zeeroAI.getServiceInfo()
}

// Legacy compatibility exports (will be removed in future versions)
export async function getORMIKResponse(userInput: string): Promise<ZeeroResponse> {
     console.warn('[DEPRECATED] getORMIKResponse is deprecated, use getAIResponse instead')
     return await getAIResponse(userInput)
}

export async function checkOllamaHealth(): Promise<boolean> {
     console.warn('[DEPRECATED] checkOllamaHealth is deprecated, use checkAIHealth instead')
     return await checkAIHealth()
}
