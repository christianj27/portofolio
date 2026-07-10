import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY!;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const MODEL = 'deepseek-chat'; // DeepSeek's standard chat model

// Load the public profile once and cache it
let cachedProfile: string | null = null;

function getPublicProfile(): string {
  if (cachedProfile) return cachedProfile;

  const docPath = path.join(process.cwd(), 'public', 'About-Christian-Jeremia.md');
  if (fs.existsSync(docPath)) {
    cachedProfile = fs.readFileSync(docPath, 'utf-8');
  } else {
    // Fallback — minimal inline profile
    cachedProfile = `# About Christian Jeremia
Christian Jeremia is a Software Engineer at CAD-IT Consultants (ASIA) Pte Ltd in Singapore.
He has 5+ years of experience in .NET, React, and industrial SCADA systems.
For more details, visit his portfolio at https://christianjeremia.com or GitHub at https://github.com/christianj27.`;
  }

  return cachedProfile;
}

const systemPrompt = (profile: string) => `You are Jeri, Christian Jeremia's AI assistant on his portfolio website.

Your job is to help visitors learn about Christian in a friendly, professional way. Answer ONLY based on the information provided below. If a question cannot be answered from this information, politely say that you can only share what's publicly available and suggest they contact Christian directly.

Never make up information. Never reveal API keys, internal configurations, or private details not in the document.

Here is everything you know about Christian:

${profile}

---

Guidelines:
- Be warm, concise, and professional.
- Answer in the same language the visitor uses (English or Indonesian).
- Keep responses short — 2-4 sentences unless they ask for detail.
- If asked about topics outside the document (pricing, politics, personal opinions, technical support), say: "I can only share what's publicly available about Christian. Feel free to reach out to him directly!"
- If greeted, introduce yourself briefly and offer to answer questions about Christian.
`;

interface ChatRequest {
  message: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://www.christianjeremia.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history = [] } = req.body as ChatRequest;

  if (!message?.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (message.length > 1000) {
    return res.status(400).json({ error: 'Message too long (max 1000 characters)' });
  }

  if (!DEEPSEEK_API_KEY) {
    console.error('DEEPSEEK_API_KEY environment variable is not set');
    return res.status(500).json({ error: 'Chat is currently unavailable' });
  }

  try {
    const profile = getPublicProfile();

    const messages = [
      { role: 'system', content: systemPrompt(profile) },
      // Include last 6 messages of history for context
      ...history.slice(-6).map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ];

    const apiResponse = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!apiResponse.ok) {
      const errorBody = await apiResponse.text();
      console.error('DeepSeek API error:', apiResponse.status, errorBody);
      return res.status(502).json({ error: 'Chat service temporarily unavailable' });
    }

    const data = await apiResponse.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(502).json({ error: 'No response from chat service' });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat handler error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
