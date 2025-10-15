/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly MAIL_USER?: string;
  readonly MAIL_PASS?: string;
  readonly MAIL_FROM_NAME?: string;
  readonly AUTH_ISSUED_AT?: string; // e.g. 2025-01-01T00:00:00Z
  readonly AUTH_VALID_DAYS?: string; // e.g. "180"
  readonly ALERT_DAYS?: string; // e.g. "14,7,3,1,0,-1"
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
