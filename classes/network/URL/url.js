
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */

/**
 * Utility class for working with URLs.
 * @class
 */
export class URLClass {
    /**
     * Parses a query string and returns an object containing the parameters.
     *
     * @param {string} queryString - The query string to parse.
     * @returns {object} - An object containing key-value pairs of parameters.
     */
    static parseQueryStringParameters(queryString) {
        const params = {};
    
        // Check if the query string is present
        if (!queryString || typeof queryString !== 'string') {
            return params;
        }
    
        // Remove leading '?' if present
        queryString = queryString.startsWith('?') ? queryString.slice(1) : queryString;
    
        // Split the query string into individual key-value pairs
        const pairs = queryString.split('&');
    
        // Iterate through each pair and populate the params object
        for (const pair of pairs) {
            const [key, value] = pair.split('=');
        
            // Decode key and value to handle special characters
            const decodedKey = decodeURIComponent(key);
            const decodedValue = value ? decodeURIComponent(value) : '';
    
            // Check if the key already exists in params
            if (params.hasOwnProperty(decodedKey)) {
                // If it's an array, push the new value
                if (Array.isArray(params[decodedKey])) {
                    params[decodedKey].push(decodedValue);
                } else {
                    // Convert to array if it's not already
                    params[decodedKey] = [params[decodedKey], decodedValue];
                }
            } else {
                // Otherwise, assign the value directly
                params[decodedKey] = decodedValue;
            }
        }
    
        return params;
    }
  

    /**
     * Replaces or adds a query string parameter in a URL.
     *
     * @param {string} url - The URL to modify.
     * @param {string} key - The parameter key to replace or add.
     * @param {string} value - The new value for the parameter.
     * @returns {string} - The modified URL.
     */
    static replaceQueryStringParameter(url, key, value) {
        // Check if the URL is present
        if (!url || typeof url !== 'string') {
            return url;
        }
    
        // Parse the existing URL to separate the base and query string
        const [baseUrl, queryString] = url.split('?');
        const params = {};
    
        // If there is a query string, parse it into key-value pairs
        if (queryString) {
            const pairs = queryString.split('&');
            for (const pair of pairs) {
                const [existingKey, existingValue] = pair.split('=');
                const decodedKey = decodeURIComponent(existingKey);
                const decodedValue = existingValue ? decodeURIComponent(existingValue) : '';
                params[decodedKey] = decodedValue;
            }
        }
    
        // Encode the new key and value
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(value);
    
        // Replace or add the new key-value pair
        params[encodedKey] = encodedValue;
    
        // Construct the modified query string
        const newQueryString = Object.entries(params)
        .map(([k, v]) => `${k}=${v}`)
        .join('&');
    
        // Reconstruct the URL with the modified query string
        const modifiedUrl = newQueryString ? `${baseUrl}?${newQueryString}` : baseUrl;
    
        return modifiedUrl;
    }

    /**
     * Removes a query string parameter from a URL.
     *
     * @param {string} url - The URL to modify.
     * @param {string} key - The parameter key to remove.
     * @returns {string} - The modified URL.
     */
    static removeQueryStringParameter(url, key) {
        // Check if the URL is present
        if (!url || typeof url !== 'string') {
            return url;
        }
    
        // Parse the existing URL to separate the base and query string
        const [baseUrl, queryString] = url.split('?');
        const params = {};
    
        // If there is a query string, parse it into key-value pairs
        if (queryString) {
            const pairs = queryString.split('&');
            for (const pair of pairs) {
                const [existingKey, existingValue] = pair.split('=');
                const decodedKey = decodeURIComponent(existingKey);
                const decodedValue = existingValue ? decodeURIComponent(existingValue) : '';
                params[decodedKey] = decodedValue;
            }
        
            // Remove the specified key from the parameters
            delete params[key];
        }
    
        // Construct the modified query string
        const newQueryString = Object.entries(params)
        .map(([k, v]) => `${k}=${v}`)
        .join('&');
    
        // Reconstruct the URL with the modified query string
        const modifiedUrl = newQueryString ? `${baseUrl}?${newQueryString}` : baseUrl;
    
        return modifiedUrl;
    }

    /**
     * Merges two URLs by combining their components.
     *
     * @param {string} baseURL - The base URL.
     * @param {string} relativeURL - The relative URL to be merged with the base URL.
     *
     * @returns {string} The merged URL.
     */
    static mergeURL(baseURL, relativeURL) {
        // Ensure baseURL is a valid absolute URL
        const base = new URL(baseURL);
    
        // Ensure relativeURL is a valid relative or absolute URL
        const relative = new URL(relativeURL, base);
    
        // Preserve the original query parameters in the relative URL
        relative.search = relative.search || base.search;
    
        // Preserve the original hash/fragment in the relative URL
        relative.hash = relative.hash || base.hash;
    
        return relative.href;
    }
  

    /**
     * Parses a URL into an object.
     * @param {string} url - The URL to parse.
     * @returns {URL} - The URL object.
     */
    static parseURL(url) {
        return new URL(url);
    }

    /**
     * Serializes a URL object into a string.
     * @param {URL} urlObject - The URL object to serialize.
     * @returns {string} - The serialized URL.
     */
    static serializeURL(urlObject) {
        return urlObject.toString();
    }

    /**
     * Checks if a given string is a valid URL.
     * @param {string} url - The URL to validate.
     * @returns {boolean} - True if the URL is valid, false otherwise.
     */
    static isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }
}
