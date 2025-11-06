/**
 * Language Auto-Redirect Script
 * 
 * Automatically redirects users to their preferred language version.
 * This script should be loaded as early as possible to minimize flicker.
 * 
 * Dependencies: lang-detect-core.js
 * 
 * @version 2.0.0
 */

(function() {
  'use strict';

  // Check if core module is loaded
  if (typeof LangDetectCore === 'undefined') {
    console.error('LangDetectCore module not found. Please include lang-detect-core.js first.');
    return;
  }

  const { LangDetector, URLService, Logger } = LangDetectCore;

  // Skip redirect on back/forward navigation to avoid breaking browser history
  if (performance.navigation && performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD) {
    Logger.log('⏮️ Back/forward navigation detected, skipping redirect');
    return;
  }

  /**
   * Main redirect logic
   */
  function performAutoRedirect() {
    const currentPath = window.location.pathname;
    const currentLang = LangDetector.getLangFromPath();
    const targetLang = LangDetector.getTargetLang();

    // Debug logging
    Logger.group('🌐 Language Auto-Redirect');
    Logger.log('  Browser languages:', LangDetector.getAllBrowserLangs());
    Logger.log('  Detected browser lang:', LangDetector.getBrowserLang());
    Logger.log('  Stored preference:', LangDetector.getStoredLang());
    Logger.log('  Current URL lang:', currentLang);
    Logger.log('  Target lang:', targetLang);

    // Check if redirect is needed
    if (!URLService.shouldRedirect(targetLang)) {
      Logger.log('✅ Language matches, no redirect needed');
      Logger.groupEnd();
      return;
    }

    // Perform redirect
    const newPath = URLService.buildPathWithLang(targetLang, currentPath);
    
    if (newPath !== currentPath) {
      Logger.log('🔄 Redirecting...');
      Logger.log('  From:', currentPath, currentLang ? `(${currentLang})` : '(no lang)');
      Logger.log('  To:', newPath, `(${targetLang})`);
      Logger.groupEnd();
      
      URLService.redirect(newPath);
    } else {
      Logger.log('⚠️ No redirect needed (paths are identical)');
      Logger.groupEnd();
    }
  }

  // Execute redirect logic
  try {
    performAutoRedirect();
  } catch (error) {
    console.error('❌ Error in language auto-redirect:', error);
  }

})();

