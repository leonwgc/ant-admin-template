/**
 * @file utils/url.ts
 * @author leon.wang
 */

/**
 * Parse query parameters from a URL string (or current page URL by default).
 * Returns a plain object of key-value pairs.
 */
export const getParams = (): Record<string, string> => {
  return Object.fromEntries(
    new URLSearchParams(window.location.search).entries(),
  );
};

/**
 * Append or update a query parameter in a URL.
 * @param url Base URL
 * @param key Parameter name
 * @param value Parameter value
 * @returns Updated URL string
 */
export const setParam = (url: string, key: string, value: string): string => {
  const parsed = new URL(url, window.location.href);
  parsed.searchParams.set(key, value);
  return parsed.toString();
};

/**
 * Remove a query parameter from a URL.
 */
export const removeParam = (url: string, key: string): string => {
  const parsed = new URL(url, window.location.href);
  parsed.searchParams.delete(key);
  return parsed.toString();
};

/**
 * Build a query string from a plain object.
 * e.g. { page: 1, size: 20 } → "page=1&size=20"
 */
export const buildQuery = (
  params: Record<string, string | number | boolean | undefined | null>,
): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });
  return searchParams.toString();
};

/**
 * Copy a text string to the clipboard.
 * Returns true on success, false on failure.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
};

/**
 * Check whether a string is a valid absolute URL.
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const { protocol } = new URL(url);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Get the base URL (origin + pathname, no query string or hash).
 */
export const getBaseUrl = (url?: string): string => {
  const parsed = new URL(url ?? window.location.href);
  return `${parsed.origin}${parsed.pathname}`;
};
