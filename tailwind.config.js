/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/react/**/*.{js,ts,jsx,tsx}",
    "./templates/**/*.html.twig",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, hsl(45 85% 68%) 0%, hsl(25 45% 65%) 100%)',
        'gradient-warm': 'linear-gradient(135deg, hsl(45 75% 85%) 0%, hsl(85 30% 75%) 100%)',
        'gradient-soft': 'linear-gradient(135deg, hsl(45 35% 92%) 0%, hsl(45 25% 88%) 100%)',
      },
      boxShadow: {
        'soft': '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
        'hover': '0 6px 20px 0 rgba(0, 0, 0, 0.15)',
        'gentle': '0 2px 8px 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}