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

  /**
   * Configuration
   */
  const CONFIG = {
    SUPPORTED_LANGS: ['en', 'zh'],
    DEFAULT_LANG: 'en',
    STORAGE_KEY: 'lang',
    // Auto-detect base URL from current page
    get BASE_URL() {
      // Try to read from meta tag or detect from document base
      const baseTag = document.querySelector('base');
      if (baseTag) {
        const base = baseTag.getAttribute('href');
        return base.replace(window.location.origin, '').replace(/\/$/, '');
      }
      
      // Fallback: try to detect from current path
      const path = window.location.pathname;
      const match = path.match(/^(\/[^\/]+)?\/(?:en|zh)\//);
      return match && match[1] ? match[1] : '';
    },
  };

  /**
   * Language Detection Service
   * Handles all language detection logic in one place
   */
  const LangDetector = {
    /**
     * Extract primary language code from browser language string
     * @param {string} lang - Language string (e.g., 'zh-CN', 'en-US')
     * @returns {string|null} Primary language code or null
     */
    extractPrimaryLang(lang) {
      if (!lang) return null;
      const code = lang.toLowerCase().split('-')[0];
      return CONFIG.SUPPORTED_LANGS.includes(code) ? code : null;
    },

    /**
     * Get browser's preferred language from navigator
     * @returns {string|null} Detected language or null
     */
    getBrowserLang() {
      const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage];
      
      for (const lang of browserLangs) {
        const primaryLang = this.extractPrimaryLang(lang);
        if (primaryLang) return primaryLang;
      }
      
      return null;
    },

    /**
     * Get stored language preference from localStorage
     * @returns {string|null} Stored language or null
     */
    getStoredLang() {
      try {
        const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
        return stored && CONFIG.SUPPORTED_LANGS.includes(stored) ? stored : null;
      } catch {
        return null;
      }
    },

    /**
     * Set language preference to localStorage
     * @param {string} lang - Language code to store
     */
    setStoredLang(lang) {
      try {
        if (CONFIG.SUPPORTED_LANGS.includes(lang)) {
          localStorage.setItem(CONFIG.STORAGE_KEY, lang);
        }
      } catch {
        // Silent fail if localStorage is unavailable
      }
    },

    /**
     * Get current language from URL path
     * @param {string} [pathname] - URL pathname (defaults to window.location.pathname)
     * @returns {string|null} Language from path or null
     */
    getLangFromPath(pathname) {
      const path = pathname || window.location.pathname;
      const baseUrl = CONFIG.BASE_URL;
      
      // Remove base URL from path if present
      const pathWithoutBase = baseUrl ? path.replace(new RegExp(`^${baseUrl}`), '') : path;
      const pathSegments = pathWithoutBase.replace(/^\//, '').split('/');
      
      return CONFIG.SUPPORTED_LANGS.includes(pathSegments[0]) ? pathSegments[0] : null;
    },

    /**
     * Determine target language based on priority
     * Priority: Stored preference > Browser language > Default
     * @returns {string} Target language code
     */
    getTargetLang() {
      const stored = this.getStoredLang();
      if (stored) return stored;

      const browser = this.getBrowserLang();
      if (browser) return browser;

      return CONFIG.DEFAULT_LANG;
    },

    /**
     * Get all browser languages for debugging
     * @returns {string[]} Array of browser languages
     */
    getAllBrowserLangs() {
      return navigator.languages || [navigator.language || navigator.userLanguage];
    },
  };

  /**
   * URL Service
   * Handles URL manipulation and navigation
   */
  const URLService = {
    /**
     * Build new path with language prefix
     * @param {string} targetLang - Target language code
     * @param {string} [currentPath] - Current path (defaults to window.location.pathname)
     * @returns {string} New path with language prefix
     */
    buildPathWithLang(targetLang, currentPath) {
      const path = currentPath || window.location.pathname;
      const baseUrl = CONFIG.BASE_URL;
      const currentLang = LangDetector.getLangFromPath(path);

      // Remove base URL temporarily for manipulation
      const pathWithoutBase = baseUrl ? path.replace(new RegExp(`^${baseUrl}`), '') : path;

      let newPath;
      if (currentLang) {
        // Replace existing language prefix
        newPath = pathWithoutBase.replace(/^\/(en|zh)(\/|$)/, `/${targetLang}$2`);
      } else {
        // Add language prefix
        newPath = `/${targetLang}${pathWithoutBase}`.replace(/\/+/g, '/');
      }

      // Add base URL back
      return baseUrl ? `${baseUrl}${newPath}` : newPath;
    },

    /**
     * Perform redirect to target language
     * @param {string} targetPath - Target path to redirect to
     */
    redirect(targetPath) {
      window.location.replace(targetPath);
    },

    /**
     * Check if redirect is needed
     * @param {string} targetLang - Target language
     * @returns {boolean} True if redirect needed
     */
    shouldRedirect(targetLang) {
      const currentLang = LangDetector.getLangFromPath();
      return currentLang !== targetLang;
    },
  };

  /**
   * Logger Service
   * Handles debug logging
   */
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

  // Export to global scope
  global.LangDetectCore = {
    LangDetector,
    URLService,
    Logger,
    CONFIG,
    version: '2.0.0',
  };

})(typeof window !== 'undefined' ? window : this);

