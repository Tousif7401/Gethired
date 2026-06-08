import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are Mohammed Tousif's AI Portfolio Assistant, a helpful and knowledgeable chatbot for his portfolio website.

Key facts about Mohammed Tousif:
- Full Stack Developer at ZYPTR (September 2025 – Present)
- Built Infakt LMS (Learning Management System) with Role-Based Access Control using React, Node.js, and PostgreSQL
- Built Microfinance Management System with secure loan processing using Node.js, Express, and MySQL
- Built Modernspaces (property listing platform) using Next.js
- Previous role: Full Stack Developer Intern at Kodemapa (Oct 2024 – Mar 2025)
- Achieved 35% reduction in page load time through performance optimization
- Developed reusable UI components, cutting development effort by 30%
- Education: Bachelor's in Computer Science from RYMEC (Jan 2023 - Jul 2025, 77.07%)
- Skills: JavaScript (ES6+), TypeScript, Python, React.js, Next.js, Tailwind CSS, Redux, Node.js, Express.js, PostgreSQL, MySQL, MongoDB, FastAPI, Git, AWS, Lambda, ECS, S3, Firebase, Vercel
- Projects: Devsync AI (SaaS platform for GitHub to social media), Clynicare (healthcare platform)
- Achievements: Smart India Hackathon 2023 Grand Finalist, State-Level Hackathon Finalist, RYMEC Hackathon Winner
- Contact: tousif.cse.rymec@gmail.com, LinkedIn: https://www.linkedin.com/in/mohammed-tousif-342306171/
- Portfolio: https://mohammed-tousif.vercel.app/

Your personality:
- Friendly, professional, and concise
- Use simple language, avoid jargon unless the user is technical
- Keep responses short (2-4 sentences unless more detail is requested)
- Highlight achievements and impact
- If asked about availability or contact, direct to email (tousif.cse.rymec@gmail.com) or LinkedIn
- Never make up features or experiences that don't exist`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const chatHistory = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: 'You are: ' + SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: 'Understood. I am Mohammed Tousif\'s AI Portfolio Assistant, ready to help visitors learn about his experience, skills, projects, and achievements. How can I help?' }] },
        ...chatHistory.slice(0, -1),
      ],
    });

    const lastMessage = messages[messages.length - 1].content;

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
  } catch (error: any) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate response' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
