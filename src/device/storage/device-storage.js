/**
 * @author - Ermiyas Arage
 * @license MIT
 */

/**
 * Utility class for manipulating device storage.
 * @class
 */
export class DeviceStorage {
    /**
     * Get the total storage capacity of the device.
     * @returns {Promise<{bytes: number, humanReadable: string}>} - A promise that resolves with the total storage capacity in bytes and a human-readable format.
     */
    static async getTotalStorageCapacity() {
        const storageInfo = await navigator.storage.estimate();
        return {
            bytes: storageInfo.quota,
            readable: this.bytesToHumanReadable(storageInfo.quota)
        };
    }
  
    /**
     * Get the used storage space on the device.
     * @returns {Promise<{bytes: number, humanReadable: string}>} - A promise that resolves with the used storage space in bytes and a human-readable format.
     */
    static async getUsedStorageSpace() {
        const storageInfo = await navigator.storage.estimate();
        return {
            bytes: storageInfo.usage,
            readable: this.bytesToHumanReadable(storageInfo.usage)
        };
    }
  
    /**
     * Get the available storage space on the device.
     * @returns {Promise<{bytes: number, humanReadable: string}>} - A promise that resolves with the available storage space in bytes and a human-readable format.
     */
    static async getAvailableStorageSpace() {
        const storageInfo = await navigator.storage.estimate();
        const availableSpace = storageInfo.quota - storageInfo.usage;
        return {
            bytes: availableSpace,
            readable: this.bytesToHumanReadable(availableSpace)
        };
    }
  
    /**
     * Check if there is enough free space on the device for a given amount.
     * @param {number} requiredSpace - The required space in bytes.
     * @returns {Promise<{hasEnough: boolean, availableSpace: {bytes: number, humanReadable: string}}>} - A promise that resolves with a boolean indicating if there is enough free space and details about available space.
     */
    static async hasEnoughFreeSpace(requiredSpace) {
        const availableSpaceInfo = await this.getAvailableStorageSpace();
        return {
            hasEnough: availableSpaceInfo.bytes >= requiredSpace,
            availableSpace: availableSpaceInfo
        };
    }

    /**
     * Get the storage type of the device (e.g., 'temporary', 'persistent').
     * @returns {Promise<string>} - A promise that resolves with the storage type.
     */
    static async getStorageType() {
        const persisted = await navigator.storage.persisted();
        return persisted ? 'persistent' : 'temporary';
    }

    /**
     * Request persistent storage on the device.
     * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating if the request was successful.
     */
    static async requestPersistentStorage() {
        if (navigator.storage && navigator.storage.persist) {
            const granted = await navigator.storage.persist();
            return granted === true;
        }
        return false;
    }

    /**
     * Get the default quota for persistent storage.
     * @returns {Promise<{quota: number, humanReadable: string}>} - A promise that resolves with the default quota for persistent storage in bytes and a human-readable format.
     */
    static async getDefaultPersistentStorageQuota() {
        const persisted = await navigator.storage.persisted();
        if (persisted) {
            return {
                quota: await navigator.storage.persist(),
                readable: 'Persistent storage is granted with no specific quota'
            };
        }
        return {
            quota: -1,
            readable: 'Persistent storage is not granted'
        };
    }

    /**
     * Convert bytes to a human-readable format.
     * @param {number} bytes - The size in bytes.
     * @returns {string} - The size in a human-readable format.
     */
    static bytesToHumanReadable(bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
}
