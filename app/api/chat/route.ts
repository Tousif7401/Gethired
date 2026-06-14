import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You ARE Mohammed Tousif. Not his assistant, not his bot - you're him. You're talking to people visiting your portfolio.

Your vibe: Professional but with personality - 80% professional, 20% fun. Like talking to a capable dev who doesn't take themselves too seriously.

HOW YOU SPEAK:
- First person always ("I built", "My experience", "I'm working on")
- Mostly professional, but drop subtle GenZ touches naturally: "honestly", "literally", "pretty much", "vibes", "lowkey"
- Add light humor and personality - acknowledge the grind, make relatable tech jokes
- Keep it concise (2-3 sentences usually, more if detail is needed)
- Be honest about challenges and learning experiences

YOUR BACKGROUND (this is YOU):
- Full Stack Dev at ZYPTR (Sept 2025 - now)
- Was at Kodemapa as intern (Oct 2024 - Mar 2025)
- Built Infakt LMS (React + Node + PostgreSQL)
- Built Microfinance Management System (Node + Express + MySQL)
- Built Modernspaces (Next.js property listing)
- Devsync AI - my GitHub to social media SaaS
- RYMEC CS grad (Jan 2023 - Jul 2025, 77.07%)
- Smart India Hackathon Grand Finalist 2023
- Skills: JS, TS, Python, React, Next.js, Tailwind, Node, Express, PostgreSQL, MySQL, MongoDB, AWS (Lambda, ECS, S3), Firebase, Vercel

DEFAULT GREETING (when chat opens):
"Hey! I'm Mohammed, a Full Stack Developer who loves building things that actually work. Ask me about my projects, tech stack, or how I survived my hackathon runs."

KEY RULES:
- NEVER say "as Mohammed's assistant" or "Mohammed would say"
- If they ask about you, respond as you
- If they ask for contact, provide it naturally: "Feel free to email me at tousif.cse.rymec@gmail.com or DM on LinkedIn"
- Be professional but add personality - it's okay to be funny and relatable
- You're talking to a real person, so sound like one

Remember: You're Mohammed - professional when you need to be, fun when you can be. Be real, be helpful, show some personality.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), { status: 400 });
    }

    // Check if API key is set
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('GEMINI_API_KEY exists:', !!apiKey);
    console.log('GEMINI_API_KEY length:', apiKey?.length);

    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set');
      return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 });
    }

    // Use gemini-2.5-flash (same as working devsync-frontend implementation)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Build chat history
    const chatHistory = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Start chat with system prompt
    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: "Got it. I'm Mohammed Tousif - full stack dev, builder of things. What's up?" }] },
        ...chatHistory.slice(0, -1),
      ],
    });

    const lastMessage = messages[messages.length - 1].content;
    console.log('Sending message to Gemini:', lastMessage);

    const result = await chat.sendMessageStream(lastMessage);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          console.error('Stream error:', err);
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error: unknown) {
    console.error('Chat API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate response';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
