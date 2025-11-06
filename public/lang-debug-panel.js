/**
 * Language Detection Debug Panel
 * 
 * Displays a debug panel showing language detection information.
 * Useful for development and troubleshooting.
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

  const { LangDetector, CONFIG } = LangDetectCore;

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const data = collectDebugData();
    createDebugPanel(data);
    logToConsole(data);
  }

  /**
   * Collect all debug data
   */
  function collectDebugData() {
    const browserLangs = LangDetector.getAllBrowserLangs();
    const primaryLang = browserLangs[0];
    const detectedLang = LangDetector.getBrowserLang() || CONFIG.DEFAULT_LANG;
    const currentLang = LangDetector.getLangFromPath() || CONFIG.DEFAULT_LANG;
    const storedLang = LangDetector.getStoredLang();
    const targetLang = LangDetector.getTargetLang();

    const langNames = {
      'en': 'English',
      'zh': '中文',
    };

    return {
      browserLangs,
      primaryLang,
      detectedLang,
      currentLang,
      storedLang,
      targetLang,
      langNames,
      match: detectedLang === currentLang,
      supported: CONFIG.SUPPORTED_LANGS,
      default: CONFIG.DEFAULT_LANG,
    };
  }

  /**
   * Create and display debug panel
   */
  function createDebugPanel(data) {
    // Remove existing panel if any
    const existing = document.getElementById('lang-debug-panel');
    if (existing) existing.remove();

    const panel = document.createElement('div');
    panel.id = 'lang-debug-panel';
    
    // Styles
    Object.assign(panel.style, {
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.92)',
      color: '#fff',
      padding: '16px 20px',
      borderRadius: '10px',
      fontFamily: '"SF Mono", "Fira Code", "Courier New", monospace',
      fontSize: '13px',
      zIndex: '999999',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
      maxWidth: '380px',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    });

    const matchColor = data.match ? '#4CAF50' : '#FF9800';
    const matchIcon = data.match ? '✓' : '⚠';

    panel.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 10px; font-size: 15px; display: flex; align-items: center; justify-content: space-between;">
        <span>🌐 Language Detection Debug</span>
        <button id="close-debug-panel" style="
          background: transparent;
          border: none;
          color: #999;
          cursor: pointer;
          font-size: 20px;
          padding: 0;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          transition: color 0.2s;
        " onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#999'">×</button>
      </div>
      
      <div style="margin: 10px 0;">
        <strong style="color: #64B5F6;">Browser Languages:</strong><br/>
        <span style="color: #FFE082; margin-left: 12px; font-size: 12px;">${data.browserLangs.join(', ')}</span>
      </div>
      
      <div style="margin: 10px 0;">
        <strong style="color: #64B5F6;">Primary Language:</strong><br/>
        <span style="color: #FFE082; margin-left: 12px;">${data.primaryLang}</span>
      </div>
      
      <div style="margin: 10px 0;">
        <strong style="color: #64B5F6;">Detected Lang:</strong><br/>
        <span style="color: #FFE082; margin-left: 12px;">${data.detectedLang} (${data.langNames[data.detectedLang] || 'Unknown'})</span>
      </div>
      
      <div style="margin: 10px 0;">
        <strong style="color: #64B5F6;">Current Page Lang:</strong><br/>
        <span style="color: #FFE082; margin-left: 12px;">${data.currentLang} (${data.langNames[data.currentLang] || 'Unknown'})</span>
      </div>
      
      ${data.storedLang ? `
      <div style="margin: 10px 0;">
        <strong style="color: #64B5F6;">Stored Preference:</strong><br/>
        <span style="color: #81C784; margin-left: 12px;">${data.storedLang} (${data.langNames[data.storedLang] || 'Unknown'})</span>
      </div>
      ` : ''}
      
      <div style="margin: 10px 0;">
        <strong style="color: #64B5F6;">Target Lang:</strong><br/>
        <span style="color: #FFE082; margin-left: 12px;">${data.targetLang} (${data.langNames[data.targetLang] || 'Unknown'})</span>
      </div>
      
      <div style="margin: 14px 0 10px; padding: 12px; background: ${matchColor}22; border-left: 3px solid ${matchColor}; border-radius: 6px;">
        <strong style="color: ${matchColor};">${matchIcon} ${data.match ? 'Language Match' : 'Language Mismatch'}</strong>
        ${!data.match ? '<br/><small style="color: #FFE082; margin-top: 4px; display: block;">Page language differs from browser language</small>' : ''}
      </div>
      
      <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.15); font-size: 11px; color: #999;">
        <strong>Supported:</strong> ${data.supported.join(', ')} (default: ${data.default})
      </div>
    `;

    document.body.appendChild(panel);

    // Close button functionality
    const closeBtn = document.getElementById('close-debug-panel');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.style.transition = 'opacity 0.3s, transform 0.3s';
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(-10px)';
        setTimeout(() => panel.remove(), 300);
      });
    }

    // Animate panel entrance
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(-10px)';
    requestAnimationFrame(() => {
      panel.style.transition = 'opacity 0.3s, transform 0.3s';
      panel.style.opacity = '1';
      panel.style.transform = 'translateY(0)';
    });
  }

  /**
   * Log debug data to console
   */
  function logToConsole(data) {
    console.group('🌐 Language Detection Debug');
    console.log('Browser Languages:', data.browserLangs);
    console.log('Primary Language:', data.primaryLang);
    console.log('Detected Lang:', data.detectedLang);
    console.log('Current Page Lang:', data.currentLang);
    console.log('Stored Preference:', data.storedLang || 'None');
    console.log('Target Lang:', data.targetLang);
    console.log('Match:', data.match);
    console.log('Supported:', data.supported);
    console.groupEnd();
  }

})();

