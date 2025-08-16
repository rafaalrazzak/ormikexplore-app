# ORMIK Explore App

A modern, responsive event web app for ORMIK Explore, built with [Next.js](https://nextjs.org), Tailwind CSS, and TypeScript.

## 🚀 Features

- **Landing Page** with hero, countdown, and schedule widgets
- **Dynamic Maintenance Mode** (with env config, bypass, and progress)
- **Smooth Section Navigation** (scroll-to-section, responsive navbar)
- **404 & Unauthorized Pages** with mascot and animation
- **Mobile-first, Responsive Design**
- **Customizable via `.env.local`**

## 🛠️ Getting Started

### 1. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 2. Run the development server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

Edit `.env.local` to configure maintenance and other settings:

```env
NEXT_PUBLIC_MAINTENANCE_MODE=false
NEXT_PUBLIC_MAINTENANCE_MESSAGE="Website sedang dalam proses maintenance untuk memberikan pengalaman yang lebih baik."
NEXT_PUBLIC_MAINTENANCE_END_TIME="2025-08-20T05:15:00+07:00"
NEXT_PUBLIC_MAINTENANCE_BYPASS_PASSWORD=yourpassword
```

- Set `NEXT_PUBLIC_MAINTENANCE_MODE=true` to activate maintenance mode.
- Set `NEXT_PUBLIC_MAINTENANCE_BYPASS_PASSWORD` for bypass access.

### Maintenance Bypass

- **Via URL:**  
  Access `/maintenance?pass=yourpassword` to bypass maintenance (cookie will be set).

---

## 🧩 Project Structure

- `src/app/` – Next.js app directory (pages, layouts, routing)
- `src/components/sections/` – Main page sections (Hero, About, Core Team, etc.)
- `src/components/widgets/` – Countdown, Schedule, and other widgets
- `src/components/pages/` – Special pages (Maintenance, NotFound, Unauthorized)
- `src/utils/` – Utility functions (maintenance, config, etc.)

---

## ✨ Customization

- **Mascot:**  
  Change mascot asset in `public/assets/mascot.png` (or update path in components).
- **Section Content:**  
  Edit components in `src/components/sections/` for your event.

---

## 📝 License

MIT

---

## 🙏 Credits

Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [Framer Motion](https://www.framer.com/motion/).