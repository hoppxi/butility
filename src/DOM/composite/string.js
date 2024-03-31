
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */



/**
 * Utility functions for working with strings.
 * @class
 */
export default class String {
    /**
     * Check if a string is empty.
     * @param {string} value - The string to check.
     * @returns {boolean} - True if the string is empty, false otherwise.
     */
    static isEmptyString(value) {
        return value.trim() === '';
    }

    /**
     * Trim leading and trailing whitespace from a string.
     * @param {string} value - The string to trim.
     * @returns {string} - The trimmed string.
     */
    static trimString(value) {
        return value.trim();
    }

    /**
     * Capitalize the first letter of a string.
     * @param {string} value - The string to capitalize.
     * @returns {string} - The capitalized string.
     */
    static capitalizeString(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    /**
     * Check if a string starts with a specific substring.
     * @param {string} mainString - The main string.
     * @param {string} searchString - The substring to check for.
     * @returns {boolean} - True if the string starts with the substring, false otherwise.
     */
    static startsWithString(mainString, searchString) {
        return mainString.startsWith(searchString);
    }

    /**
     * Check if a string ends with a specific substring.
     * @param {string} mainString - The main string.
     * @param {string} searchString - The substring to check for.
     * @returns {boolean} - True if the string ends with the substring, false otherwise.
     */
    static endsWithString(mainString, searchString) {
        return mainString.endsWith(searchString);
    }

    /**
     * Check if a string contains a specific substring.
     * @param {string} mainString - The main string.
     * @param {string} searchString - The substring to check for.
     * @returns {boolean} - True if the string contains the substring, false otherwise.
     */
    static containsString(mainString, searchString) {
        return mainString.includes(searchString);
    }

    /**
     * Replace all occurrences of a substring in a string.
     * @param {string} mainString - The main string.
     * @param {string} searchString - The substring to replace.
     * @param {string} replacement - The string to replace with.
     * @returns {string} - The modified string.
     */
    static replaceAllOccurrences(mainString, searchString, replacement) {
        return mainString.split(searchString).join(replacement);
    }

    /**
     * Format a string using values.
     * @param {string} template - The string template with placeholders.
     * @param {Object} values - The values to replace placeholders in the template.
     * @returns {string} - The formatted string.
     */
    static formatString(template, values) {
        return template.replace(/{([^{}]*)}/g, (match, key) => values[key]);
    }

    /**
     * Generate a random string of a specified length.
     * @param {number} length - The length of the random string.
     * @returns {string} - The generated random string.
     */
    static generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        return randomString;
    }
}
