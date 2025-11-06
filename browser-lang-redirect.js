/**
 * Client-Side Browser Language Detection and Auto-Redirect
 *
 * This script runs on the client side to detect browser language
 * and automatically redirect to the correct language version.
 * This is necessary because static prerendered pages cannot access
 * server-side Accept-Language headers.
 *
 * Priority Order:
 * 1. User's manual language selection (localStorage 'lang')
 * 2. Current URL language prefix
 * 3. Browser's preferred language
 * 4. Default language (en)
 */

(function() {
  'use strict';

  const SUPPORTED_LANGS = ['en', 'zh'];
  const DEFAULT_LANG = 'en';

  // Only run on initial page load (not on back/forward navigation)
  if (performance.navigation && performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD) {
    return;
  }

  /**
   * Extract primary language code from browser language string
   * e.g., zh-CN -> zh, en-US -> en, ru-RU -> ru
   */
  function extractPrimaryLang(lang) {
    if (!lang) return null;
    const code = lang.toLowerCase().split('-')[0];
    return SUPPORTED_LANGS.includes(code) ? code : null;
  }

  /**
   * Get browser's preferred language
   */
  function getBrowserLang() {
    const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage];

    for (const lang of browserLangs) {
      const primaryLang = extractPrimaryLang(lang);
      if (primaryLang) return primaryLang;
    }

    return null;
  }

  /**
   * Get current language from URL path
   */
  function getLangFromPath() {
    const pathSegments = window.location.pathname.replace(/^\//, '').split('/');
    return SUPPORTED_LANGS.includes(pathSegments[0]) ? pathSegments[0] : null;
  }

  /**
   * Determine target language based on priority
   *
   * 方案A：优先记住用户手动选择，首次访问时使用浏览器语言
   */
  function getTargetLang() {
    const browserLang = getBrowserLang();
    const storedLang = localStorage.getItem('lang');

    // Priority 1: User's manual selection from localStorage
    // If user has manually switched language before, respect their choice
    if (storedLang && SUPPORTED_LANGS.includes(storedLang)) {
      return storedLang;
    }

    // Priority 2: Browser language (for first-time visitors)
    // Automatically match browser language when no manual selection exists
    if (browserLang) {
      return browserLang;
    }

    // Priority 3: Default fallback
    return DEFAULT_LANG;
  }

  /**
   * Perform redirect if necessary
   */
  function performRedirect() {
    const currentPath = window.location.pathname;
    const currentLang = getLangFromPath();
    const targetLang = getTargetLang();

    console.log('🌐 Language Detection:');
    console.log('  Browser languages:', navigator.languages || [navigator.language]);
    console.log('  Detected browser lang:', getBrowserLang());
    console.log('  Stored lang (localStorage):', localStorage.getItem('lang'));
    console.log('  Current URL lang:', currentLang);
    console.log('  Target lang:', targetLang);

    // If URL already has a language prefix
    if (currentLang) {
      // Don't auto-sync URL language to localStorage
      // Only manual language switching should update localStorage

      // If the URL language doesn't match the target language, redirect
      if (currentLang !== targetLang) {
        const newPath = currentPath.replace(/^\/(en|zh)(\/|$)/, `/${targetLang}$2`);
        console.log('🔄 Redirecting to preferred language');
        console.log('  From:', currentPath, `(${currentLang})`);
        console.log('  To:', newPath, `(${targetLang})`);
        window.location.replace(newPath);
      } else {
        console.log('✓ Language matches, no redirect needed');
      }
      return;
    }

    // If URL doesn't have a language prefix, add one
    const newPath = `/${targetLang}${currentPath}`.replace(/\/+/g, '/');

    if (newPath !== currentPath) {
      console.log('🔄 Adding language prefix');
      console.log('  From:', currentPath);
      console.log('  To:', newPath, `(${targetLang})`);
      window.location.replace(newPath);
    }
  }

  // Execute redirect logic
  try {
    performRedirect();
  } catch (error) {
    console.error('Error in browser language redirect:', error);
  }
})();

