/**
 * Language Detection Core Module
 * 
 * A lightweight, high-performance module for browser language detection.
 * Following SOLID principles: Single Responsibility, Dependency Inversion.
 * 
 * @module lang-detect-core
 * @version 2.0.0
 */

(function(global) {
  'use strict';

  const SUPPORTED_LANGS = ['en', 'zh'];
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'lang';

  const normalizeBasePath = (value) => {
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    if (!trimmed || trimmed === '/' || trimmed === './') {
      return '';
    }
    return `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
  };

  const stripBaseFromPath = (path, base) => {
    if (!base) return path;
    if (!path.startsWith(base)) return path;
    const stripped = path.slice(base.length) || '/';
    return stripped.startsWith('/') ? stripped : `/${stripped}`;
  };

  const joinWithBase = (base, path) => {
    if (!base) return path;
    const sanitizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    if (!sanitizedBase) return normalizedPath;
    return `${sanitizedBase}${normalizedPath}`;
  };

  let cachedBasePath;

  const resolveBasePath = () => {
    if (typeof cachedBasePath === 'string') {
      return cachedBasePath;
    }

    const htmlElement = document.documentElement;
    const datasetBase = htmlElement?.dataset?.basePath;

    const candidates = [
      datasetBase,
      global.__ASTRO_BASE_PATH__,
      (() => {
        const baseTag = document.querySelector('base');
        if (!baseTag) return null;
        const href = baseTag.getAttribute('href');
        if (!href) return null;
        return href.replace(window.location.origin, '');
      })(),
      (() => {
        const path = window.location.pathname;
        const match = path.match(/^(\/[^\/]+)?\/(?:en|zh)(?:\/|$)/);
        return match && match[1] ? match[1] : '';
      })(),
    ];

    for (const candidate of candidates) {
      const normalized = normalizeBasePath(candidate);
      if (normalized !== null) {
        cachedBasePath = normalized;
        return cachedBasePath;
      }
    }

    cachedBasePath = '';
    return cachedBasePath;
  };

  const CONFIG = {
    SUPPORTED_LANGS,
    DEFAULT_LANG,
    STORAGE_KEY,
    get BASE_URL() {
      return resolveBasePath();
    },
  };

  const LangDetector = {
    extractPrimaryLang(lang) {
      if (!lang) return null;
      const code = lang.toLowerCase().split('-')[0];
      return CONFIG.SUPPORTED_LANGS.includes(code) ? code : null;
    },

    getBrowserLang() {
      const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage];

      for (const lang of browserLangs) {
        const primaryLang = this.extractPrimaryLang(lang);
        if (primaryLang) return primaryLang;
      }

      return null;
    },

    getStoredLang() {
      try {
        const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
        return stored && CONFIG.SUPPORTED_LANGS.includes(stored) ? stored : null;
      } catch {
        return null;
      }
    },

    setStoredLang(lang) {
      try {
        if (CONFIG.SUPPORTED_LANGS.includes(lang)) {
          localStorage.setItem(CONFIG.STORAGE_KEY, lang);
        }
      } catch {
        // Silent fail if localStorage is unavailable
      }
    },

    getLangFromPath(pathname) {
      const path = pathname || window.location.pathname;
      const baseUrl = CONFIG.BASE_URL;
      const pathWithoutBase = stripBaseFromPath(path, baseUrl);
      const [firstSegment] = pathWithoutBase.replace(/^\//, '').split('/');
      return CONFIG.SUPPORTED_LANGS.includes(firstSegment) ? firstSegment : null;
    },

    getTargetLang() {
      const stored = this.getStoredLang();
      if (stored) return stored;

      const browser = this.getBrowserLang();
      if (browser) return browser;

      return CONFIG.DEFAULT_LANG;
    },

    getAllBrowserLangs() {
      return navigator.languages || [navigator.language || navigator.userLanguage];
    },
  };

  const URLService = {
    buildPathWithLang(targetLang, currentPath) {
      const path = currentPath || window.location.pathname;
      const baseUrl = CONFIG.BASE_URL;
      const currentLang = LangDetector.getLangFromPath(path);
      const pathWithoutBase = stripBaseFromPath(path, baseUrl);

      let newPath;
      if (currentLang) {
        newPath = pathWithoutBase.replace(/^\/(en|zh)(\/|$)/, `/${targetLang}$2`);
      } else {
        const suffix = pathWithoutBase.startsWith('/') ? pathWithoutBase : `/${pathWithoutBase}`;
        newPath = `/${targetLang}${suffix}`.replace(/\/+g, '/');
      }

      return joinWithBase(baseUrl, newPath);
    },

    redirect(targetPath) {
      window.location.replace(targetPath);
    },

    shouldRedirect(targetLang) {
      const currentLang = LangDetector.getLangFromPath();
      return currentLang !== targetLang;
    },
  };

  const Logger = {
    enabled: true,

    log(message, data) {
      if (this.enabled && console.log) {
        console.log(message, data || '');
      }
    },

    group(label) {
      if (this.enabled && console.group) {
        console.group(label);
      }
    },

    groupEnd() {
      if (this.enabled && console.groupEnd) {
        console.groupEnd();
      }
    },
  };

  global.LangDetectCore = {
    LangDetector,
    URLService,
    Logger,
    CONFIG,
    version: '2.0.0',
  };

})(typeof window !== 'undefined' ? window : this);

