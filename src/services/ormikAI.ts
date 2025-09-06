// ZEERO AI Service for ORMIK ChatBot
// This service handles intelligent keyword-based responses for ORMIK 2025
// Integrated with complete guidebook data

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
          dresscode: {
               putra: string[]
               putri: string[]
          }
          tatatertib: string[]
          punishment: {
               ringan: string[]
               sedang: string[]
               berat: string[]
               khusus: string[]
          }
          atribut: {
               day1: string[]
               lastday: string[]
               perkompi: string[]
          }
          tugas: {
               praormik: {
                    individu: string[]
                    kompi: string[]
               }
               day1: {
                    individu: string[]
                    kompi: string[]
               }
               lastday: {
                    individu: string[]
                    kompi: string[]
               }
          }
          contact: {
               instagram: string
               instagram_handle: string
          }
     }
}

class ZeeroAIService {
     private context: ChatContext
     private ollamaHealthy: boolean = false
     private lastHealthCheck: number = 0
     private readonly HEALTH_CHECK_INTERVAL = 30000 // 30 seconds

     constructor() {
          this.context = this.initializeContext()
          this.checkOllamaHealth()
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
                         "Datang tepat waktu pada pukul 06.30 WIB",
                         "Mengikuti seluruh rangkaian ORMIK dan wajib izin jika tidak bisa mengikuti",
                         "Menghormati dan menghargai panitia maupun sesama peserta ORMIK",
                         "Menjaga sikap, perilaku, dan tidak boleh gaduh selama acara berlangsung",
                         "Menerapkan 6S (Senyum, Salam, Sapa, Sopan, Santun, dan Semangat)",
                         "Menggunakan pakaian yang telah ditentukan panitia",
                         "Tidak meninggalkan ruang kelas tanpa seizin Tim Kedisiplinan dan Mentor",
                         "Memakai atribut yang sesuai dengan yang sudah ditentukan"
                    ],
                    dresscode: {
                         putra: [
                              "Kemeja putih bersih, rapi, dan sopan (baju dimasukkan)",
                              "Celana panjang hitam/biru dongker (tidak ketat)",
                              "Menggunakan ikat pinggang hitam",
                              "Kaos kaki putih di atas mata kaki",
                              "Sepatu dominan hitam",
                              "Rambut tidak dicat, rapi, disisir, tidak menutupi mata",
                              "Kuku bersih dan tidak panjang",
                              "Dilarang aksesori berlebihan (gelang, kalung, topi)"
                         ],
                         putri: [
                              "Kemeja putih bersih, rapi, sopan (baju dikeluarkan/tidak dimasukkan)",
                              "Pakaian longgar, tidak transparan, tidak memperlihatkan lekuk tubuh",
                              "Rok bahan (bukan span) panjang hingga mata kaki",
                              "Kaos kaki putih di atas mata kaki",
                              "Sepatu dominan hitam",
                              "Rambut tidak dicat - Muslim wajib jilbab segiempat + ciput",
                              "Kuku bersih, tidak panjang, tidak diwarnai",
                              "Dilarang make up berlebihan dan softlens berwarna"
                         ]
                    },
                    tatatertib: [
                         "Wajib menjaga nama baik Almamater STT Terpadu Nurul Fikri",
                         "Datang tepat waktu pada pukul 06.30 WIB",
                         "Mengikuti seluruh rangkaian ORMIK dan wajib izin jika tidak bisa",
                         "Menghormati dan menghargai panitia maupun sesama peserta",
                         "Menjaga sikap, perilaku, dan tidak gaduh selama acara",
                         "Menerapkan 6S kepada siapapun",
                         "Mengisi semua presensi yang disediakan panitia",
                         "Dilarang membawa senjata tajam dan senjata api",
                         "Dilarang rokok, vape, obat terlarang, minuman keras, pornografi",
                         "Dilarang kontak fisik dengan lawan jenis",
                         "Dilarang smartphone kecuali seizin Mentor/Tim Kedisiplinan",
                         "Dilarang perhiasan berlebihan, tindik, tato, rambut berwarna"
                    ],
                    punishment: {
                         ringan: ["Memungut 10 sampah di area kampus", "Untuk 1x pelanggaran aturan"],
                         sedang: ["Menyanyikan Lagu Mars STT Nurul Fikri", "Membuat surat maaf ditandatangani 15 Panitia", "Untuk 2x pelanggaran aturan"],
                         berat: ["Evaluasi langsung dari Project Officer/Steering Committee", "Untuk pelanggaran berulang setelah punishment sedang"],
                         khusus: ["Dilaporkan langsung ke pihak kampus", "Untuk pelanggaran berat: narkoba, alkohol, pelecehan seksual"]
                    },
                    atribut: {
                         day1: ["ATK", "Topi rimba navy", "Name tag", "Buku passport", "Kantung kresek sepatu", "Sandal", "Alat salat", "BPJS", "Tumbler", "Makanan (snack level up, zero panggang, air pegunungan, putih salju, bola kuning, kotak garing ayam)"],
                         lastday: ["ATK", "Topi rimba navy", "Name tag", "Buku passport", "Kantung kresek sepatu", "Sandal", "Alat salat", "BPJS", "Tumbler", "Makanan (kernel kuning box, pixel puffs, coolant drive, power juice)"],
                         perkompi: ["Trash bag"]
                    },
                    tugas: {
                         praormik: {
                              individu: ["Membuat name tag berbentuk siluet ZEERO", "Upload twibbon ke Instagram + tag @ormikxplore", "Membuat video perkenalan + upload reels IG", "Menghafalkan Hymne dan Mars STT NF"],
                              kompi: ["Membuat akun Instagram kompi", "Membuat logo kompi", "Membuat yel-yel", "Mempersiapkan bakat untuk last day", "Membuat passport kompi"]
                         },
                         day1: {
                              individu: ["Membuat resume materi day 1"],
                              kompi: ["Upload video yel-yel di IG kompi", "Dokumentasi setelah ORMIK day 1", "Membuat konten video edukasi tema Teknologi"]
                         },
                         lastday: {
                              individu: ["Memberikan mini gift ke Mentor", "Membuat 2 surat bentuk pesawat untuk Mentor dan panitia"],
                              kompi: ["Unjuk bakat kolaborasi 2 kompi yang dibimbing 1 Mentor"]
                         }
                    },
                    contact: {
                         instagram: "https://www.instagram.com/ormikxplore/",
                         instagram_handle: "@ormikxplore"
                    }
               }
          }
     }

     // Main method to generate responses - Enhanced Hybrid System
     async generateResponse(userInput: string): Promise<string> {
          return this.getHybridResponse(userInput)
     }

     // Hybrid response system: Ollama + Keyword fallback
     private async getHybridResponse(userInput: string): Promise<string> {
          const lowerInput = userInput.toLowerCase()
          
          // Step 1: Check for simple keyword matches (instant response)
          const keywordConfidence = this.getKeywordConfidence(userInput)
          if (keywordConfidence > 0.85) {
               return this.getKeywordBasedResponse(userInput)
          }
          
          // Step 2: Try Ollama for complex/conversational queries
          if (this.shouldUseOllama(userInput)) {
               try {
                    const ollamaResponse = await this.getOllamaResponse(userInput)
                    if (ollamaResponse && ollamaResponse.length > 10) {
                         return ollamaResponse
                    }
               } catch (error) {
                    console.log('Ollama fallback to keyword:', error)
               }
          }
          
          // Step 3: Enhanced keyword fallback
          return this.getKeywordBasedResponse(userInput)
     }

     // Check if query should use Ollama (complex/conversational)
     private shouldUseOllama(userInput: string): boolean {
          const complexPatterns = [
               /bagaimana.*jika/i,
               /mengapa.*tidak/i,
               /apa.*bedanya/i,
               /bisakah.*menjelaskan/i,
               /tolong.*jelaskan/i,
               /saya.*ingin.*tahu/i,
               /gimana.*cara/i,
               /kenapa.*harus/i
          ]
          
          const conversationalPatterns = [
               /saya.*bingung/i,
               /tidak.*mengerti/i,
               /kurang.*jelas/i,
               /lebih.*detail/i
          ]
          
          return complexPatterns.some(p => p.test(userInput)) ||
                 conversationalPatterns.some(p => p.test(userInput))
     }

     // Get confidence score for keyword matching
     private getKeywordConfidence(userInput: string): number {
          const lowerInput = userInput.toLowerCase()
          
          // High confidence keywords (exact matches)
          const highConfidenceKeywords = [
               'jadwal', 'schedule', 'tanggal', 'waktu',
               'kontak', 'contact', 'telepon', 'instagram',
               'lokasi', 'alamat', 'kampus', 'tempat',
               'dress code', 'pakaian', 'baju', 'seragam'
          ]
          
          // Medium confidence keywords
          const mediumConfidenceKeywords = [
               'divisi', 'struktur', 'panitia', 'tim',
               'atribut', 'perlengkapan', 'barang',
               'tugas', 'assignment', 'kerjaan',
               'tata tertib', 'aturan', 'peraturan',
               'punishment', 'hukuman', 'sanksi'
          ]
          
          // Calculate confidence based on keyword matches
          let confidence = 0
          
          highConfidenceKeywords.forEach(keyword => {
               if (lowerInput.includes(keyword)) confidence += 0.4
          })
          
          mediumConfidenceKeywords.forEach(keyword => {
               if (lowerInput.includes(keyword)) confidence += 0.3
          })
          
          return Math.min(confidence, 1.0)
     }

     // Call Ollama API with error handling
     private async getOllamaResponse(userInput: string): Promise<string> {
          await this.ensureOllamaHealth()
          
          if (!this.ollamaHealthy) {
               throw new Error('Ollama service not available')
          }
          
          const response = await fetch('/api/ai', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify({ message: userInput }),
          })
          
          const data = await response.json()
          
          if (data.fallback) {
               throw new Error('Ollama returned fallback')
          }
          
          return data.response
     }

     // Health check for Ollama service
     private async checkOllamaHealth(): Promise<void> {
          try {
               const response = await fetch('/api/ai', {
                    method: 'GET',
                    signal: AbortSignal.timeout(5000)
               })
               
               this.ollamaHealthy = response.ok
               this.lastHealthCheck = Date.now()
          } catch (error) {
               this.ollamaHealthy = false
               this.lastHealthCheck = Date.now()
          }
     }

     // Ensure Ollama health with periodic checks
     private async ensureOllamaHealth(): Promise<void> {
          const now = Date.now()
          if (now - this.lastHealthCheck > this.HEALTH_CHECK_INTERVAL) {
               await this.checkOllamaHealth()
          }
     }

     // Get current AI mode status
     public getAIStatus(): { mode: string, ollamaHealthy: boolean, lastCheck: number } {
          return {
               mode: 'hybrid',
               ollamaHealthy: this.ollamaHealthy,
               lastCheck: this.lastHealthCheck
          }
     }

     // Enhanced keyword-based response system (public for manual access)
     public getKeywordBasedResponse(userInput: string): string {
          const lowerInput = userInput.toLowerCase()

          // ZEERO introduction and greetings
          if (lowerInput.includes('halo') || lowerInput.includes('hai') || lowerInput.includes('hello') ||
               lowerInput.includes('zeero') || lowerInput.includes('siapa')) {
               return `Halo! Saya **ZEERO** 🤖, Asisten AI untuk ORMIK Explore 2025!

Saya siap membantu Anda dengan informasi tentang:
• 📅 **Jadwal** kegiatan ORMIK
• 👥 **Struktur organisasi** dan divisi
• 📍 **Lokasi** dan fasilitas kampus
• 📞 **Kontak** informasi
• 💡 **Tips** dan panduan
• 👔 **Dress code** dan persiapan

Ada yang ingin ditanyakan? Ketik kata kunci seperti "jadwal", "divisi", "lokasi", atau "tips"! 😊`
          }

          // Schedule information
          if (lowerInput.includes('jadwal') || lowerInput.includes('schedule') || lowerInput.includes('tanggal') || lowerInput.includes('waktu')) {
               return `📅 **Jadwal ORMIK Explore 2025:**

${this.context.ormikData.schedule.map(s => `• **${s.title}** - ${s.date}`).join('\n')}

⏰ **Waktu:**
• Setiap hari dimulai pukul **06:30 WIB**
• Registrasi ulang 30 menit sebelumnya
• Pastikan datang tepat waktu ya!

📖 **Info Detail:**
Untuk rundown lengkap setiap hari, silakan download guidebook di bagian Download.`
          }

          // Division and organizational structure
          if (lowerInput.includes('divisi') || lowerInput.includes('struktur') || lowerInput.includes('organisasi') ||
               lowerInput.includes('panitia') || lowerInput.includes('tim')) {
               return `👥 **Struktur Organisasi ORMIK 2025:**

**🏆 Core Team:**
• **Project Officer (PO)** - Penanggung jawab penuh
• **Sekretaris** - Administrasi & dokumentasi  
• **Bendahara** - Keuangan & anggaran
• **Liaison Officer (LO)** - Komunikasi

**⚡ Divisi Operasional:**
• **Event** - Koordinasi acara
• **Media** - Dokumentasi visual
• **Kreatif** - Suasana interaktif
• **Kedisiplinan** - Ketertiban
• **Mentor** - Pembimbingan peserta
• **Logistik** - Perlengkapan
• **Konsumsi** - Makanan & minuman
• **Medis** - Kesehatan & keselamatan
• **IT Support** - Teknologi & streaming

Setiap divisi punya peran penting! Ingin tahu detail divisi tertentu? Tanya aja! 🌟`
          }

          // Campus location and facilities
          if (lowerInput.includes('lokasi') || lowerInput.includes('kampus') || lowerInput.includes('tempat') ||
               lowerInput.includes('alamat') || lowerInput.includes('fasilitas')) {
               return `🏫 **Lokasi Kegiatan ORMIK:**

**STT Terpadu Nurul Fikri**
📍 Jl. Lenteng Agung Raya No. 20-21
Jagakarsa, Jakarta Selatan 12610

🗺️ **Fasilitas yang tersedia:**
• 🎭 Auditorium utama
• 🏢 Ruang kelas ber-AC  
• 💻 Laboratorium komputer
• 🕌 Masjid Al-Hikmah
• 🍽️ Kantin dan area istirahat
• 🚗 Parkir luas dan aman

🚌 **Akses Transportasi:**
• **TransJakarta:** Halte Lenteng Agung
• **KRL:** Stasiun Lenteng Agung
• **Angkot:** Jurusan Pasar Minggu - Bogor

📍 **Google Maps:** "STT Terpadu Nurul Fikri"`
          }

          // Contact information - Updated to Instagram DM only
          if (lowerInput.includes('kontak') || lowerInput.includes('contact') || lowerInput.includes('hubungi') ||
               lowerInput.includes('telepon') || lowerInput.includes('whatsapp') || lowerInput.includes('email')) {
               return `📞 **Kontak Informasi ORMIK 2025:**

**📱 Hubungi Kami Via Instagram DM:**
• **Instagram:** ${this.context.ormikData.contact.instagram_handle}
• **Direct Link:** ${this.context.ormikData.contact.instagram}

**📋 Untuk Tugas & Upload:**
• Tag ${this.context.ormikData.contact.instagram_handle} di semua upload Instagram
• Kirim link tugas via DM Instagram
• Gunakan GForm penugasan yang diberikan Mentor

**💬 Panduan Menghubungi:**
1. Buka Instagram ${this.context.ormikData.contact.instagram_handle}
2. Tap "Message" atau ikon DM
3. Kirim pertanyaan dengan jelas
4. Tunggu respons dari tim

**⏰ Response Time:**
• Hari kerja: Maks 2-4 jam
• Weekend: Maks 6-8 jam

Semua komunikasi resmi melalui Instagram DM ya! 📱✨`
          }

          // Tips and guidelines
          if (lowerInput.includes('tips') || lowerInput.includes('saran') || lowerInput.includes('persiapan') ||
               lowerInput.includes('panduan') || lowerInput.includes('aturan')) {
               return `💡 **Tips Sukses Mengikuti ORMIK 2025:**

✅ **Persiapan Sebelum:**
• 📖 Baca guidebook dengan teliti
• 👔 Siapkan pakaian sesuai dress code  
• 💤 Istirahat cukup sebelum hari-H
• 📱 Download aplikasi dan cek jadwal
• 🎒 Siapkan tas dengan perlengkapan

✅ **Selama Kegiatan:**
• ⏰ Datang tepat waktu (06:30 WIB)
• 🙋‍♀️ Berpartisipasi aktif di setiap sesi
• 🤝 Jalin pertemanan dengan peserta lain
• 👂 Dengarkan arahan mentor dan panitia
• 🧹 Jaga kebersihan dan ketertiban

✅ **Mindset Positif:**
• 😊 Bersikap terbuka dan ramah
• ❓ Jangan malu bertanya
• 🎉 Nikmati setiap momen berharga
• 🌟 Jadilah versi terbaik dari diri Anda

**Ingat:** ORMIK adalah awal petualangan kuliah yang menakjubkan! 💪🔥`
          }

          // Dress code information - Enhanced with official guidebook data
          if (lowerInput.includes('dress') || lowerInput.includes('pakaian') || lowerInput.includes('baju') || 
              lowerInput.includes('seragam') || lowerInput.includes('kostum')) {
               return `👔 **Dress Code ORMIK 2025 (Official Guidebook):**

**👨‍🎓 PUTRA:**
• Kemeja putih bersih, rapi, sopan (baju **dimasukkan**)
• Celana panjang hitam/biru dongker (tidak ketat)
• Ikat pinggang hitam + kaos kaki putih
• Sepatu dominan hitam
• Rambut tidak dicat, rapi, tidak menutupi mata
• Kuku bersih, tidak panjang
• **Dilarang:** gelang, kalung, topi (kecuali jam tangan)

**👩‍🎓 PUTRI:**
• Kemeja putih bersih, rapi, sopan (baju **dikeluarkan**)
• Pakaian longgar, tidak transparan
• Rok bahan (bukan span) hingga mata kaki
• Kaos kaki putih + sepatu dominan hitam
• **Muslim:** Wajib jilbab segiempat + ciput
• **Non-Muslim:** Rambut panjang diikat rapi
• Kuku bersih, tidak diwarnai
• **Dilarang:** make up berlebihan, softlens berwarna

**⚠️ Barang Terlarang:**
Narkoba, alkohol, rokok/vape, senjata tajam, pornografi

Detail lengkap: Download guidebook! 📖`
          }

          // Tata tertib information
          if (lowerInput.includes('tata tertib') || lowerInput.includes('aturan') || lowerInput.includes('peraturan') || 
              lowerInput.includes('tertib')) {
               return `📋 **Tata Tertib ORMIK 2025:**

**✅ WAJIB:**
• Menjaga nama baik STT Terpadu Nurul Fikri
• Datang tepat waktu pukul **06:30 WIB**
• Mengikuti seluruh rangkaian (wajib izin jika tidak bisa)
• Menghormati panitia dan sesama peserta
• Menerapkan **6S** (Senyum, Salam, Sapa, Sopan, Santun, Semangat)
• Mengisi semua presensi yang disediakan
• Memakai atribut sesuai ketentuan

**❌ DILARANG:**
• Senjata tajam dan senjata api
• Rokok, vape, narkoba, alkohol, pornografi
• Kontak fisik dengan lawan jenis
• Smartphone (kecuali seizin Mentor/Kedisiplinan)
• Perhiasan berlebihan, tindik, tato
• Rambut berwarna, gaduh saat acara

**📱 Perizinan:**
• Izin sementara: langsung ke Tim Kedisiplinan
• Izin tidak hadir: WhatsApp Mentor H-1 (maks 23:59 WIB)

Patuhi aturan untuk pengalaman ORMIK yang maksimal! 🌟`
          }

          // Punishment system
          if (lowerInput.includes('punishment') || lowerInput.includes('hukuman') || lowerInput.includes('sanksi') || 
              lowerInput.includes('pelanggaran')) {
               return `⚖️ **Sistem Punishment ORMIK 2025:**

**🟡 RINGAN (1x Pelanggaran):**
• Memungut 10 sampah di area kampus

**🟠 SEDANG (2x Pelanggaran):**
• Menyanyikan Lagu Mars STT Nurul Fikri
• Membuat surat maaf ditandatangani 15 Panitia ORMIK

**🔴 BERAT (Pelanggaran Berulang):**
• Evaluasi langsung dari Project Officer/Steering Committee

**⚫ KHUSUS (Pelanggaran Berat):**
• Dilaporkan langsung ke pihak kampus
• Contoh: narkoba, alkohol, pelecehan seksual

**💡 Tips:** Patuhi aturan sejak awal untuk menghindari punishment dan fokus menikmati ORMIK! 😊

Ada pertanyaan tentang aturan tertentu? Tanya aja! 🤗`
          }

          // Atribut and equipment
          if (lowerInput.includes('atribut') || lowerInput.includes('perlengkapan') || lowerInput.includes('barang') || 
              lowerInput.includes('bawa') || lowerInput.includes('perlu')) {
               return `🎒 **Atribut & Perlengkapan ORMIK 2025:**

**📅 DAY 1:**
• ATK lengkap + Topi rimba navy
• Name tag + Buku passport
• Kantung kresek untuk sepatu + Sandal
• Alat salat + Kartu BPJS + Tumbler
• **Makanan:** Snack level up, zero panggang, air pegunungan, putih salju, bola kuning, kotak garing ayam

**📅 LAST DAY:**
• ATK + Topi rimba navy + Name tag
• Buku passport + Kantung kresek + Sandal
• Alat salat + BPJS + Tumbler
• **Makanan:** Kernel kuning box, pixel puffs, coolant drive, power juice

**👥 PER KOMPI:**
• Trash bag

**📝 Name Tag:**
• Berbentuk siluet **ZEERO**
• Kertas A4 dilaminating
• Berisi: nama kompi, logo kompi, nama, foto 3x4, prodi, asal daerah, motto hidup
• Tali sesuai prodi: SI=Oren, TI=Biru tua, BD=Merah

Siapkan semua dengan teliti ya! 📖✨`
          }

          // Tugas (assignments)
          if (lowerInput.includes('tugas') || lowerInput.includes('assignment') || lowerInput.includes('pekerjaan') || 
              lowerInput.includes('kerjaan')) {
               return `📝 **Tugas ORMIK 2025:**

**🌅 PRA ORMIK - Individu:**
• Buat name tag siluet ZEERO (A4 dilaminating)
• Upload twibbon IG + tag @ormikxplore
• Video perkenalan di reels IG
• Hafal Hymne & Mars STT NF

**🌅 PRA ORMIK - Kompi:**
• Buat akun IG kompi + logo kompi
• Buat yel-yel + persiapan bakat last day
• Buat passport kompi

**📚 DAY 1:**
• **Individu:** Resume materi day 1
• **Kompi:** Upload video yel-yel, dokumentasi, konten edukasi teknologi

**🎉 LAST DAY:**
• **Individu:** Mini gift untuk Mentor, 2 surat bentuk pesawat
• **Kompi:** Unjuk bakat kolaborasi 2 kompi (1 Mentor)

**💡 Tips:** Kerjakan tugas dengan kreatif dan penuh semangat! Tim terbaik menunggu kalian! 🌟

Butuh detail tugas tertentu? Tanya aja! 😊`
          }

          // Default response with comprehensive information
          return `Halo! Saya **ZEERO** 🤖, Asisten AI ORMIK Explore 2025!

Terima kasih sudah bertanya! Saya siap membantu dengan informasi lengkap dari guidebook resmi:

**📚 Yang Bisa Saya Bantu:**
• 📅 **"jadwal"** - Timeline kegiatan ORMIK
• 👥 **"divisi"** - Struktur organisasi panitia
• 📍 **"lokasi"** - Alamat dan fasilitas kampus  
• 📞 **"kontak"** - Info Instagram DM resmi
• 💡 **"tips"** - Panduan sukses mengikuti ORMIK
• 👔 **"dress code"** - Aturan berpakaian putra/putri
• 📋 **"tata tertib"** - Peraturan dan ketentuan
• ⚖️ **"punishment"** - Sistem sanksi pelanggaran
• 🎒 **"atribut"** - Perlengkapan yang harus dibawa
• 📝 **"tugas"** - Assignment individu dan kompi

**🎯 Contoh Pertanyaan:**
_"Apa dress code untuk putri?"_
_"Bagaimana sistem punishment?"_
_"Tugas apa saja di PRA ORMIK?"_
_"Atribut apa yang harus dibawa?"_

**🌟 Semua informasi berasal dari guidebook resmi ORMIK 2025!** 

Ada yang spesifik ingin ditanyakan? Ketik kata kunci atau tanya langsung! 🤗`
     }

     // Get available keywords for help
     getAvailableKeywords(): string[] {
          return [
               'jadwal', 'schedule', 'tanggal', 'waktu',
               'divisi', 'struktur', 'organisasi', 'panitia',
               'lokasi', 'kampus', 'tempat', 'alamat',
               'kontak', 'telepon', 'whatsapp', 'email',
               'tips', 'saran', 'persiapan', 'panduan',
               'dress code', 'pakaian', 'seragam',
               'tata tertib', 'aturan', 'peraturan',
               'punishment', 'hukuman', 'sanksi',
               'atribut', 'perlengkapan', 'barang',
               'tugas', 'assignment', 'kerjaan'
          ]
     }
}

// Create and export singleton instance
const ormikAI = new ZeeroAIService()

export { ormikAI }
export default ormikAI
