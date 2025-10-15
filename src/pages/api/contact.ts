import type { APIRoute } from 'astro';
import { z, ZodError } from 'zod';
import { sendMail } from '@/lib/mailer';

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(5).max(5000),
});

function isFormContent(request: Request) {
  const ct = request.headers.get('content-type') || '';
  return ct.includes('application/x-www-form-urlencoded') || ct.includes('multipart/form-data');
}

export const POST: APIRoute = async ({ request, url }) => {
  try {
    let payload: any;
    if (isFormContent(request)) {
      const fd = await request.formData();
      payload = Object.fromEntries(fd.entries());
    } else {
      payload = await request.json().catch(() => ({}));
    }
    const data = schema.parse(payload);

    const host = url.origin;
    const subject = `Contact: ${data.name}`;
    const text = [
      `You received a new message from ${data.name} <${data.email}>`,
      '',
      data.message,
      '',
      `From: ${host}`,
    ].join('\n');

    await sendMail({
      subject,
      text,
      replyTo: data.email,
    });

    const lang = url.searchParams.get('lang');
    const wantsRedirect = Boolean(lang);
    if (wantsRedirect) {
      const target = `/${lang}/contact?sent=1`;
      return new Response(null, { status: 303, headers: { Location: target } });
    }
    return new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json' } });
  } catch (err: any) {
    // Log detailed error for debugging in dev/server
    console.error('[api/contact] send error:', err);
    const code = err?.code || '';
    const msg = String(err?.message || 'Unknown error');
    const lower = msg.toLowerCase();
    let e = 'unknown';
    if (err instanceof ZodError) e = 'val';
    if (code === 'EAUTH' || lower.includes('auth') || lower.includes('invalid login')) e = 'auth';
    else if (code === 'ETIMEDOUT' || code === 'ECONNECTION' || code === 'ENOTFOUND' || lower.includes('timeout')) e = 'conn';
    const lang = url.searchParams.get('lang');
    if (lang) {
      const target = `/${lang}/contact?error=1&e=${encodeURIComponent(e)}`;
      return new Response(null, { status: 303, headers: { Location: target } });
    }
    return new Response(JSON.stringify({ ok: false, error: msg, code }), { status: 400, headers: { 'content-type': 'application/json' } });
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
