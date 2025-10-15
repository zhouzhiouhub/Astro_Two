import type { APIRoute } from 'astro';
import { verifyTransport } from '@/lib/mailer';

export const GET: APIRoute = async () => {
  try {
    await verifyTransport();
    return new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json' } });
  } catch (err: any) {
    const { code = '', message = '' } = err || {};
    const lower = String(message || '').toLowerCase();
    let type: 'auth' | 'conn' | 'unknown' = 'unknown';
    if (code === 'EAUTH' || lower.includes('auth') || lower.includes('invalid login')) type = 'auth';
    if (code === 'ETIMEDOUT' || code === 'ECONNECTION' || code === 'ENOTFOUND' || lower.includes('timeout')) type = 'conn';
    return new Response(JSON.stringify({ ok: false, code, type }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
};

