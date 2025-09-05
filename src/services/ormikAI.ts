// AI Service for ORMIK ChatBot using Ollama
// This service handles AI responses and document retrieval

interface OllamaResponse {
     model: string
     created_at: string
     response: string
     done: boolean
}

interface ChatContext {
     ormikData: {
          schedule: Array<{
               id: string
               title: string
               date: string
               fullDate: string
          }>
          divisions: Array<{
               name: string
               position: string
               description: string
          }>
          guidelines: string[]
          contact: {
               phone: string
               email: string
               social: Record<string, string>
          }
     }
}

class OrmikAIService {
     private baseUrl: string
     private model: string
     private context: ChatContext

     constructor() {
          this.baseUrl = process.env.NEXT_PUBLIC_OLLAMA_URL || 'http://localhost:11434'
          this.model = process.env.NEXT_PUBLIC_OLLAMA_MODEL || 'llama3.2:3b'
          this.context = this.initializeContext()
     }

     private initializeContext(): ChatContext {
          return {
               ormikData: {
                    schedule: [
                         { id: "pra-ormik", title: "PRA ORMIK", date: "Monday, Sept 8, 2025", fullDate: "2025-09-08" },
                         { id: "day-1", title: "DAY 1", date: "Tuesday, Sept 16, 2025", fullDate: "2025-09-16" },
                         { id: "day-2", title: "DAY 2", date: "Wednesday, Sept 17, 2025", fullDate: "2025-09-17" },
                         { id: "day-3", title: "DAY 3", date: "Thursday, Sept 18, 2025", fullDate: "2025-09-18" },
                         { id: "last-day", title: "LAST DAY", date: "Saturday, Sept 20, 2025", fullDate: "2025-09-20" }
                    ],
                    divisions: [
                         { name: "Project Officer", position: "PO", description: "Penanggung jawab penuh pelaksanaan ORMIK" },
                         { name: "Sekretaris", position: "SEKRETARIS", description: "Mengelola administrasi dan dokumentasi" },
                         { name: "Bendahara", position: "BENDAHARA", description: "Mengelola keuangan dan anggaran ORMIK" },
                         { name: "Liaison Officer", position: "LO", description: "Komunikasi dengan pihak eksternal dan internal" },
                         { name: "Event", position: "EVENT", description: "Perencanaan dan koordinasi seluruh rangkaian acara" },
                         { name: "Media", position: "MEDIA", description: "Dokumentasi dan produksi konten visual" },
                         { name: "Kreatif", position: "KREATIF", description: "Menciptakan suasana acara yang menarik dan interaktif" },
                         { name: "Kedisiplinan", position: "KEDISIPLINAN", description: "Memastikan ketertiban dan ketepatan waktu" },
                         { name: "Mentor", position: "MENTOR", description: "Membimbing dan mendampingi peserta ORMIK" },
                         { name: "Logistik", position: "LOGISTIK", description: "Mengatur perlengkapan dan sarana prasarana" },
                         { name: "Konsumsi", position: "KONSUMSI", description: "Menyediakan makanan dan minuman" },
                         { name: "Medis", position: "MEDIS", description: "Memastikan keselamatan dan kesehatan peserta" },
                         { name: "IT Support", position: "IT SUPPORT", description: "Mengelola sistem teknologi dan live streaming" }
                    ],
                    guidelines: [
                         "Datang tepat waktu sesuai jadwal yang ditentukan",
                         "Berpakaian sesuai dress code yang telah ditetapkan",
                         "Membawa perlengkapan yang diperlukan",
                         "Mengikuti arahan dari mentor dan panitia",
                         "Menjaga kebersihan dan ketertiban lingkungan",
                         "Berpartisipasi aktif dalam setiap kegiatan",
                         "Menjalin hubungan baik dengan sesama peserta",
                         "Menjaga nama baik almamater dan diri sendiri"
                    ],
                    contact: {
                         phone: "0812-3456-7890",
                         email: "info@ormik.stttnf.ac.id",
                         social: {
                              instagram: "@ormik.stttnf",
                              tiktok: "@ormikstttnf",
                              telegram: "@ormik2025"
                         }
                    }
               }
          }
     }

