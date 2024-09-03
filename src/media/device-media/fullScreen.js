
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */

/**
 * Utility class for working with fullscreen functionality.
 * @class
 */
export class FullScreen {
    /**
     * Detects whether fullscreen mode is supported in the current browser.
     * @returns {boolean} - True if fullscreen is supported, false otherwise.
     */
    static detectFullscreenSupport() {
        return (
            document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled
        );
    }

    /**
     * Enters fullscreen mode for the specified element.
     * @param {Element} element - The HTML element to enter fullscreen.
     */
    static enterFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    /**
     * Exits fullscreen mode.
     */
    static exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    /**
     * Gets the element currently in fullscreen mode.
     * @returns {Element|null} - The element in fullscreen, or null if no element is in fullscreen.
     */
    static getFullscreenElement() {
        return (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement ||
            null
        );
    }
}