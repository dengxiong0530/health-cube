import Cookies from 'js-cookie';
import cache from '@/plugins/cache';

/**
 * Cookies Management Tool
 * Used to handle cookie interception, clearing, and compliance checks
 */
const cookiesManager = {
  /**
   * Check if user has consented to use cookies
   * @returns {boolean} Whether user has consented
   */
  isCookiesAllowed() {
    const consent = cache.local.get('cookies_consent');
    // Return true if user hasn't made a choice or has accepted
    return !consent || consent === 'accepted';
  },

  /**
   * Clear all cookies
   */
  clearAllCookies() {
    // Get all cookie keys
    const cookies = Cookies.get();
    Object.keys(cookies).forEach(key => {
      Cookies.remove(key);
    });
    console.log('All cookies have been cleared');
  },

  /**
   * Clear specific cookies
   * @param {string[]} cookieNames - Array of cookie names to clear
   */
  clearSpecificCookies(cookieNames) {
    cookieNames.forEach(name => {
      Cookies.remove(name);
    });
  },

  /**
   * Set cookie (with permission check)
   * @param {string} name - Cookie name
   * @param {string} value - Cookie value
   * @param {object} options - Cookie options
   * @returns {boolean} Whether cookie was successfully set
   */
  setCookie(name, value, options = {}) {
    if (this.isCookiesAllowed()) {
      Cookies.set(name, value, options);
      return true;
    }
    console.warn(`Cannot set cookie ${name} - user has rejected cookies`);
    return false;
  },

  /**
   * Get cookie (with permission check)
   * @param {string} name - Cookie name
   * @returns {string|null} Cookie value or null
   */
  getCookie(name) {
    if (this.isCookiesAllowed()) {
      return Cookies.get(name);
    }
    return null;
  },

  /**
   * Initialize cookie management
   * Check user preferences and perform corresponding actions
   */
  init() {
    if (!this.isCookiesAllowed()) {
      this.clearAllCookies();
    }
  }
};

export default cookiesManager;