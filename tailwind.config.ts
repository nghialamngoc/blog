import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    borderWidth: {
      0: '0px',
      1: '1px',
      2: '2px',
      3: '3px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontSize: {
      '12': '0.75rem',
      '14': '0.875rem',
      '20': '1.25rem',
      '24': '1.5rem',
      '28': '1.75rem',
      '32': '2rem',
    },
    spacing: {
      '0': '0px',
      '1': '1px',
      '2': '0.125rem',
      '4': '0.25rem',
      '6': '0.375rem',
      '8': '0.5rem',
      '10': '0.625rem',
      '12': '0.75rem',
      '14': '0.875rem',
      '16': '1rem',
      '20': '1.25rem',
      '24': '1.5rem',
      '28': '1.75rem',
      '32': '2rem',
      '36': '2.25rem',
      '40': '2.5rem',
      '44': '2.75rem',
      '48': '3rem',
      '56': '3.5rem',
      '64': '4rem',
      '72': '4.5rem',
      '80': '5rem',
      '92': '5.75rem',
      '96': '6rem',
      '112': '7rem',
      '128': '8rem',
      '144': '9rem',
      '160': '10rem',
      '176': '11rem',
      '192': '12rem',
      '208': '13rem',
      '224': '14rem',
      '240': '15rem',
      '256': '16rem',
      '288': '18rem',
      '320': '20rem',
      '352': '22rem',
      '384': '24rem',
    },
    extend: {
      colors: {
        grayLight: 'var(--gray-light)',
        gray: 'var(--gray)',
        black: 'var(--black)',
        link: 'var(--link)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
