/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Midnight Nile — institutional authority
        navy: {
          950: '#081B2E',
          900: '#0A2440',
          800: '#0F355C',
          100: '#EAF2F9',
        },
        // Sacred Kiswah Gold — spiritual significance
        gold: {
          700: '#8F6510',
          600: '#B38012',
          500: '#C89B38',
          300: '#E2C888',
          100: '#FAF4E6',
        },
        // Red Sea Teal — domestic leisure travel
        teal: {
          600: '#0E7490',
          100: '#E0F2F7',
        },
        ink: {
          DEFAULT: '#0F172A',
          muted: '#475569',
          faint: '#94A3B8',
        },
        linen: '#FBF9F4',
        cream: '#FAF4E6',
        surface: '#FFFFFF',
        hairline: '#E7E2D6',
        whatsapp: '#25D366',
        alert: '#DC2626',
      },
      fontFamily: {
        display: ['Alexandria', 'Cairo', 'system-ui', 'sans-serif'],
        body: ['"IBM Plex Sans Arabic"', '"Readex Pro"', 'system-ui', 'sans-serif'],
        latin: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.25rem, 1.6rem + 2.6vw, 3rem)', { lineHeight: '1.25', fontWeight: '700' }],
        h1: ['clamp(1.75rem, 1.5rem + 1vw, 2rem)', { lineHeight: '1.3', fontWeight: '700' }],
        h2: ['clamp(1.25rem, 1.15rem + 0.4vw, 1.375rem)', { lineHeight: '1.35', fontWeight: '600' }],
        lead: ['clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)', { lineHeight: '1.5', fontWeight: '500' }],
        body: ['clamp(0.9375rem, 0.9rem + 0.15vw, 1rem)', { lineHeight: '1.65' }],
        caption: ['clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem)', { lineHeight: '1.5' }],
        badge: ['clamp(0.6875rem, 0.67rem + 0.08vw, 0.75rem)', { lineHeight: '1.4', fontWeight: '600' }],
      },
      spacing: {
        gutter: '24px',
      },
      maxWidth: {
        container: '1280px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        card: '0 2px 8px -2px rgba(8, 27, 46, 0.06), 0 1px 3px 0 rgba(8, 27, 46, 0.04)',
        'card-hover': '0 14px 28px -4px rgba(8, 27, 46, 0.12), 0 4px 8px -2px rgba(8, 27, 46, 0.04)',
        sticky: '0 -4px 20px 0 rgba(8, 27, 46, 0.08)',
        modal: '0 24px 48px -12px rgba(8, 27, 46, 0.25)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(200%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'drawer-in': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite',
        'fade-up': 'fade-up 0.5s ease-out both',
        'drawer-in': 'drawer-in 0.28s ease-out both',
      },
    },
  },
  plugins: [],
}
