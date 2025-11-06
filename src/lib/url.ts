const rawBase = (import.meta.env.BASE_URL ?? '/') as string;
const basePrefix = rawBase === '/' ? '' : rawBase.replace(/\/$/, '');

const SCHEME_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

function isExternal(target: string) {
  return SCHEME_REGEX.test(target) || target.startsWith('//') || target.startsWith('#');
}

export function withBase(path = '/'): string {
  if (!path || path === '/') {
    return basePrefix ? `${basePrefix}/` : '/';
  }

  if (isExternal(path)) {
    return path;
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;
  const combined = `${basePrefix}${normalized}`;
  return combined || '/';
}

export function localeHref(locale: string, suffix = ''): string {
  const localeSegment = locale.replace(/^\/+/, '').replace(/\/+$/, '');
  const extra = suffix ? (suffix.startsWith('/') ? suffix : `/${suffix}`) : '';
  return withBase(`/${localeSegment}${extra}`);
}


