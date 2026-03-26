/**
 * @file utils/storage.ts
 * @author leon.wang
 */

interface StorageItem<T> {
  value: T;
  expireAt: number | null;
}

/**
 * Local storage manager with optional TTL expiration support
 */
export const Storage = {
  /**
   * Save a value to localStorage
   * @param key Storage key
   * @param value Value to store (will be JSON serialized)
   * @param ttlMs Optional TTL in milliseconds. If not set, the value never expires.
   */
  set<T>(key: string, value: T, ttlMs?: number): void {
    const item: StorageItem<T> = {
      value,
      expireAt: ttlMs ? Date.now() + ttlMs : null,
    };
    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch {
      // Ignore storage errors (e.g. private mode / quota exceeded)
    }
  },

  /**
   * Read a value from localStorage. Returns null if missing or expired.
   */
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const item: StorageItem<T> = JSON.parse(raw);
      if (item.expireAt !== null && Date.now() > item.expireAt) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch {
      return null;
    }
  },

  /** Remove a key from localStorage */
  remove(key: string): void {
    localStorage.removeItem(key);
  },

  /** Remove all keys with the given prefix */
  removeByPrefix(prefix: string): void {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(prefix))
      .forEach((k) => localStorage.removeItem(k));
  },

  /** Clear all localStorage entries */
  clear(): void {
    localStorage.clear();
  },
};

/**
 * Session storage manager (same API as Storage, no TTL needed — cleared on tab close)
 */
export const SessionStorage = {
  set<T>(key: string, value: T): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore
    }
  },

  get<T>(key: string): T | null {
    try {
      const raw = sessionStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },

  remove(key: string): void {
    sessionStorage.removeItem(key);
  },

  clear(): void {
    sessionStorage.clear();
  },
};
