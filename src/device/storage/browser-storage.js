/**
 * @author - Ermiyas Arage
 * @license MIT
 */

/**
 * Utility class for manipulating both local and session storage.
 * @class
 */
export class BrowserStorage {
    /**
     * Sets a key-value pair in local storage with optional expiration.
     *
     * @param {string} key - The key for the storage item.
     * @param {string} value - The value to be stored.
     * @param {number} [expiresIn] - Optional expiration time in milliseconds.
     */
    static setLocal(key, value, expiresIn) {
        const data = { value };
        if (expiresIn) {
            data.expiresAt = Date.now() + expiresIn;
        }
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Gets the value associated with a key from local storage, considering expiration.
     *
     * @param {string} key - The key for the storage item.
     * @returns {string|null} - The stored value or null if the key is not found or expired.
     */
    static getLocal(key) {
        const item = localStorage.getItem(key);
        if (item) {
            const data = JSON.parse(item);
            if (data.expiresAt && Date.now() > data.expiresAt) {
                localStorage.removeItem(key);
                return null;
            }
            return data.value;
        }
        return null;
    }

    /**
     * Sets a key-value pair in session storage with optional expiration.
     *
     * @param {string} key - The key for the storage item.
     * @param {string} value - The value to be stored.
     * @param {number} [expiresIn] - Optional expiration time in milliseconds.
     */
    static setSession(key, value, expiresIn) {
        const data = { value };
        if (expiresIn) {
            data.expiresAt = Date.now() + expiresIn;
        }
        sessionStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Gets the value associated with a key from session storage, considering expiration.
     *
     * @param {string} key - The key for the storage item.
     * @returns {string|null} - The stored value or null if the key is not found or expired.
     */
    static getSession(key) {
        const item = sessionStorage.getItem(key);
        if (item) {
            const data = JSON.parse(item);
            if (data.expiresAt && Date.now() > data.expiresAt) {
                sessionStorage.removeItem(key);
                return null;
            }
            return data.value;
        }
        return null;
    }

    /**
     * Checks if a key exists in local storage.
     *
     * @param {string} key - The key to check for existence.
     * @returns {boolean} - True if the key exists, false otherwise.
     */
    static isLocalKeyExists(key) {
        return this.getLocal(key) !== null;
    }

    /**
     * Checks if a key exists in session storage.
     *
     * @param {string} key - The key to check for existence.
     * @returns {boolean} - True if the key exists, false otherwise.
     */
    static isSessionKeyExists(key) {
        return this.getSession(key) !== null;
    }

    /**
     * Retrieves all keys stored in local storage.
     *
     * @returns {Array<string>} - An array containing all keys in local storage.
     */
    static getAllLocalKeys() {
        return Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i));
    }

    /**
     * Retrieves all keys stored in session storage.
     *
     * @returns {Array<string>} - An array containing all keys in session storage.
     */
    static getAllSessionKeys() {
        return Array.from({ length: sessionStorage.length }, (_, i) => sessionStorage.key(i));
    }

    /**
     * Retrieves all values stored in local storage.
     *
     * @returns {Array<string>} - An array containing all values in local storage.
     */
    static getAllLocalValues() {
        return Array.from({ length: localStorage.length }, (_, i) => localStorage.getItem(localStorage.key(i)));
    }

    /**
     * Retrieves all values stored in session storage.
     *
     * @returns {Array<string>} - An array containing all values in session storage.
     */
    static getAllSessionValues() {
        return Array.from({ length: sessionStorage.length }, (_, i) => sessionStorage.getItem(sessionStorage.key(i)));
    }

    /**
     * Retrieves all key-value pairs stored in local storage.
     *
     * @returns {Object} - An object containing all key-value pairs in local storage.
     */
    static getAllLocalItems() {
        return Array.from({ length: localStorage.length }, (_, i) => {
            const key = localStorage.key(i);
            return { [key]: this.getLocal(key) };
        }).reduce((acc, item) => ({ ...acc, ...item }), {});
    }

    /**
     * Retrieves all key-value pairs stored in session storage.
     *
     * @returns {Object} - An object containing all key-value pairs in session storage.
     */
    static getAllSessionItems() {
        return Array.from({ length: sessionStorage.length }, (_, i) => {
            const key = sessionStorage.key(i);
            return { [key]: this.getSession(key) };
        }).reduce((acc, item) => ({ ...acc, ...item }), {});
    }

    /**
     * Synchronizes local storage with a given object. Adds new entries, updates existing ones, and removes obsolete ones.
     *
     * @param {Object} data - An object containing key-value pairs to sync with local storage.
     * @param {boolean} [merge=false] - If true, merge with existing local storage data instead of replacing.
     * @returns {void}
     */
    static syncLocalStorage(data, merge = false) {
        if (merge) {
            for (const [key, value] of Object.entries(data)) {
                this.setLocal(key, value);
            }
        } else {
            this.clearLocal();
            for (const [key, value] of Object.entries(data)) {
                this.setLocal(key, value);
            }
        }
    }

    /**
     * Syncs session storage with a given object. Adds new entries, updates existing ones, and removes obsolete ones.
     *
     * @param {Object} data - An object containing key-value pairs to sync with session storage.
     * @param {boolean} [merge=false] - If true, merge with existing session storage data instead of replacing.
     * @returns {void}
     */
    static syncSessionStorage(data, merge = false) {
        if (merge) {
            for (const [key, value] of Object.entries(data)) {
                this.setSession(key, value);
            }
        } else {
            this.clearSession();
            for (const [key, value] of Object.entries(data)) {
                this.setSession(key, value);
            }
        }
    }

    /**
     * Performs a batch operation on local storage, executing a function on each key-value pair.
     *
     * @param {Function} callback - A function to execute on each key-value pair. Receives key and value as arguments.
     * @returns {void}
     */
    static batchProcessLocalStorage(callback) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            callback(key, this.getLocal(key));
        }
    }

    /**
     * Performs a batch operation on session storage, executing a function on each key-value pair.
     *
     * @param {Function} callback - A function to execute on each key-value pair. Receives key and value as arguments.
     * @returns {void}
     */
    static batchProcessSessionStorage(callback) {
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            callback(key, this.getSession(key));
        }
    }
}
