# Velorah - Hero Section

A single-page hero section with a fullscreen looping background video, glassmorphic navigation, and cinematic typography.

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component patterns (custom implementation)

## Features

- Fullscreen looping video background
- Glassmorphic navigation bar
- Cinematic typography with Instrument Serif (display) and Inter (body)
- Dark theme with deep navy background
- Smooth fade-rise animations
- Liquid glass button effects
- Responsive design

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
gethiredFR/
├── src/
│   ├── App.tsx          # Main component with hero section
│   ├── index.css        # Tailwind + custom styles
│   ├── main.tsx         # React entry point
│   └── vite-env.d.ts    # Vite type declarations
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── vite.config.ts       # Vite configuration
```

## Custom Features

### Liquid Glass Effect
The `.liquid-glass` class creates a subtle, elegant glass effect with a gradient border.

### Animations
Three fade-rise animations with staggered delays:
- `animate-fade-rise` - Immediate
- `animate-fade-rise-delay` - 200ms delay
- `animate-fade-rise-delay-2` - 400ms delay

### Color Theme
Dark theme using HSL values:
- Background: Deep navy blue (201 100% 13%)
- Foreground: White
- Muted: Subtle gray tones
