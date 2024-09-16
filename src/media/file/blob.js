
/**
 * @author - Ermiyas Arage
 * @license MIT
 */


/**
 * Utility class for working with Blobs.
 * @class
 */
export class Blob {
    /**
     * Converts a base64-encoded string to a Blob with enhanced error handling and optional progress tracking.
     * @param {string} base64 - The base64-encoded string.
     * @param {string} contentType - The content type of the Blob (e.g., 'image/jpeg').
     * @param {Function} [onProgress] - Optional callback function to track progress (range: 0 to 1).
     * @returns {Blob} - The Blob created from the base64 string.
     */
    static convertBase64ToBlob(base64, contentType, onProgress = null) {
        try {
            const byteCharacters = atob(base64);
            const byteNumbers = new Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
                if (onProgress) onProgress(i / byteCharacters.length);
            }

            const byteArray = new Uint8Array(byteNumbers);
            return new Blob([byteArray], { type: contentType });
        } catch (error) {
            throw new Error(`Failed to convert base64 to Blob: ${error.message}`);
        }
    }

    /**
     * Asynchronously converts a Blob to a base64-encoded string, with error handling and optional progress tracking.
     * @param {Blob} blob - The Blob to convert to base64.
     * @param {Function} [onProgress] - Optional callback function to track progress (range: 0 to 1).
     * @returns {Promise<string>} - A promise that resolves to the base64 string.
     */
    static async convertBlobToBase64(blob, onProgress = null) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onprogress = (event) => {
                if (event.lengthComputable && onProgress) {
                    onProgress(event.loaded / event.total);
                }
            };
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = () => reject(new Error('Failed to convert Blob to base64'));
            reader.readAsDataURL(blob);
        });
    }

    /**
     * Initiates a download of a Blob as a file, supporting optional MIME type fallback.
     * @param {Blob} blob - The Blob to download.
     * @param {string} filename - The name to be given to the downloaded file.
     * @param {string} [fallbackContentType] - Optional fallback content type if the Blob has none.
     */
    static downloadBlob(blob, filename, fallbackContentType = 'application/octet-stream') {
        const contentType = blob.type || fallbackContentType;
        const url = URL.createObjectURL(new Blob([blob], { type: contentType }));
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    /**
     * Converts a plain text string into a Blob with the specified encoding.
     * @param {string} text - The plain text string to convert.
     * @param {string} [encoding='utf-8'] - The character encoding for the text (default: utf-8).
     * @returns {Blob} - The Blob containing the text.
     */
    static textToBlob(text, encoding = 'utf-8') {
        const encoder = new TextEncoder(encoding);
        const uint8Array = encoder.encode(text);
        return new Blob([uint8Array], { type: `text/plain;charset=${encoding}` });
    }

    /**
     * Merges multiple Blobs into a single Blob, with optional custom content type and buffer size.
     * @param {Blob[]} blobs - An array of Blobs to merge.
     * @param {string} [contentType='application/octet-stream'] - The content type of the merged Blob.
     * @param {number} [bufferSize=1024] - Optional buffer size to optimize memory during merge.
     * @returns {Blob} - The merged Blob.
     */
    static mergeBlobs(blobs, contentType = 'application/octet-stream', bufferSize = 1024) {
        const blobBuffers = blobs.map(blob => blob.slice(0, bufferSize));
        return new Blob(blobBuffers, { type: contentType });
    }

    /**
     * Encrypts the content of a Blob using a given key and returns an encrypted Blob.
     * @param {Blob} blob - The Blob to encrypt.
     * @param {CryptoKey} key - The encryption key (use SubtleCrypto API to generate).
     * @returns {Promise<Blob>} - The encrypted Blob.
     */
    static async encryptBlob(blob, key) {
        const arrayBuffer = await blob.arrayBuffer();
        const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV for AES-GCM
        const encryptedData = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            arrayBuffer
        );
        return new Blob([iv, encryptedData], { type: blob.type });
    }

    /**
     * Decrypts an encrypted Blob using a given key.
     * @param {Blob} encryptedBlob - The encrypted Blob to decrypt.
     * @param {CryptoKey} key - The decryption key.
     * @returns {Promise<Blob>} - The decrypted Blob.
     */
    static async decryptBlob(encryptedBlob, key) {
        const arrayBuffer = await encryptedBlob.arrayBuffer();
        const iv = arrayBuffer.slice(0, 12); // Extract IV from the first 12 bytes
        const encryptedData = arrayBuffer.slice(12); // Rest is encrypted content

        const decryptedData = await window.crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: new Uint8Array(iv) },
            key,
            encryptedData
        );
        return new Blob([decryptedData], { type: encryptedBlob.type });
    }

    /**
     * Splits a Blob into smaller chunks.
     * @param {Blob} blob - The Blob to split.
     * @param {number} chunkSize - The size of each chunk in bytes.
     * @returns {Blob[]} - An array of Blob chunks.
     */
    static chunkBlob(blob, chunkSize) {
        const chunks = [];
        let offset = 0;

        while (offset < blob.size) {
            const chunk = blob.slice(offset, offset + chunkSize);
            chunks.push(chunk);
            offset += chunkSize;
        }

        return chunks;
    }

    /**
     * Reads a Blob as text using a specified encoding, with optional error handling.
     * @param {Blob} blob - The Blob to read as text.
     * @param {string} [encoding='utf-8'] - The encoding of the text (default: utf-8).
     * @returns {Promise<string>} - A promise that resolves to the text content of the Blob.
     */
    static async readBlobAsText(blob, encoding = 'utf-8') {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Failed to read Blob as text'));
            reader.readAsText(blob, encoding);
        });
    }

    /**
     * Verifies if a Blob's size and content type meet specified conditions.
     * @param {Blob} blob - The Blob to verify.
     * @param {Object} conditions - Conditions to check (size, type).
     * @param {number} [conditions.maxSize] - Maximum size allowed for the Blob (in bytes).
     * @param {string[]} [conditions.allowedTypes] - Array of allowed MIME types.
     * @returns {boolean} - True if Blob meets the conditions, false otherwise.
     */
    static verifyBlob(blob, { maxSize, allowedTypes } = {}) {
        if (maxSize && blob.size > maxSize) {
            return false;
        }
        if (allowedTypes && !allowedTypes.includes(blob.type)) {
            return false;
        }
        return true;
    }

    /**
     * Converts a Blob to a hexadecimal string representation.
     * @param {Blob} blob - The Blob to convert.
     * @returns {Promise<string>} - A promise that resolves to the hexadecimal string.
     */
    static async blobToHex(blob) {
        const arrayBuffer = await blob.arrayBuffer();
        const byteArray = new Uint8Array(arrayBuffer);
        const hexString = Array.from(byteArray)
            .map(byte => byte.toString(16).padStart(2, '0'))
            .join('');
        return hexString;
    }
}

