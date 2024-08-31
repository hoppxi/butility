
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */


/**
 * Utility class for manipulating both local and session storage.
 */
export class BrowserStorage {
    /**
     * Sets a key-value pair in local storage.
     * @param {string} key - The key for the storage item.
     * @param {string} value - The value to be stored.
     */
    static setLocal(key, value) {
        localStorage.setItem(key, value);
    }

    /**
     * Gets the value associated with a key from local storage.
     * @param {string} key - The key for the storage item.
     * @returns {string|null} - The stored value or null if the key is not found.
     */
    static getLocal(key) {
        return localStorage.getItem(key);
    }

    /**
     * Removes a key-value pair from local storage.
     * @param {string} key - The key for the storage item to be removed.
     */
    static removeLocal(key) {
        localStorage.removeItem(key);
    }

    /**
     * Clears all key-value pairs from local storage.
     */
    static clearLocal() {
        localStorage.clear();
    }

    /**
     * Sets a key-value pair in session storage.
     * @param {string} key - The key for the storage item.
     * @param {string} value - The value to be stored.
     */
    static setSession(key, value) {
        sessionStorage.setItem(key, value);
    }

    /**
     * Gets the value associated with a key from session storage.
     * @param {string} key - The key for the storage item.
     * @returns {string|null} - The stored value or null if the key is not found.
     */
    static getSession(key) {
        return sessionStorage.getItem(key);
    }

    /**
     * Removes a key-value pair from session storage.
     * @param {string} key - The key for the storage item to be removed.
     */
    static removeSession(key) {
        sessionStorage.removeItem(key);
    }

    /**
     * Clears all key-value pairs from session storage.
     */
    static clearSession() {
        sessionStorage.clear();
    }

    /**
     * Retrieves the key at the specified index from local storage.
     * @param {number} index - The index of the key to retrieve.
     * @returns {string|null} - The key or null if the index is out of bounds.
     */
    static getLocalKeyByIndex(index) {
        return localStorage.key(index);
    }

    /**
     * Retrieves the key at the specified index from session storage.
     * @param {number} index - The index of the key to retrieve.
     * @returns {string|null} - The key or null if the index is out of bounds.
     */
    static getSessionKeyByIndex(index) {
        return sessionStorage.key(index);
    }

    /**
     * Retrieves the number of key-value pairs stored in local storage.
     * @returns {number} - The number of key-value pairs.
     */
    static getLocalLength() {
        return localStorage.length;
    }

    /**
     * Retrieves the number of key-value pairs stored in session storage.
     * @returns {number} - The number of key-value pairs.
     */
    static getSessionLength() {
        return sessionStorage.length;
    }

    /**
     * Checks if a key exists in local storage.
     * @param {string} key - The key to check for existence.
     * @returns {boolean} - True if the key exists, false otherwise.
     */
    static isLocalKeyExists(key) {
        return localStorage.getItem(key) !== null;
    }

    /**
     * Checks if a key exists in session storage.
     * @param {string} key - The key to check for existence.
     * @returns {boolean} - True if the key exists, false otherwise.
     */
    static isSessionKeyExists(key) {
        return sessionStorage.getItem(key) !== null;
    }

    /**
     * Retrieves all keys stored in local storage.
     * @returns {Array<string>} - An array containing all keys in local storage.
     */
    static getAllLocalKeys() {
        return Object.keys(localStorage);
    }

    /**
     * Retrieves all keys stored in session storage.
     * @returns {Array<string>} - An array containing all keys in session storage.
     */
    static getAllSessionKeys() {
        return Object.keys(sessionStorage);
    }

    /**
     * Retrieves all values stored in local storage.
     * @returns {Array<string>} - An array containing all values in local storage.
     */
    static getAllLocalValues() {
        return Object.values(localStorage);
    }

    /**
     * Retrieves all values stored in session storage.
     * @returns {Array<string>} - An array containing all values in session storage.
     */
    static getAllSessionValues() {
        return Object.values(sessionStorage);
    }

    /**
     * Retrieves all key-value pairs stored in local storage.
     * @returns {Object} - An object containing all key-value pairs in local storage.
     */
    static getAllLocalItems() {
        const items = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            items[key] = localStorage.getItem(key);
        }
        return items;
    }

    /**
     * Retrieves all key-value pairs stored in session storage.
     * @returns {Object} - An object containing all key-value pairs in session storage.
     */
    static getAllSessionItems() {
        const items = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            items[key] = sessionStorage.getItem(key);
        }
        return items;
    }
}