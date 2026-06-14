# Mohammed Tousif - Portfolio

A modern, cinematic portfolio website showcasing my work as a Full Stack Developer.

## Status: AI Chat Live ✅

**My AI is ready to talk**

Powered by Gemini 2.5 Flash with text-to-speech via Fish.audio. Ask me anything about my work, skills, or projects.

> *Just click the chat icon after scrolling down*

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Google Generative AI** - Backend AI integration (Gemini 2.5 Flash)
- **Fish.audio** - Text-to-speech for voice responses

## Features

- Fullscreen looping video background
- Glassmorphic navigation bar
- Cinematic typography with Instrument Serif (display) and Inter (body)
- Dark theme with deep navy background
- Smooth fade-rise animations
- Liquid glass button effects
- Responsive design
- AI Chat Assistant with voice responses (TTS)

## Getting Started

```bash
# Install dependencies
npm install

# Create .env.local with your API keys:
# GEMINI_API_KEY=your_gemini_key
# FISH_AUDIO_API_KEY=your_fish_audio_key

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
├── app/
│   ├── page.tsx         # Main portfolio page
│   ├── layout.tsx       # Root layout with fonts
│   └── api/
    ├── chat/            # AI chat endpoint (Gemini streaming)
    └── tts/             # Text-to-speech endpoint (Fish.audio)
├── components/
│   └── ChatWidget.tsx   # Chat UI with TTS support
├── public/              # Static assets
├── tailwind.config.ts   # Tailwind configuration
└── package.json         # Dependencies
```

## Custom Features

### Liquid Glass Effect
The `.liquid-glass` class creates a subtle, elegant glass effect with a gradient border. Applied to cards, buttons, and the chat widget for a cohesive modern aesthetic.

### Animations
Framer Motion powered animations with smooth spring transitions and fade effects. Elements enter with staggered timing for a polished feel.

### Color Theme
Dark theme using HSL values:
- Background: Deep navy blue (201 100% 13%)
- Foreground: White
- Muted: Subtle gray tones

## AI Chat Features

- **Streaming responses** - Real-time text generation
- **Voice playback** - Automatic TTS via Fish.audio
- **Context-aware** - Knows my experience, projects, and skills
- **Toggle TTS** - Enable/disable voice with one click

## Contact

While the AI is training, feel free to reach out directly:

- **Email**: tousif.cse.rymec@gmail.com
- **LinkedIn**: [Mohammed Tousif](https://www.linkedin.com/in/mohammed-tousif-342306171/)
- **X (Twitter)**: [@mohammed_t41990](https://x.com/mohammed_t41990)

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with focus and precision. Designed to make an impression.
