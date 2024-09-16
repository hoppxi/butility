

/**
 * @author - Ermiyas Arage
 * @license MIT
 */

/**
 * A utility class that integrates with Bluetooth, USB, WiFi, Speech Synthesis, and Clipboard APIs.
 * @class
 */
export class DeviceAPIs {

    /**
     * Request a Bluetooth device and return it.
     * @param {object} filters - Filters to match the device.
     * @returns {Promise<BluetoothDevice>} - A promise that resolves with the Bluetooth device.
     */
    static async requestBluetoothDevice(filters = []) {
        if (!('bluetooth' in navigator)) {
            throw new Error('Bluetooth API is not supported.');
        }
        try {
            return await navigator.bluetooth.requestDevice({ filters });
        } catch (error) {
            throw new Error(`Bluetooth device request failed: ${error.message}`);
        }
    }

    /**
     * Request a USB device and return it.
     * @returns {Promise<USBDevice>} - A promise that resolves with the USB device.
     */
    static async requestUSBDevice() {
        if (!('usb' in navigator)) {
            throw new Error('USB API is not supported.');
        }
        try {
            return await navigator.usb.requestDevice({ filters: [] });
        } catch (error) {
            throw new Error(`USB device request failed: ${error.message}`);
        }
    }

    /**
     * Get the current WiFi status (mocked as WiFi API is not standardized yet).
     * @returns {Promise<string>} - A promise that resolves with the WiFi status.
     */
    static async getWiFiStatus() {
        if (!('wifi' in navigator)) {
            throw new Error('WiFi API is not supported.');
        }
        // Mocked response since the WiFi API is not standardized
        return 'WiFi status retrieval is not available in standard API.';
    }

    /**
     * Synthesize speech from text.
     * @param {string} text - The text to synthesize.
     * @param {object} [options] - Optional settings for the speech synthesis.
     * @returns {void}
     */
    static synthesizeSpeech(text, options = {}) {
        if (!('speechSynthesis' in window)) {
            throw new Error('Speech Synthesis API is not supported.');
        }
        const utterance = new SpeechSynthesisUtterance(text);
        for (const [key, value] of Object.entries(options)) {
            if (utterance[key] !== undefined) {
                utterance[key] = value;
            }
        }
        window.speechSynthesis.speak(utterance);
    }

    /**
     * Checks if the Clipboard API is available.
     * @returns {boolean} - True if the Clipboard API is available.
     */
    static isClipboardSupported() {
        return navigator.clipboard && 'writeText' in navigator.clipboard;
    }

    /**
     * Write text to the clipboard.
     * @param {string} text - The text to write to the clipboard.
     * @returns {Promise<void>} - A promise that resolves when the text is written.
     */
    static async writeToClipboard(text) {
        if (!this.isClipboardSupported()) {
            throw new Error('Clipboard API is not supported.');
        }
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            throw new Error(`Failed to write to clipboard: ${error.message}`);
        }
    }

    /**
     * Read text from the clipboard.
     * @returns {Promise<string>} - A promise that resolves with the text from the clipboard.
     */
    static async readFromClipboard() {
        if (!this.isClipboardSupported()) {
            throw new Error('Clipboard API is not supported.');
        }
        try {
            return await navigator.clipboard.readText();
        } catch (error) {
            throw new Error(`Failed to read from clipboard: ${error.message}`);
        }
    }
}
