/**
 * @author - Ermiyas Arage
 * @license MIT
 */

/**
 * Utility class for managing service workers.
 * @class
 */
export class ServiceWorkerManager {
    /**
     * Registers a service worker.
     *
     * @param {string} url - The URL of the service worker script.
     * @param {object} options - Optional registration options.
     * @returns {Promise<ServiceWorkerRegistration>} - A promise that resolves to the service worker registration.
     */
    static registerServiceWorker(url, options = {}) {
        if (!('serviceWorker' in navigator)) {
            throw new Error('Service workers are not supported in this browser.');
        }

        return navigator.serviceWorker.register(url, options)
            .then(registration => {
                console.log(`Service worker registered with scope: ${registration.scope}`);
                return registration;
            })
            .catch(error => {
                console.error(`Service worker registration failed: ${error}`);
                throw error;
            });
    }

    /**
     * Unregisters a service worker by its registration scope.
     *
     * @param {string} scope - The scope of the service worker to unregister.
     * @returns {Promise<boolean>} - A promise that resolves to true if the service worker was unregistered, false otherwise.
     */
    static unregisterServiceWorker(scope) {
        if (!('serviceWorker' in navigator)) {
            throw new Error('Service workers are not supported in this browser.');
        }

        return navigator.serviceWorker.getRegistrations()
            .then(registrations => {
                const registration = registrations.find(reg => reg.scope === scope);
                if (registration) {
                    return registration.unregister()
                        .then(success => {
                            console.log(`Service worker unregistered with scope: ${scope}`);
                            return success;
                        });
                } else {
                    console.warn(`No service worker found with scope: ${scope}`);
                    return false;
                }
            })
            .catch(error => {
                console.error(`Service worker unregistration failed: ${error}`);
                throw error;
            });
    }

    /**
     * Checks if a service worker is currently active.
     *
     * @param {string} scope - The scope of the service worker to check.
     * @returns {Promise<boolean>} - A promise that resolves to true if the service worker is active, false otherwise.
     */
    static isServiceWorkerActive(scope) {
        if (!('serviceWorker' in navigator)) {
            throw new Error('Service workers are not supported in this browser.');
        }

        return navigator.serviceWorker.getRegistrations()
            .then(registrations => {
                const registration = registrations.find(reg => reg.scope === scope);
                return registration && registration.active ? true : false;
            })
            .catch(error => {
                console.error(`Failed to check service worker status: ${error}`);
                throw error;
            });
    }

    /**
     * Posts a message to all service workers with a specific scope.
     *
     * @param {string} scope - The scope of the service workers to message.
     * @param {object} message - The message to send.
     * @returns {Promise<void>} - A promise that resolves when all messages have been sent.
     */
    static postMessageToServiceWorkers(scope, message) {
        if (!('serviceWorker' in navigator)) {
            throw new Error('Service workers are not supported in this browser.');
        }

        return navigator.serviceWorker.getRegistrations()
            .then(registrations => {
                const registrationsInScope = registrations.filter(reg => reg.scope === scope);
                registrationsInScope.forEach(reg => {
                    if (reg.active) {
                        reg.active.postMessage(message);
                    }
                });
            })
            .catch(error => {
                console.error(`Failed to post message to service workers: ${error}`);
                throw error;
            });
    }

    /**
     * Updates all service workers with a specific scope.
     *
     * @param {string} scope - The scope of the service workers to update.
     * @returns {Promise<void>} - A promise that resolves when all service workers have been updated.
     */
    static updateServiceWorkers(scope) {
        if (!('serviceWorker' in navigator)) {
            throw new Error('Service workers are not supported in this browser.');
        }

        return navigator.serviceWorker.getRegistrations()
            .then(registrations => {
                const registrationsInScope = registrations.filter(reg => reg.scope === scope);
                return Promise.all(
                    registrationsInScope.map(reg => reg.update())
                ).then(() => {
                    console.log(`All service workers with scope ${scope} have been updated.`);
                });
            })
            .catch(error => {
                console.error(`Failed to update service workers: ${error}`);
                throw error;
            });
    }

    /**
     * Retrieves the state of all service workers.
     *
     * @returns {Promise<Array<object>>} - A promise that resolves to an array of objects containing service worker state information.
     */
    static getServiceWorkerStates() {
        if (!('serviceWorker' in navigator)) {
            throw new Error('Service workers are not supported in this browser.');
        }

        return navigator.serviceWorker.getRegistrations()
            .then(registrations => {
                return registrations.map(reg => ({
                    scope: reg.scope,
                    state: reg.active ? 'active' : 'inactive',
                    updateState: reg.waiting ? 'waiting' : 'updating'
                }));
            })
            .catch(error => {
                console.error(`Failed to retrieve service worker states: ${error}`);
                throw error;
            });
    }
}
