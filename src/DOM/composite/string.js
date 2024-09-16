
/**
 * @author - Ermiyas Arage
 * @license MIT
 */



/**
 * Utility functions for working with strings.
 * @class
 */
export class String {
    /**
     * Check if a string is empty.
     * @param {string} value - The string to check.
     * @returns {boolean} - True if the string is empty, false otherwise.
     */
    static isEmptyString(value) {
        if (typeof value !== 'string') {
            console.warn('isEmptyString: Input is not a string.');
            return false;
        }
        const trimmed = value.trim();
        return trimmed.length === 0;
    }

     /**
     * Trim leading and trailing whitespace from a string, including newlines and tabs.
     * Provides custom trimming for specific characters.
     * @param {string} value - The string to trim.
     * @param {string} [chars] - Optional characters to trim, defaults to whitespace.
     * @returns {string} - The trimmed string.
     */
     static trimString(value, chars = ' \n\t\r') {
        if (typeof value !== 'string') {
            throw new Error('trimString: Input must be a string.');
        }
        const regex = new RegExp(`^[${chars}]+|[${chars}]+$`, 'g');
        return value.replace(regex, '');
    }

    /**
     * Capitalize the first letter of each word in a string, supporting various word separators.
     * Handles cases where words are already capitalized or include special characters.
     * @param {string} value - The string to capitalize.
     * @param {string} [separator=' '] - Optional word separator.
     * @returns {string} - The capitalized string.
     */
    static capitalizeString(value, separator = ' ') {
        if (typeof value !== 'string') {
            throw new Error('capitalizeString: Input must be a string.');
        }
        return value
            .split(separator)
            .map((word) => {
                if (word.length === 0) return word;
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(separator);
    }

    /**
     * Check if a string starts with a specific substring. Supports case-sensitive or case-insensitive checks.
     * @param {string} mainString - The main string.
     * @param {string} searchString - The substring to check for.
     * @param {boolean} [caseSensitive=true] - Whether to perform a case-sensitive search.
     * @returns {boolean} - True if the string starts with the substring, false otherwise.
     */
    static startsWithString(mainString, searchString, caseSensitive = true) {
        if (typeof mainString !== 'string' || typeof searchString !== 'string') {
            throw new Error('startsWithString: Both inputs must be strings.');
        }
        if (!caseSensitive) {
            mainString = mainString.toLowerCase();
            searchString = searchString.toLowerCase();
        }
        return mainString.startsWith(searchString);
    }

    /**
     * Check if a string ends with a specific substring. Supports case-sensitive or case-insensitive checks.
     * @param {string} mainString - The main string.
     * @param {string} searchString - The substring to check for.
     * @param {boolean} [caseSensitive=true] - Whether to perform a case-sensitive search.
     * @returns {boolean} - True if the string ends with the substring, false otherwise.
     */
    static endsWithString(mainString, searchString, caseSensitive = true) {
        if (typeof mainString !== 'string' || typeof searchString !== 'string') {
            throw new Error('endsWithString: Both inputs must be strings.');
        }
        if (!caseSensitive) {
            mainString = mainString.toLowerCase();
            searchString = searchString.toLowerCase();
        }
        return mainString.endsWith(searchString);
    }

    /**
     * Check if a string contains a specific substring, with options for case-sensitivity and custom start position.
     * @param {string} mainString - The main string.
     * @param {string} searchString - The substring to check for.
     * @param {boolean} [caseSensitive=true] - Whether to perform a case-sensitive search.
     * @param {number} [startIndex=0] - Position to start searching from.
     * @returns {boolean} - True if the string contains the substring, false otherwise.
     */
    static containsString(mainString, searchString, caseSensitive = true, startIndex = 0) {
        if (typeof mainString !== 'string' || typeof searchString !== 'string') {
            throw new Error('containsString: Both inputs must be strings.');
        }
        if (startIndex < 0 || startIndex >= mainString.length) {
            console.warn('containsString: Invalid start index.');
            return false;
        }
        if (!caseSensitive) {
            mainString = mainString.toLowerCase();
            searchString = searchString.toLowerCase();
        }
        return mainString.indexOf(searchString, startIndex) !== -1;
    }
    

    /**
     * Replace all occurrences of a substring in a string, with optional case-sensitivity.
     * @param {string} mainString - The main string.
     * @param {string} searchString - The substring to replace.
     * @param {string} replacement - The string to replace with.
     * @param {boolean} [caseSensitive=true] - Whether to perform a case-sensitive replacement.
     * @returns {string} - The modified string.
     */
    static replaceAllOccurrences(mainString, searchString, replacement, caseSensitive = true) {
        if (typeof mainString !== 'string' || typeof searchString !== 'string' || typeof replacement !== 'string') {
            throw new Error('replaceAllOccurrences: All inputs must be strings.');
        }
        const regexFlags = caseSensitive ? 'g' : 'gi';
        const escapedSearchString = searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special chars
        const regex = new RegExp(escapedSearchString, regexFlags);
        return mainString.replace(regex, replacement);
    }

    /**
     * Format a string using values. Uses deep path resolution for nested object properties.
     * @param {string} template - The string template with placeholders.
     * @param {Object} values - The values to replace placeholders in the template.
     * @returns {string} - The formatted string.
     */
    static formatString(template, values) {
        return template.replace(/{([^{}]*)}/g, (match, key) => {
            const keys = key.split('.');
            return keys.reduce((acc, k) => (acc && acc[k] !== undefined) ? acc[k] : match, values);
        });
    }

    /**
     * Generate a random string of a specified length, with optional character set.
     * @param {number} length - The length of the random string.
     * @param {string} [charSet] - Optional set of characters to use.
     * @returns {string} - The generated random string.
     */
    static generateRandomString(length, charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
        if (typeof length !== 'number' || length <= 0) {
            throw new Error('generateRandomString: Length must be a positive number.');
        }
        const result = [];
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charSet.length);
            result.push(charSet[randomIndex]);
        }
        return result.join('');
    }
}
