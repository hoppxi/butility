
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */

/**
 * Utility class for advanced color usage.
 * @class Color
 */
export default class Color {
    /**
     * Convert RGB values to Hex color code.
     * @param {number} r - Red value (0-255).
     * @param {number} g - Green value (0-255).
     * @param {number} b - Blue value (0-255).
     * @returns {string} Hex color code.
     */
    static rgbToHex(r, g, b) {
        const toHex = (c) => {
            const hex = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return '#' + toHex(r) + toHex(g) + toHex(b);
    }

    /**
     * Convert Hex color code to RGB values.
     * @param {string} hex - Hex color code.
     * @returns {?{r: number, g: number, b: number}} RGB values or null if invalid input.
     */
    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    /**
     * Convert RGBA values to Hex color code.
     * @param {number} r - Red value (0-255).
     * @param {number} g - Green value (0-255).
     * @param {number} b - Blue value (0-255).
     * @param {number} a - Alpha value (0-1).
     * @returns {string} Hex color code with alpha.
     */
    static rgbaToHex(r, g, b, a) {
        return Color.rgbToHex(r, g, b) + Math.round(a * 255).toString(16).padStart(2, '0');
    }

    /**
     * Convert Hex color code to RGBA string.
     * @param {string} hex - Hex color code.
     * @param {number} a - Alpha value (0-1).
     * @returns {?string} RGBA string or null if invalid input.
     */
    static hexToRgba(hex, a) {
        const rgb = Color.hexToRgb(hex);
        return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})` : null;
    }

    /**
     * Calculate color brightness.
     * @param {string} color - Hex color code.
     * @returns {?number} Color brightness (0-1) or null if invalid input.
     */
    static colorBrightness(color) {
        const rgb = Color.hexToRgb(color);
        return rgb ? (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255 : null;
    }

    /**
     * Calculate color contrast between two colors.
     * @param {string} color1 - Hex color code.
     * @param {string} color2 - Hex color code.
     * @returns {?number} Color contrast (0-1) or null if invalid input.
     */
    static colorContrast(color1, color2) {
        const brightness1 = Color.colorBrightness(color1);
        const brightness2 = Color.colorBrightness(color2);

        if (brightness1 !== null && brightness2 !== null) {
            return Math.abs(brightness1 - brightness2);
        }

        return null;
    }

    /**
     * Generate a random Hex color code.
     * @returns {string} Random Hex color code.
     */
    static generateRandomColor() {
        const randomColorComponent = () => Math.floor(Math.random() * 256);
        return Color.rgbToHex(randomColorComponent(), randomColorComponent(), randomColorComponent());
    }

    /**
     * Darkens a given color by a specified percentage.
     * @param {string} color - The input color (hexadecimal or RGB).
     * @param {number} percentage - The percentage by which to darken the color.
     * @returns {string} The darkened color.
     */
    static darkenColor(color, percentage) {
        const { r, g, b } = Color.hexToRgb(color);
        const factor = 1 - percentage / 100;
        const newR = Math.floor(r * factor);
        const newG = Math.floor(g * factor);
        const newB = Math.floor(b * factor);
        return Color.rgbToHex(newR, newG, newB);
    }
    
    /**
     * Lightens a given color by a specified percentage.
     * @param {string} color - The input color (hexadecimal or RGB).
     * @param {number} percentage - The percentage by which to lighten the color.
     * @returns {string} The lightened color.
     */
    static lightenColor(color, percentage) {
        const { r, g, b } = Color.hexToRgb(color);
        const factor = 1 + percentage / 100;
        const newR = Math.min(Math.floor(r * factor), 255);
        const newG = Math.min(Math.floor(g * factor), 255);
        const newB = Math.min(Math.floor(b * factor), 255);
        return Color.rgbToHex(newR, newG, newB);
    }
    
    /**
     * Calculates the luminance of a given color.
     * @param {string} color - The input color (hexadecimal or RGB).
     * @returns {number} The luminance value.
     */
    static calculateLuminance(color) {
        const { r, g, b } = Color.hexToRgb(color);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }
    
    /**
    * Checks if two colors are equal.
    * @param {string} color1 - The first color (hexadecimal or RGB).
    * @param {string} color2 - The second color (hexadecimal or RGB).
    * @returns {boolean} True if the colors are equal, false otherwise.
    */
    static areColorsEqual(color1, color2) {
        return color1.toLowerCase() === color2.toLowerCase();
    }
    
    /**
    * Converts HSL (Hue, Saturation, Lightness) values to RGB format.
    * @param {number} hue - The hue value (0-360).
    * @param {number} saturation - The saturation value (0-100).
    * @param {number} lightness - The lightness value (0-100).
    * @returns {Object} An object containing the red, green, and blue components.
    */
    static hslToRgb(hue, saturation, lightness) {
        const h = hue / 360;
        const s = saturation / 100;
        const l = lightness / 100;
    
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
    
        const rgb = {
        r: Math.round(Color.hueToRgb(p, q, h + 1 / 3) * 255),
        g: Math.round(Color.hueToRgb(p, q, h) * 255),
        b: Math.round(Color.hueToRgb(p, q, h - 1 / 3) * 255)
        };
    
        return rgb;
    }
    
    static hueToRgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
    
    /**
    * Converts RGB color components to HSL (Hue, Saturation, Lightness) values.
    * @param {number} red - The red component (0-255).
    * @param {number} green - The green component (0-255).
    * @param {number} blue - The blue component (0-255).
    * @returns {Object} An object containing the hue, saturation, and lightness values.
    */
    static rgbToHsl(red, green, blue) {
        const r = red / 255;
        const g = green / 255;
        const b = blue / 255;
    
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
    
        let h, s, l;
    
        if (delta === 0) {
            h = 0;
        } else if (max === r) {
            h = ((g - b) / delta) % 6;
        } else if (max === g) {
            h = (b - r) / delta + 2;
        } else {
            h = (r - g) / delta + 4;
        }
    
        h = Math.round((h * 60 + 360) % 360);
    
        l = (max + min) / 2;
    
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
        s = Math.round(s * 100);
        l = Math.round(l * 100);
    
        return { h, s, l };
    }
    
    /**
    * Mixes two colors together based on a specified weight.
    * @param {string} color1 - The first color (hexadecimal or RGB).
    * @param {string} color2 - The second color (hexadecimal or RGB).
    * @param {number} weight - The weight of the first color in the mixture (0-1).
    * @returns {string} The resulting mixed color.
    */
    static mixColors(color1, color2, weight) {
        const rgb1 = Color.hexToRgb(color1);
        const rgb2 = Color.hexToRgb(color2);
    
        const mixedColor = {
            r: Math.round(rgb1.r * weight + rgb2.r * (1 - weight)),
            g: Math.round(rgb1.g * weight + rgb2.g * (1 - weight)),
            b: Math.round(rgb1.b * weight + rgb2.b * (1 - weight))
        };
    
        return Color.rgbToHex(mixedColor.r, mixedColor.g, mixedColor.b);
    }
    
    /**
    * Generates a gradient of colors between two given colors.
    * @param {string} startColor - The starting color (hexadecimal or RGB).
    * @param {string} endColor - The ending color (hexadecimal or RGB).
    * @param {number} steps - The number of steps in the gradient.
    * @returns {Array} An array of colors representing the gradient.
    */
    static generateColorGradient(startColor, endColor, steps) {
        const gradient = [];
        for (let i = 0; i < steps; i++) {
            const weight = i / (steps - 1);
            const interpolatedColor = Color.mixColors(startColor, endColor, weight);
            gradient.push(interpolatedColor);
        }
        return gradient;
    }
    
    /**
    * Inverts the color by subtracting each RGB component from 255.
    * @param {string} color - The input color (hexadecimal or RGB).
    * @returns {string} The inverted color.
    */
    static invertColor(color) {
        const { r, g, b } = Color.hexToRgb(color);
        const invertedColor = {
            r: 255 - r,
            g: 255 - g,
            b: 255 - b
        };
        return Color.rgbToHex(invertedColor.r, invertedColor.g, invertedColor.b);
    }
}