
/**
 * @author - Ermiyas Arage
 * @license MIT
 */

import { RequestServer } from '../../network/request/server.js';

/**
 * Utility class for working with files.
 * @class
 */
export class File {
    /**
     * Gets the MIME type of a file.
     * @param {File} file - The file to get the MIME type for.
     * @returns {string} - The MIME type of the file.
     */
    static getMimeType(file) {
        return file.type;
    }

    /**
     * Validates whether the file has an allowed file type.
     * @param {File} file - The file to validate.
     * @param {string[]} allowedTypes - An array of allowed MIME types.
     * @returns {boolean} - True if the file type is allowed, false otherwise.
     */
    static validateFileType(file, allowedTypes) {
        const fileType = File.getMimeType(file);
        return allowedTypes.includes(fileType);
    }

    /**
     * Validates whether the file size is within the specified limit.
     * @param {File} file - The file to validate.
     * @param {number} maxSize - The maximum allowed size in bytes.
     * @returns {boolean} - True if the file size is within the limit, false otherwise.
     */
    static validateFileSize(file, maxSize) {
        return file.size <= maxSize;
    }

    /**
     * Uploads a file using a basic XMLHttpRequest without external dependencies.
     * @param {File} file - The file to upload.
     * @param {string} url - The URL to upload the file to.
     * @param {function} progressCallback - A callback function to handle upload progress (optional).
     * @returns {Promise<string>} - A Promise that resolves to the server response.
     */
    static uploadFile(file, url, progressCallback) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);

            RequestServer.post(url, formData, (response) => {
                if (response) {
                    resolve(response);
                } else {
                    reject(new Error('File upload failed'));
                }
            }, progressCallback);
        });
    }

    /**
     * Downloads a file from the server using the RequestServer class.
     * @param {string} fileUrl - The URL for the zip file to be downloaded.
     * @param {string} fileName - The desired name for the downloaded zip file.
     * @returns {Promise<void>} A Promise that resolves once the download is complete.
     */
    static async downloadZip(fileUrl, fileName) {
        return new Promise((resolve, reject) => {
            // Use the RequestServer's GET method to fetch the zip file
            RequestServer.get(fileUrl, {}, (response) => {
                if (response) {
                    const blob = new Blob([response], { type: 'application/zip' });
                    const link = document.createElement('a');
                    
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    link.click();
                    resolve();
                } else {
                    reject(new Error(`Failed to download zip file.`));
                }
            });
        });
    }


    /**
     * Unzips a provided zip file blob and returns an array of extracted files.
     *
     * @param {Blob} zipBlob - The Blob object representing the zip file.
     * @returns {Promise<Array<{ name: string, content: string }>>} A Promise that resolves with an array of objects,
     * each containing the name and content of an extracted file.
     */
    static async unzip(zipBlob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const arrayBuffer = event.target.result;
                const zip = new JSZip();
                
                zip.loadAsync(arrayBuffer)
                    .then((zipFiles) => {
                        const extractedFiles = [];

                        zip.forEach((relativePath, zipEntry) => {
                            zipFiles.file(zipEntry.name).async('string').then((content) => {
                                extractedFiles.push({ name: zipEntry.name, content });
                            });
                        });

                        Promise.all(extractedFiles)
                            .then(() => resolve(extractedFiles))
                            .catch((err) => reject(err));
                    })
                    .catch((err) => reject(new Error(`Failed to unzip the file: ${err.message}`)));
            };

            reader.onerror = () => {
                reject(new Error('Error reading zip file.'));
            };

            reader.readAsArrayBuffer(zipBlob);
        });
    }

    /**
     * Zips an array of text content into a single zip file.
     *
     * @param {Array<{ name: string, content: string }>} files - Array of objects containing the name and content of each file.
     * @param {string} zipFileName - The desired name for the zip file.
     * @returns {Blob} Blob representing the zip file.
     */
    static zip(files, zipFileName) {
        const zipData = [];

        files.forEach((file) => {
            const content = new TextEncoder().encode(file.content);
            zipData.push({
                name: file.name,
                content,
                contentLength: content.length
            });
        });

        const centralDirectory = [];
        let currentOffset = 0;

        zipData.forEach((file) => {
            centralDirectory.push({
                name: file.name,
                offset: currentOffset,
                contentLength: file.contentLength
            });
            currentOffset += file.contentLength;
        });

        const zipArray = [];

        zipData.forEach((file) => {
            const header = new Uint8Array([
                0x50, 0x4b, 0x03, 0x04,       // local file header signature
                0x0A, 0x00,                   // version needed to extract
                0x00, 0x00,                   // general purpose bit flag
                0x00, 0x00,                   // compression method
                0x00, 0x00, 0x00, 0x00,       // file modification time
                0x00, 0x00, 0x00, 0x00,       // file modification date
                0x00, 0x00, 0x00, 0x00,       // CRC-32
                0x00, 0x00, 0x00, 0x00,       // compressed size
                0x00, 0x00, 0x00, 0x00,       // uncompressed size
                file.name.length, 0x00       // file name length
            ]);

            const headerArray = new Uint8Array(header.length + file.name.length);
            headerArray.set(header);
            headerArray.set(new TextEncoder().encode(file.name), header.length);

            const content = new Uint8Array(file.content);

            const fileEntry = new Uint8Array(headerArray.length + content.length);
            fileEntry.set(headerArray);
            fileEntry.set(content, headerArray.length);

            zipArray.push(fileEntry);
        });

        const centralDirectoryArray = [];

        centralDirectory.forEach((file) => {
            const header = new Uint8Array([
                0x50, 0x4b, 0x01, 0x02,       // central file header signature
                0x0A, 0x00,                   // version made by
                0x0A, 0x00,                   // version needed to extract
                0x00, 0x00,                   // general purpose bit flag
                0x00, 0x00,                   // compression method
                0x00, 0x00, 0x00, 0x00,       // file modification time
                0x00, 0x00, 0x00, 0x00,       // file modification date
                0x00, 0x00, 0x00, 0x00,       // CRC-32
                0x00, 0x00, 0x00, 0x00,       // compressed size
                0x00, 0x00, 0x00, 0x00,       // uncompressed size
                file.name.length, 0x00,      // file name length
                0x00, 0x00,                   // extra field length
                0x00, 0x00,                   // file comment length
                0x00, 0x00,                   // disk number start
                0x00, 0x00,                   // internal file attributes
                0x00, 0x00, 0x00, 0x00,       // external file attributes
                file.currentOffset & 0xFF,           // relative offset of local header (lo)
                (file.currentOffset >> 8) & 0xFF,    // relative offset of local header (hi)
            ]);

            const headerArray = new Uint8Array(header.length + file.name.length);
            headerArray.set(header);
            headerArray.set(new TextEncoder().encode(file.name), header.length);

            centralDirectoryArray.push(headerArray);
        });

        const endOfCentralDirectory = new Uint8Array([
            0x50, 0x4b, 0x05, 0x06,           // end of central directory signature
            0x00, 0x00, 0x00, 0x00,           // number of this disk
            0x00, 0x00, 0x00, 0x00,           // number of the disk with the start of the central directory
            centralDirectoryArray.length & 0xFF,  // total number of entries in the central directory on this disk (lo)
            (centralDirectoryArray.length >> 8) & 0xFF,  // total number of entries in the central directory on this disk (hi)
            centralDirectoryArray.length & 0xFF,  // total number of entries in the central directory (lo)
            (centralDirectoryArray.length >> 8) & 0xFF,  // total number of entries in the central directory (hi)
            centralDirectoryArray.reduce((acc, entry) => acc + entry.length, 0) & 0xFFFFFFFF,  // size of the central directory (lo)
            ((centralDirectoryArray.reduce((acc, entry) => acc + entry.length, 0) >> 8) & 0xFFFFFFFF) & 0xFF,  // size of the central directory (hi)
            (offset & 0xFFFFFFFF) & 0xFF,           // offset of start of central directory with respect to the starting disk number (lo)
            ((offset & 0xFFFFFFFF) >> 8) & 0xFF,    // offset of start of central directory with respect to the starting disk number (hi)
            0x00, 0x00                            // .zip file comment length
        ]);

        const zipFile = new Uint8Array(zipArray.reduce((acc, entry) => acc + entry.length, 0) + centralDirectoryArray.reduce((acc, entry) => acc + entry.length, 0) + endOfCentralDirectory.length);

        currentOffset = 0;

        zipArray.forEach((entry) => {
            zipFile.set(entry, currentOffset);
            currentOffset += entry.length;
        });

        centralDirectoryArray.forEach((entry) => {
            zipFile.set(entry, currentOffset);
            currentOffset += entry.length;
        });

        zipFile.set(endOfCentralDirectory, currentOffset);

        const zipBlob = new Blob([zipFile], { type: 'application/zip' });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(zipBlob);
        link.download = zipFileName;
        link.click();

        return zipBlob;
    }


    
}
