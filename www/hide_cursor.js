/**
 * Hide Cursor Script for Home Assistant Kiosk Mode
 *
 * Hides the mouse cursor after a short period of inactivity.
 * Useful for wall-mounted displays running Home Assistant in kiosk mode.
 *
 * Install
 * 1) Copy this file to: /config/www/hide_cursor.js
 * 2) Add to configuration.yaml:
 *
 *    frontend:
 *      extra_module_url:
 *        - /local/hide_cursor.js
 *
 * 3) Restart Home Assistant.
 *
 * Notes
 * - /local/ maps to /config/www/
 * - If changes do not appear, hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R).
 */

(() => {
  'use strict';

  // ms of inactivity before hiding the cursor
  const HIDE_DELAY = 3000;

  /** @type {number|null} */
  let hideTimer = null;
  let isHidden = false;

  // Preserve whatever cursor style was in use before we touch it.
  const originalCursor = (() => {
    const el = document.body || document.documentElement;
    return el && el.style ? el.style.cursor : '';
  })();

  function getTargetEl() {
    return document.body || document.documentElement;
  }

  function setCursor(value) {
    const el = getTargetEl();
    if (!el || !el.style) return;
    el.style.cursor = value;
  }

  function hideCursor() {
    if (isHidden) return;
    isHidden = true;
    setCursor('none');
  }

  function showCursor() {
    if (!isHidden) return;
    isHidden = false;
    // Restore the prior inline style if any; otherwise use default.
    setCursor(originalCursor || '');
  }

  function resetHideTimer() {
    if (hideTimer !== null) {
      clearTimeout(hideTimer);
    }
    hideTimer = window.setTimeout(hideCursor, HIDE_DELAY);
  }

  function onActivity() {
    // Only flip cursor state when needed; always reset timer.
    showCursor();
    resetHideTimer();
  }

  function init() {
    // Activity events that should show the cursor and restart the timer.
    const events = ['mousemove', 'mousedown', 'wheel', 'touchstart', 'touchmove'];
    for (const evt of events) {
      document.addEventListener(evt, onActivity, { passive: true });
    }

    // Hide after delay on initial load.
    resetHideTimer();

    // Keep noise low; still useful for confirming load.
    // eslint-disable-next-line no-console
    console.log('[wallboard] hide_cursor.js loaded');
  }

  // Ensure we have a target element to style.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
