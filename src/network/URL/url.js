/**
 * @author - Ermiyas Arage
 * @license MIT
 */

/**
 * Utility class for working with URLs.
 * @class
 */
export class URLUtility {
    /**
     * Parses a query string and returns an object containing the parameters.
     *
     * @param {string} queryString - The query string to parse.
     * @param {boolean} [decode=true] - Whether to decode the parameters.
     * @returns {object} - An object containing key-value pairs of parameters.
     */
    static parseQueryStringParameters(queryString, decode = true) {
        const params = {};
    
        if (!queryString || typeof queryString !== 'string') {
            return params;
        }
    
        queryString = queryString.startsWith('?') ? queryString.slice(1) : queryString;
    
        const pairs = queryString.split('&');
    
        for (const pair of pairs) {
            const [key, value] = pair.split('=');
            const decodedKey = decode ? decodeURIComponent(key) : key;
            const decodedValue = value ? (decode ? decodeURIComponent(value) : value) : '';
    
            if (params.hasOwnProperty(decodedKey)) {
                if (Array.isArray(params[decodedKey])) {
                    params[decodedKey].push(decodedValue);
                } else {
                    params[decodedKey] = [params[decodedKey], decodedValue];
                }
            } else {
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
     * @param {boolean} [encode=true] - Whether to encode the parameter.
     * @returns {string} - The modified URL.
     */
    static replaceQueryStringParameter(url, key, value, encode = true) {
        if (!url || typeof url !== 'string') {
            return url;
        }
    
        const [baseUrl, queryString] = url.split('?');
        const params = {};
    
        if (queryString) {
            const pairs = queryString.split('&');
            for (const pair of pairs) {
                const [existingKey, existingValue] = pair.split('=');
                const decodedKey = decodeURIComponent(existingKey);
                const decodedValue = existingValue ? decodeURIComponent(existingValue) : '';
                params[decodedKey] = decodedValue;
            }
        }
    
        const keyToUse = encode ? encodeURIComponent(key) : key;
        const valueToUse = encode ? encodeURIComponent(value) : value;
    
        params[keyToUse] = valueToUse;
    
        const newQueryString = Object.entries(params)
            .map(([k, v]) => `${k}=${v}`)
            .join('&');
    
        return newQueryString ? `${baseUrl}?${newQueryString}` : baseUrl;
    }

    /**
     * Removes a query string parameter from a URL.
     *
     * @param {string} url - The URL to modify.
     * @param {string} key - The parameter key to remove.
     * @returns {string} - The modified URL.
     */
    static removeQueryStringParameter(url, key) {
        if (!url || typeof url !== 'string') {
            return url;
        }
    
        const [baseUrl, queryString] = url.split('?');
        const params = {};
    
        if (queryString) {
            const pairs = queryString.split('&');
            for (const pair of pairs) {
                const [existingKey, existingValue] = pair.split('=');
                const decodedKey = decodeURIComponent(existingKey);
                const decodedValue = existingValue ? decodeURIComponent(existingValue) : '';
                params[decodedKey] = decodedValue;
            }
        
            delete params[key];
        }
    
        const newQueryString = Object.entries(params)
            .map(([k, v]) => `${k}=${v}`)
            .join('&');
    
        return newQueryString ? `${baseUrl}?${newQueryString}` : baseUrl;
    }

    /**
     * Merges two URLs by combining their components.
     *
     * @param {string} baseURL - The base URL.
     * @param {string} relativeURL - The relative URL to be merged with the base URL.
     * @returns {string} - The merged URL.
     */
    static mergeURL(baseURL, relativeURL) {
        const base = new URL(baseURL);
        const relative = new URL(relativeURL, base);
        relative.search = relative.search || base.search;
        relative.hash = relative.hash || base.hash;
    
        return relative.href;
    }

    /**
     * Normalizes a URL by removing redundant parts and standardizing the format.
     *
     * @param {string} url - The URL to normalize.
     * @returns {string} - The normalized URL.
     */
    static normalizeURL(url) {
        try {
            const normalized = new URL(url);
            normalized.hash = normalized.hash.replace(/#$/, ''); // Remove trailing hash symbol
            return normalized.href;
        } catch (error) {
            console.error('Invalid URL provided for normalization:', error);
            return url;
        }
    }

    /**
     * Extracts and decodes the fragment (hash) portion of a URL.
     *
     * @param {string} url - The URL containing the fragment.
     * @returns {string} - The decoded fragment.
     */
    static extractFragment(url) {
        try {
            const fragment = new URL(url).hash.substring(1); // Remove the leading #
            return decodeURIComponent(fragment);
        } catch {
            console.error('Failed to extract or decode fragment from URL:', url);
            return '';
        }
    }

    /**
     * Constructs a URL with the specified base, path, and query parameters.
     *
     * @param {string} base - The base URL.
     * @param {string} path - The path to append to the base URL.
     * @param {object} [queryParams={}] - An object of query parameters to add.
     * @returns {string} - The constructed URL.
     */
    static constructURL(base, path = '', queryParams = {}) {
        try {
            const url = new URL(base);
            if (path) url.pathname = path;
            Object.entries(queryParams).forEach(([key, value]) => {
                url.searchParams.set(key, value);
            });
            return url.href;
        } catch (error) {
            console.error('Error constructing URL:', error);
            return '';
        }
    }
}
