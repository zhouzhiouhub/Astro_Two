/**
 * Browser Language Detection Debug Tool
 *
 * This script detects browser language and displays it on the page for debugging purposes.
 * Shows browser languages, detected language, and current page language.
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Get browser languages
    const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage];
    const primaryLang = browserLangs[0];

    // Extract primary language code (zh-CN -> zh, en-US -> en)
    const detectedLang = extractPrimaryLang(primaryLang);

    // Get current page language from URL
    const currentPath = window.location.pathname;
    const pathLang = currentPath.replace(/^\//, '').split('/')[0];
    const supportedLangs = ['en', 'zh'];
    const currentLang = supportedLangs.includes(pathLang) ? pathLang : 'en';

    // Map language codes to display names
    const langNames = {
      'en': 'English',
      'zh': '中文',
    };

    // Create debug panel
    createDebugPanel({
      browserLangs,
      primaryLang,
      detectedLang,
      currentLang,
      langNames,
      match: detectedLang === currentLang
    });
  }

  function extractPrimaryLang(lang) {
    if (!lang) return 'en';
    const code = lang.toLowerCase().split('-')[0];
    const supported = ['en', 'zh'];
    return supported.includes(code) ? code : 'en';
  }

  function createDebugPanel(data) {
    const panel = document.createElement('div');
    panel.id = 'browser-lang-debug';
    panel.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.9);
      color: #fff;
      padding: 15px 20px;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      font-size: 13px;
      z-index: 999999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      max-width: 350px;
      backdrop-filter: blur(10px);
    `;

    const matchColor = data.match ? '#4CAF50' : '#FF9800';
    const matchIcon = data.match ? '✓' : '⚠';

    panel.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #444; padding-bottom: 8px; font-size: 14px;">
        🌐 Browser Language Debug
      </div>
      <div style="margin: 8px 0;">
        <strong style="color: #64B5F6;">Browser Languages:</strong><br/>
        <span style="color: #FFE082; margin-left: 10px;">${data.browserLangs.join(', ')}</span>
      </div>
      <div style="margin: 8px 0;">
        <strong style="color: #64B5F6;">Primary Language:</strong><br/>
        <span style="color: #FFE082; margin-left: 10px;">${data.primaryLang}</span>
      </div>
      <div style="margin: 8px 0;">
        <strong style="color: #64B5F6;">Detected Lang:</strong><br/>
        <span style="color: #FFE082; margin-left: 10px;">${data.detectedLang} (${data.langNames[data.detectedLang] || 'Unknown'})</span>
      </div>
      <div style="margin: 8px 0;">
        <strong style="color: #64B5F6;">Current Page Lang:</strong><br/>
        <span style="color: #FFE082; margin-left: 10px;">${data.currentLang} (${data.langNames[data.currentLang] || 'Unknown'})</span>
      </div>
      <div style="margin: 12px 0 8px; padding: 10px; background: ${matchColor}22; border-left: 3px solid ${matchColor}; border-radius: 4px;">
        <strong style="color: ${matchColor};">${matchIcon} ${data.match ? 'Language Match' : 'Language Mismatch'}</strong>
        ${!data.match ? '<br/><small style="color: #FFE082;">Page language differs from browser language</small>' : ''}
      </div>
      <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #444; font-size: 11px; color: #999;">
        <strong>Supported:</strong> en, zh, ru (default: en)
      </div>
      <button id="close-debug-panel" style="
        position: absolute;
        top: 8px;
        right: 8px;
        background: transparent;
        border: none;
        color: #999;
        cursor: pointer;
        font-size: 16px;
        padding: 0;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
      ">×</button>
    `;

    document.body.appendChild(panel);

    // Close button functionality
    const closeBtn = document.getElementById('close-debug-panel');
    closeBtn.addEventListener('click', () => {
      panel.remove();
    });

    // Log to console for additional debugging
    console.log('🌐 Browser Language Detection:');
    console.log('  Browser Languages:', data.browserLangs);
    console.log('  Primary Language:', data.primaryLang);
    console.log('  Detected Lang:', data.detectedLang);
    console.log('  Current Page Lang:', data.currentLang);
    console.log('  Match:', data.match);
  }
})();