     async generateResponse(userInput: string): Promise<string> {
          try {
               // Check if Ollama is available
               if (!await this.isOllamaAvailable()) {
                    return this.getFallbackResponse(userInput)
               }

               const prompt = this.buildPrompt(userInput)
               const response = await this.callOllama(prompt)

               return response || this.getFallbackResponse(userInput)
          } catch (error) {
               console.error('Error generating AI response:', error)
               return this.getFallbackResponse(userInput)
          }
     }

     private async isOllamaAvailable(): Promise<boolean> {
          try {
               const response = await fetch(`${this.baseUrl}/api/tags`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
               })
               return response.ok
          } catch {
               return false
          }
     }

     private buildPrompt(userInput: string): string {
          const systemPrompt = `Kamu adalah Asisten AI untuk ORMIK Explore 2025 di STT Terpadu Nurul Fikri. 
    
CONTEXT ORMIK 2025:
- ORMIK (Orientasi Mahasiswa Baru) adalah program pengenalan kampus
- Berlokasi di STT Terpadu Nurul Fikri, Jakarta Selatan
- Dimulai dari tanggal 8 September 2025

JADWAL KEGIATAN:
${this.context.ormikData.schedule.map(s => `- ${s.title}: ${s.date}`).join('\n')}

STRUKTUR ORGANISASI:
${this.context.ormikData.divisions.map(d => `- ${d.position}: ${d.description}`).join('\n')}

PANDUAN UMUM:
${this.context.ormikData.guidelines.map(g => `- ${g}`).join('\n')}

KONTAK:
- WhatsApp: ${this.context.ormikData.contact.phone}
- Email: ${this.context.ormikData.contact.email}
- Instagram: ${this.context.ormikData.contact.social.instagram}

INSTRUKSI:
1. Jawab dalam bahasa Indonesia yang ramah dan informatif
2. Gunakan emoji yang relevan untuk membuat jawaban lebih menarik
3. Fokus pada informasi yang akurat tentang ORMIK 2025
4. Jika ditanya di luar topik ORMIK, arahkan kembali ke topik ORMIK
5. Berikan jawaban yang praktis dan membantu
6. Gunakan format yang mudah dibaca (bullet points, spasi, dll)

PERTANYAAN PENGGUNA: ${userInput}`

          return systemPrompt
     }

     private async callOllama(prompt: string): Promise<string | null> {
          try {
               const response = await fetch(`${this.baseUrl}/api/generate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                         model: this.model,
                         prompt: prompt,
                         stream: false,
                         options: {
                              temperature: 0.7,
                              top_p: 0.9,
                              max_tokens: 500
                         }
                    })
               })

               if (!response.ok) {
                    throw new Error(`Ollama API error: ${response.status}`)
               }

               const data: OllamaResponse = await response.json()
               return data.response?.trim() || null
          } catch (error) {
               console.error('Ollama API call failed:', error)
               return null
          }
     }

     private getFallbackResponse(userInput: string): string {
          const lowerInput = userInput.toLowerCase()

          // Keyword-based fallback responses
          if (lowerInput.includes('jadwal') || lowerInput.includes('schedule')) {
               return `📅 **Jadwal ORMIK Explore 2025:**

${this.context.ormikData.schedule.map(s => `• **${s.title}** - ${s.date}`).join('\n')}

Setiap hari dimulai pukul 06:30 WIB. Pastikan datang tepat waktu ya! ⏰

Untuk detail kegiatan setiap hari, silakan cek guidebook di bagian Download. 📖`
          }

          if (lowerInput.includes('divisi') || lowerInput.includes('struktur') || lowerInput.includes('organisasi')) {
               return `👥 **Struktur Organisasi ORMIK 2025:**

**Core Team:**
• Project Officer (PO)
• Sekretaris  
• Bendahara
• Liaison Officer (LO)

**Divisi Operasional:**
• Event • Media • Kreatif
• Kedisiplinan • Mentor  
• Logistik • Konsumsi
• Medis • IT Support

Setiap divisi memiliki peran penting dalam kesuksesan ORMIK! 🌟

Ingin tahu detail tugas divisi tertentu? Tanya aja! 😊`
          }

          if (lowerInput.includes('lokasi') || lowerInput.includes('kampus') || lowerInput.includes('tempat')) {
               return `🏫 **Lokasi Kegiatan ORMIK:**

**STT Terpadu Nurul Fikri**
📍 Jl. Lenteng Agung Raya No. 20-21
Jagakarsa, Jakarta Selatan 12610

🗺️ **Fasilitas yang tersedia:**
• Auditorium utama
• Ruang kelas ber-AC  
• Laboratorium komputer
• Masjid Al-Hikmah
• Kantin dan area istirahat
• Parkir luas

🚌 Akses mudah dengan TransJakarta dan KRL!

📍 **Google Maps:** STT Terpadu Nurul Fikri`
          }

          if (lowerInput.includes('kontak') || lowerInput.includes('contact') || lowerInput.includes('hubungi')) {
               return `📞 **Kontak Informasi ORMIK 2025:**

**Hotline ORMIK:**
• WhatsApp: ${this.context.ormikData.contact.phone}
• Telegram: ${this.context.ormikData.contact.social.telegram}

**Media Sosial:**
• Instagram: ${this.context.ormikData.contact.social.instagram}
• TikTok: ${this.context.ormikData.contact.social.tiktok}

**Email:**
• ${this.context.ormikData.contact.email}

Jangan ragu untuk bertanya kapan saja! 😊`
          }

          if (lowerInput.includes('tips') || lowerInput.includes('saran') || lowerInput.includes('persiapan')) {
               return `💡 **Tips Sukses Mengikuti ORMIK 2025:**

✅ **Persiapan:**
• Baca guidebook dengan teliti
• Siapkan perlengkapan sesuai dress code  
• Istirahat cukup sebelum hari-H
• Download app dan periksa jadwal

✅ **Selama Kegiatan:**
• Datang tepat waktu (06:30 WIB)
• Aktif berpartisipasi
• Jalin pertemanan dengan sesama peserta
• Ikuti arahan mentor dan panitia
• Jaga kebersihan dan ketertiban

✅ **Mental:**
• Bersikap positif dan terbuka
• Jangan malu bertanya
• Nikmati setiap momen!
• Jadilah diri sendiri yang terbaik

Semangat! ORMIK akan jadi pengalaman tak terlupakan! 💪🔥`
          }

          // Default response
          return `Halo! Terima kasih sudah bertanya tentang ORMIK 2025! 😊

Saya adalah Asisten AI yang siap membantu dengan informasi tentang:
• 📅 Jadwal kegiatan ORMIK
• 👥 Struktur organisasi dan divisi
• 📍 Lokasi dan fasilitas kampus
• 📞 Kontak informasi
• 💡 Tips dan panduan
• 👔 Dress code dan persiapan

Untuk informasi lengkap, jangan lupa download guidebook di bagian Download ya! 📖

Ada yang spesifik ingin ditanyakan? 🤗`
     }

     // Method untuk integrasi dengan PDF guidebook (untuk implementasi masa depan)
     async loadGuideBookContent(pdfUrl: string): Promise<void> {
          // TODO: Implement PDF parsing and vector embedding
          // This will be used to enhance AI responses with guidebook content
          console.log('Loading guidebook content from:', pdfUrl)
     }
}

// Export singleton instance
export const ormikAI = new OrmikAIService()
export default OrmikAIService
