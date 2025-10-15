import { z } from 'zod';

const emailSchema = z.string().email();

function getString(key: string): string | undefined {
  // Prefer real env at runtime; fallback to Vite/ Astro dev env
  const fromProcess = typeof process !== 'undefined' ? (process.env as any)[key] : undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fromImportMeta = (import.meta as any)?.env ? (import.meta as any).env[key] : undefined;
  return (fromProcess ?? fromImportMeta) as string | undefined;
}

export function getMailCreds() {
  const user = getString('MAIL_USER');
  const pass = getString('MAIL_PASS');
  if (!user || !pass) {
    throw new Error('MAIL_USER/MAIL_PASS not configured');
  }
  emailSchema.parse(user);
  return { user, pass } as const;
}

export function getMailFromName() {
  const explicit = getString('MAIL_FROM_NAME');
  if (explicit && explicit.trim()) return explicit.trim();
  const user = getString('MAIL_USER');
  if (user) {
    const local = user.split('@')[0] || user;
    return local; // fallback to local part of mailbox address
  }
  return 'Contact';
}

export function getAuthExpiryConfig() {
  const issuedAtStr = getString('AUTH_ISSUED_AT');
  const validDaysStr = getString('AUTH_VALID_DAYS') ?? '180';
  const alertsStr = getString('ALERT_DAYS');
  const user = getString('MAIL_USER');
  const pass = getString('MAIL_PASS');
  if (!issuedAtStr || !user || !pass) return null;
  const issuedAt = new Date(issuedAtStr);
  if (isNaN(issuedAt.getTime())) return null;
  const validDays = Number(validDaysStr);
  const alertDays = (alertsStr ?? '14,7,3,1,0,-1')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => Number(s))
    .filter((n) => Number.isFinite(n));
  return { issuedAt, validDays, alertDays } as const;
}
