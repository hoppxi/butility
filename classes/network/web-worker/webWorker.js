
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */

/**
 * Utility functions for working with web workers.
 * @class
 */
export class WebWorker {
    /**
     * Create a new web worker.
     * @param {string} scriptUrl - The URL of the worker script.
     * @returns {Worker} - The created web worker.
     */
    static createWorker(scriptUrl) {
        return new Worker(scriptUrl);
    }

    /**
     * Terminate a web worker.
     * @param {Worker} worker - The web worker to terminate.
     */
    static terminateWorker(worker) {
        worker.terminate();
    }

    /**
     * Post a message to a web worker.
     * @param {Worker} worker - The web worker to send the message to.
     * @param {any} message - The message to post to the worker.
     */
    static postMessageToWorker(worker, message) {
        worker.postMessage(message);
    }

    /**
     * Handle messages from a web worker.
     * @param {Worker} worker - The web worker to listen for messages.
     * @param {Function} callback - The callback function to handle messages.
     */
    static handleWorkerMessage(worker, callback) {
        worker.onmessage = (event) => {
            callback(event.data);
        };
    }
}
