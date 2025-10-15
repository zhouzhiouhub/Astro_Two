import { sendMail } from '@/lib/mailer';
import { getAuthExpiryConfig } from '@/lib/config';

const DAY_MS = 24 * 60 * 60 * 1000;
let initialized = false;
const fired: Set<number> = new Set();

function parseAlertDays(input: string | undefined): number[] {
  if (!input) return [14, 7, 3, 1, 0, -1];
  return input
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => Number(s))
    .filter((n) => Number.isFinite(n));
}

function utcMidnightDelay(): number {
  const now = new Date();
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 5, 0));
  return next.getTime() - now.getTime();
}

function daysRemaining(expiry: Date): number {
  const now = new Date();
  const diff = expiry.getTime() - now.getTime();
  return Math.ceil(diff / DAY_MS);
}

async function checkAndNotify() {
  try {
    const cfg = getAuthExpiryConfig();
    if (!cfg) return;
    const { issuedAt, validDays, alertDays } = cfg;
    const expiry = new Date(issuedAt.getTime() + validDays * DAY_MS);
    const remain = daysRemaining(expiry);

    if (alertDays.includes(remain) && !fired.has(remain)) {
      const subject = `163 SMTP 授权码剩余 ${remain} 天到期`;
      const text = [
        `授权码签发时间(UTC): ${issuedAt.toISOString()}`,
        `有效期(天): ${validDays}`,
        `到期时间(UTC): ${expiry.toISOString()}`,
        `当前剩余(天): ${remain}`,
        '',
        '请及时登录 163 邮箱更换/续期授权码，并更新部署环境变量。',
      ].join('\n');
      await sendMail({ subject, text });
      fired.add(remain);
    }
  } catch {
    // swallow errors to avoid breaking requests
  }
}

export function initAuthExpiryNotifier() {
  if (initialized) return;
  initialized = true;
  // quick check shortly after boot, then daily around UTC midnight
  setTimeout(checkAndNotify, 5_000);
  setTimeout(() => {
    checkAndNotify();
    setInterval(checkAndNotify, DAY_MS);
  }, utcMidnightDelay());
}
