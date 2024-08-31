
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */

/**
 * Utility class for working with IP addresses in both IPv4 and IPv6 formats.
 * @class
 */
export class IP {
    /**
     * Validates an IPv4 address.
     * @param {string} ip - The IPv4 address to validate.
     * @returns {boolean} - True if the IPv4 address is valid, false otherwise.
     */
    static validateIPv4Address(ip) {
        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
        return ipv4Regex.test(ip);
    }

    /**
     * Validates an IPv6 address.
     * @param {string} ip - The IPv6 address to validate.
     * @returns {boolean} - True if the IPv6 address is valid, false otherwise.
     */
    static validateIPv6Address(ip) {
        const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
        return ipv6Regex.test(ip);
    }

    /**
     * Converts an IPv4 address to IPv6 format.
     * @param {string} ip - The IPv4 address to convert.
     * @returns {string} - The IPv6 address derived from the given IPv4 address.
     */
    static convertIPv4ToIPv6(ip) {
        // Assuming a simple IPv4 to IPv6 conversion by adding IPv6 prefix
        return `::ffff:${ip}`;
    }

    /**
     * Converts an IPv6 address to IPv4 format.
     * @param {string} ip - The IPv6 address to convert.
     * @returns {string|null} - The IPv4 address derived from the given IPv6 address,
     *                          or null if the input is not a valid IPv6 address with an IPv4 prefix.
     */
    static convertIPv6ToIPv4(ip) {
        // Assuming a simple IPv6 to IPv4 conversion by removing IPv6 prefix
        const ipv4Regex = /::ffff:(\d+\.\d+\.\d+\.\d+)/;
        const match = ip.match(ipv4Regex);
        return match ? match[1] : null;
    }
}
