import type { VercelRequest, VercelResponse } from '@vercel/node';

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || 'christian@christianjeremia.com';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'christian@christianjeremia.com';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

async function sendWithBrevo(data: ContactFormData) {
  const emailPayload = {
    sender: {
      name: 'Portfolio Contact Form',
      email: SENDER_EMAIL,
    },
    to: [{ email: RECIPIENT_EMAIL }],
    replyTo: {
      email: data.email,
      name: data.name,
    },
    subject: `[Portfolio] ${data.subject}`,
    htmlContent: `
      <h2>New message from your portfolio</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px">
        <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold">Subject</td><td style="padding:8px">${escapeHtml(data.subject)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${escapeHtml(data.message)}</td></tr>
      </table>
    `,
  };

  const response = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY,
      'Accept': 'application/json',
    },
    body: JSON.stringify(emailPayload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Brevo API error ${response.status}: ${errorBody}`);
  }

  return response.json();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function validate(data: ContactFormData): string | null {
  if (!data.name?.trim()) return 'Name is required';
  if (!data.email?.trim()) return 'Email is required';
  if (!data.subject?.trim()) return 'Subject is required';
  if (!data.message?.trim()) return 'Message is required';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) return 'Invalid email address';

  if (data.message.length > 5000) return 'Message is too long (max 5000 characters)';

  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS — allow from your domain
  res.setHeader('Access-Control-Allow-Origin', 'https://www.christianjeremia.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting by IP (simple in-memory, resets on cold start)
  // Vercel Edge Config or Upstash is better for production

  // Validate
  const body = req.body as ContactFormData;
  const validationError = validate(body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  // Validate API key is set
  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Send email
  try {
    await sendWithBrevo(body);
    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
    });
  } catch (error) {
    console.error('Brevo send error:', error);
    return res.status(500).json({
      error: 'Failed to send message. Please try again later.',
    });
  }
}
