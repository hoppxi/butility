
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */

import { DetectFeature } from "./features.js";

/**
 * Utility class for retrieving various user environment information.
 * @class - GetUtils
 */
export class EnvInfo {
    /**
     * Get the browser window size.
     * @returns {Object} - An object with 'width' and 'height' properties representing the window size.
     */
    static getBrowserWindowSize() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        };
    }

    /**
     * Get the screen resolution.
     * @returns {Object} - An object with 'width' and 'height' properties representing the screen resolution.
     */
    static getScreenResolution() {
        return {
            width: screen.width,
            height: screen.height
        };
    }

    /**
     * Get the battery status asynchronously.
     * @param {Function} callback - The callback function to receive the battery status.
     */
    static getBatteryStatus(callback) {
        if (DetectFeature.detectBatteryAPI()) {
            navigator.getBattery().then((battery) => {
                callback({
                    level: battery.level,
                    charging: battery.charging,
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime
                });
            });
        } else {
            callback(null);
        }
    }

    /**
     * Get the network status asynchronously.
     * @param {Function} callback - The callback function to receive the network status.
     */
    static getNetworkStatus(callback) {
        if ('onLine' in navigator) {
            callback(navigator.onLine);
        } else {
            callback(null);
        }
    }

    /**
     * Get the device orientation asynchronously.
     * @param {Function} callback - The callback function to receive the device orientation.
     */
    static getDeviceOrientation(callback) {
        if (DetectFeature.detectOrientationAPI()) {
            window.addEventListener('deviceorientation', (event) => {
                callback({
                    alpha: event.alpha,
                    beta: event.beta,
                    gamma: event.gamma
                });
            });
        } else {
            callback(null);
        }
    }

    /**
     * Get the device motion asynchronously.
     * @param {Function} callback - The callback function to receive the device motion.
     */
    static getDeviceMotion(callback) {
        if ('DeviceMotionEvent' in window) {
            window.addEventListener('devicemotion', (event) => {
                callback({
                    acceleration: event.acceleration,
                    accelerationIncludingGravity: event.accelerationIncludingGravity,
                    rotationRate: event.rotationRate
                });
            });
        } else {
            callback(null);
        }
    }

    /**
     * Get the available media devices asynchronously.
     * @param {Function} callback - The callback function to receive the media devices.
     */
    static getMediaDevices(callback) {
        if ('navigator' in window && 'mediaDevices' in navigator) {
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                callback(devices);
            }).catch(() => {
                callback(null);
            });
        } else {
            callback(null);
        }
    }

    /**
     * Get the location information based on IP address asynchronously using ipinfo.io.
     * @param {string} ip - The IP address.
     * @param {Function} callback - The callback function to receive the location information.
     */
    static getLocationByIP(ip, callback) {
        // Replace {ip} with the actual IP address
        const apiUrl = `https://ipinfo.io/${ip}/json`;

        // Make an API request to ipinfo.io
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch geolocation information');
                }
                return response.json();
            })
            .then(data => {
                // Assuming the ipinfo.io response provides latitude and longitude information
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

    /**
     * Get the geolocation asynchronously.
     * @param {Function} callback - The callback function to receive the geolocation.
     */
    static getGeolocation(callback) {
        if (DetectFeature.detectGeolocationAPI()) {
            navigator.geolocation.getCurrentPosition((position) => {
                callback({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, () => {
                callback(null);
            });
        } else {
            callback(null);
        }
    }
}
