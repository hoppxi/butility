
/**
 * @author - Ermiyas Arage
 * @license MIT
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
        const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipv4Regex.test(ip);
    }

    /**
     * Validates an IPv6 address.
     * @param {string} ip - The IPv6 address to validate.
     * @returns {boolean} - True if the IPv6 address is valid, false otherwise.
     */
    static validateIPv6Address(ip) {
        const ipv6Regex = /^(::(?:[fF]{4}:))(\d+\.\d+\.\d+\.\d+)$/;
        return ipv6Regex.test(ip);
    }


    /**
     * Converts an IPv4 address to IPv6 format.
     * @param {string} ip - The IPv4 address to convert.
     * @returns {string | null} - The IPv6 address derived from the given IPv4 address, or null if the IPv4 is invalid.
     */
    static convertIPv4ToIPv6(ip) {
        if (!this.validateIPv4Address(ip)) {
            console.error("Invalid IPv4 address provided.");
            return null;
        }
        // Split the IPv4 address into its components
        const segments = ip.split('.').map(Number);

        // Convert each segment to hexadecimal and pad it to 2 digits
        const hexSegments = segments.map(segment => segment.toString(16).padStart(2, '0'));

        // Combine the segments into an IPv6-mapped address
        const ipv6 = `::ffff:${hexSegments.join(':')}`;
        return ipv6;
    }

    /**
     * Converts an IPv6 address to IPv4 format.
     * @param {string} ip - The IPv6 address to convert.
     * @returns {string | null} - The IPv4 address derived from the given IPv6 address, or null if the input is not valid.
     */
    static convertIPv6ToIPv4(ip) {
        if (!this.validateIPv6Address(ip)) {
            console.error("Invalid IPv6 address provided.");
            return null;
        }

        const ipv4Regex = /::ffff:([\da-f]{2}):([\da-f]{2}):([\da-f]{2}):([\da-f]{2})/i;
        const match = ip.match(ipv4Regex);

        if (!match) {
            console.error("Not a valid IPv6-mapped IPv4 address.");
            return null;
        }

        // Convert the hexadecimal parts back to decimal
        const ipv4Parts = match.slice(1, 5).map(hex => parseInt(hex, 16));

        // Return the IPv4 address as a dotted decimal string
        const ipv4 = ipv4Parts.join('.');
        return ipv4;
    }

    /**
     * Normalizes an IPv6 address to its full form (e.g., expanding "::" to its full representation).
     * @param {string} ip - The IPv6 address to normalize.
     * @returns {string|null} - The normalized IPv6 address, or null if invalid.
     */
    static normalizeIPv6(ip) { // I put the node js code in try/catch block until i figure out how to do so in the browser
        if (!this.validateIPv6Address(ip)) return null;
    
        // Expand shorthand IPv6 notations like "::" into full notation
        try {
            const segments = ip.split(':');
            let fullSegments = [];

            segments.forEach(segment => {
                if (segment === '') {
                    // Empty segment corresponds to "::" shorthand, fill the gap with zeroes
                    const fillLength = 8 - segments.filter(s => s !== '').length;
                    fullSegments.push(...Array(fillLength).fill('0000'));
                } else {
                    // Pad each segment with leading zeros to ensure 4 characters
                    fullSegments.push(segment.padStart(4, '0'));
                }
            });

            return fullSegments.join(':');
        } catch (e) {
            console.error("Error normalizing IPv6:", e);
            return null;
        }
    }

    /**
     * Determines the version of the given IP address.
     * @param {string} ip - The IP address to check.
     * @returns {4 | 6 | null} - The IP version (4 or 6), or null if invalid.
     */
    static getIPVersion(ip) {
        if (this.validateIPv4Address(ip)) return 4;
        if (this.validateIPv6Address(ip)) return 6;
        return null;
    }

        /**
     * Checks if the provided IP address is private (e.g., from a local network).
     * @param {string} ip - The IP address to check.
     * @returns {boolean} - True if the IP address is private, false otherwise.
     */
    static isPrivateIP(ip) {
        if (!this.validateIPv4Address(ip)) return false;
        const privateRanges = [
            /^10\./, // 10.0.0.0 - 10.255.255.255
            /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 172.16.0.0 - 172.31.255.255
            /^192\.168\./, // 192.168.0.0 - 192.168.255.255
        ];
        return privateRanges.some(range => range.test(ip));
    }

        /**
     * Retrieves the user's IP address (server-side, Node.js).
     * @param {Request} req - The incoming HTTP request object.
     * @returns {string|null} - The IP address of the user, or null if not found.
     */
    static async getUserIPAddress(req) { // I put the node js code with common js syntax until i figure out how to do so in the browser
        try {
            // To get the user's IP address in a browser environment, 
            // it is impossible to directly access low-level network details like in Node.js, 
            // as browsers don't expose this information for security reasons.
            // Instead, we need to use an external API (ipify) to get the public IP address. 
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            const ip = data.ip;

            if (ip && this.validateIPv4Address(ip)) {
                return ip;
            }
            return null;
        } catch (e) {
            console.error("Error fetching IP address:", e);
            return null;
        }
    }

    /**
     * Generates a random valid IPv4 address.
     * @returns {string} - A random IPv4 address.
     */
    static generateRandomIPv4() {
        return Array(4)
            .fill(0)
            .map(() => Math.floor(Math.random() * 256))
            .join('.');
    }

    /**
     * Generates a random IPv6 address.
     * @returns {string} - A randomly generated IPv6 address.
     */
    static generateRandomIPv6() {
        const getRandomHex = () => Math.floor(Math.random() * 65536).toString(16);
        const segments = Array.from({ length: 8 }, getRandomHex);
        return segments.join(':');
    }
    
    /**
     * Validates if a given subnet mask is correct for IPv4.
     * @param {string} mask - The subnet mask to validate.
     * @returns {boolean} - True if the subnet mask is valid, false otherwise.
     */
    static isValidSubnetMask(mask) {
        const validMasks = [
            '255.255.255.255', '255.255.255.254', '255.255.255.252', '255.255.255.248',
            '255.255.255.240', '255.255.255.224', '255.255.255.192', '255.255.255.128',
            '255.255.255.0', '255.255.254.0', '255.255.252.0', '255.255.248.0',
            '255.255.240.0', '255.255.224.0', '255.255.192.0', '255.255.128.0',
            '255.255.0.0', '255.254.0.0', '255.252.0.0', '255.248.0.0',
            '255.240.0.0', '255.224.0.0', '255.192.0.0', '255.128.0.0',
            '255.0.0.0'
        ];
        return validMasks.includes(mask);
    }

    /**
     * Extracts the IP address and subnet mask from CIDR notation.
     * @param {string} cidr - The CIDR notation (e.g., "192.168.0.1/24").
     * @returns {{ ip: string, mask: string } | null} - The extracted IP and subnet mask, or null if invalid.
     */
    static extractFromCIDR(cidr) {
        const cidrRegex = /^([\d\.]+)\/(\d{1,2})$/;
        const match = cidr.match(cidrRegex);

        if (!match || !this.validateIPv4Address(match[1]) || parseInt(match[2]) > 32) return null;

        const ip = match[1];
        const prefixLength = parseInt(match[2]);

        // Calculate the subnet mask from prefix length
        const maskBinary = '1'.repeat(prefixLength).padEnd(32, '0');
        const mask = maskBinary.match(/.{8}/g)?.map(bin => parseInt(bin, 2)).join('.') || '';
        return { ip, mask };
    }

        /**
     * Calculates the network address for a given IP and subnet mask.
     * @param {string} ip - The IP address.
     * @param {string} mask - The subnet mask.
     * @returns {string|null} - The calculated network address, or null if inputs are invalid.
     */
    static calculateNetworkAddress(ip, mask) {
        if (!this.validateIPv4Address(ip) || !this.isValidSubnetMask(mask)) return null;

        const ipSegments = ip.split('.').map(Number);
        const maskSegments = mask.split('.').map(Number);

        // Perform bitwise AND between IP and subnet mask to get network address
        const networkAddress = ipSegments.map((segment, i) => segment & maskSegments[i]);
        return networkAddress.join('.');
    }
    
    /**
     * Checks if two IP addresses are in the same network.
     * @param {string} ip1 - The first IP address.
     * @param {string} ip2 - The second IP address.
     * @param {string} mask - The subnet mask to check with.
     * @returns {boolean} - True if both IPs are in the same network, false otherwise.
     */
    static areIPsInSameNetwork(ip1, ip2, mask) {
        const network1 = this.calculateNetworkAddress(ip1, mask);
        const network2 = this.calculateNetworkAddress(ip2, mask);
        return network1 === network2;
    }

    /**
     * Get the location information based on IP address asynchronously using ipinfo.io.
     * @param {string} ip - The IP address.
     * @param {Function} callback - The callback function to receive the location information.
     */
    static getLocationByIP(ip, callback) {
        const apiUrl = `https://ipinfo.io/${ip}/json`;

        // Make an API request to ipinfo.io
        // And Unless the IP address is bogon, ipinfo returns an object with loc property that can be splited to latt and long
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch geolocation information');
                }
                return response.json();
            })
            .then(data => {
                const location = {
                    latitude: parseFloat(data.loc.split(',')[0]),
                    longitude: parseFloat(data.loc.split(',')[1])
                };

                callback(location);
            })
            .catch(error => {
                console.error('Error fetching geolocation information:', error);
                callback(null);
            });
    }
}
