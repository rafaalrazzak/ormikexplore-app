import type { Config } from 'tailwindcss'

const config: Config = {
     content: [
          './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
          './src/components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/app/**/*.{js,ts,jsx,tsx,mdx}',
     ],
     theme: {
          extend: {
               colors: {
                    surface: '#FFFFFF',
                    primary: '#000E61',
                    accent: '#E2DC00',
                    onSurface: '#171717',
                    muted: '#6B7280',
                    gold: '#E2DC00',
                    midnightblue: {
                         100: '#000E61',
                         200: 'rgba(0, 14, 97, 0.8)',
                         300: 'rgba(0, 14, 97, 0.6)',
                    },
                    gray: 'rgba(255, 255, 255, 0.1)',
                    silver: 'rgba(255, 255, 255, 0.2)',
               },
               fontFamily: {
                    display: ['var(--font-poppins)', 'sans-serif'],
                    sans: ['var(--font-inter)', 'sans-serif'],
               },
               fontSize: {
                    'h1': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
                    'body': ['16px', { lineHeight: '1.6' }],
                    'button': ['16px', { lineHeight: '1', letterSpacing: '0' }],
               },
               fontWeight: {
                    'h1': '700',
                    'button': '600',
               },
               spacing: {
                    'section-y': '64px',
                    'section-y-md': '80px',
                    'section-y-lg': '96px',
                    'logo-to-h1': '24px',
                    'h1-to-tagline': '16px',
                    'tagline-to-cta': '24px',
               },
               borderRadius: {
                    'button': '12px',
                    'card': '16px',
               },
               boxShadow: {
                    'button': '0 10px 30px rgba(0,0,0,0.08)',
               },
               zIndex: {
                    'background': '-10',
                    'overlay': '-5',
                    'content': '1',
               },
               maxWidth: {
                    'container': '1280px',
               },
               backgroundImage: {
                    'hero-overlay': 'linear-gradient(0deg, rgba(0, 14, 97, 0.8) 0%, rgba(0, 14, 97, 0) 60%)',
               },
               objectPosition: {
                    'center-top': 'center top',
               },
          },
     },
     plugins: [],
}

export default config
