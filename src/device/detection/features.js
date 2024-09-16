 
/**
 * @author - Ermiyas Arage
 * @license MIT
 */


/**
 * Class for detecting various browser features and APIs.
 * @class
 */
export class DetectFeature { 
    
    /**
     * Detects the presence of ad blockers.
     * @returns {boolean} True if an ad blocker is detected, false otherwise.
     */
    static detectAdBlocker() {
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        document.body.appendChild(testAd);

        // Check if the test ad element is hidden
        const isAdBlocked = testAd.offsetHeight === 0;

        // Remove the test ad element
        document.body.removeChild(testAd);

        return isAdBlocked;
    }

    /**
     * Detects WebGL support in the browser.
     * @returns {boolean} True if WebGL is supported, false otherwise.
     */
    static detectWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
          if (context) {
                // WebGL is supported
                return true;
          } else {
                // WebGL is not supported
                return false;
          }
        } catch (error) {
            // An error occurred during WebGL context creation, indicating lack of support
            return false;
        }
    }

    /**
     * Detects WebP image format support.
     * @returns {Promise<boolean>} A promise that resolves to true if WebP is supported, false otherwise.
     */
    static detectWebP() {
        return new Promise((resolve) => {
            const img = new Image();

            img.onload = function() {
                // If the image loaded successfully, it means WebP is supported
                resolve(true);
            };

            img.onerror = function() {
                // If there was an error loading the image, it means WebP is not supported
                resolve(false);
            };

            // Set the image source to a WebP image URL
            img.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4IBYAAAAwAQCdASoBAAEAAAB5IHpF5GAAAABJ6AA/AJYAAQAAAP8AAAABAAABAAEAAAABAAAAAQAAAAEAAAABAAgAAwAAPwAA';

            // Ensure the image is not added to the DOM
            img.style.display = 'none';
        });
    }

    /**
     * Detects if cookies are enabled in the browser.
     * @returns {boolean} True if cookies are enabled, false otherwise.
     */
    static detectCookiesEnabled() {
        const testCookieName = 'testCookie';
        const testCookieValue = 'testValue';
    
        // Set the test cookie
        document.cookie = `${testCookieName}=${testCookieValue}; path=/`;
    
        // Check if the test cookie is set and has the expected value
        const cookiesEnabled = document.cookie.indexOf(testCookieName + '=' + testCookieValue) !== -1;
    
        // Remove the test cookie
        document.cookie = `${testCookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    
        return cookiesEnabled;
    }

    /**
     * Detects if the Do Not Track (DNT) header is enabled.
     * @returns {boolean} True if Do Not Track is enabled, false otherwise.
     */
    static detectDoNotTrack() {
        // Check if the Do Not Track header is present and enabled
        if (navigator.doNotTrack === '1' || window.doNotTrack === '1') {
            return true; // Do Not Track is enabled
        } else {
            return false; // Do Not Track is not enabled
        }
    }

    /**
     * Detects if local storage is supported in the browser.
     * @returns {boolean} True if local storage is supported, false otherwise.
     */
    static detectLocalStorage() {
        try {
            // Attempt to access local storage
            const testKey = '__testKey__';
            localStorage.setItem(testKey, 'testValue');
            localStorage.removeItem(testKey);

            return true; // Local storage is supported
        } catch (e) {
            return false; // Local storage is not supported or disabled
        }
    }

    /**
     * Detects if session storage is supported in the browser.
     * @returns {boolean} True if session storage is supported, false otherwise.
     */
    static detectSessionStorage() {
        try {
            // Attempt to access session storage
            const testKey = '__testKey__';
            sessionStorage.setItem(testKey, 'testValue');
            sessionStorage.removeItem(testKey);

            return true; // Session storage is supported
        } catch (e) {
            return false; // Session storage is not supported or disabled
        }
    }

    /**
     * Detects if WebSockets are supported in the browser.
     * @returns {boolean} True if WebSockets are supported, false otherwise.
     */
    static detectWebSockets() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    }

    /**
     * Detects if SVG support is available in the browser.
     * @returns {boolean} True if SVG is supported, false otherwise.
     */
    static detectSVGSupport() {
        return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
    }

    /**
     * Detects if inline SVG support is available in the browser.
     * @returns {boolean} True if inline SVG is supported, false otherwise.
     */
    static detectInlineSVGSupport() {
        const div = document.createElement('div');
        div.innerHTML = '<svg></svg>';
        return div.firstChild && div.firstChild.namespaceURI === 'http://www.w3.org/2000/svg';
    }

    /**
     * Detects if Canvas is supported in the browser.
     * @returns {boolean} True if Canvas is supported, false otherwise.
     */
    static detectCanvasSupport() {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext && canvas.getContext('2d'));
    }


    /**
     * Detects audio format support in the browser.
     * @returns {boolean} True if audio format is supported, false otherwise.
     */
    static detectAudioFormatSupport() {
        const audio = document.createElement('audio');
        return !!(audio.canPlayType && audio.canPlayType('audio/mpeg;').replace(/no/, ''));
    }

    /**
     * Detects video format support in the browser.
     * @returns {boolean} True if video format is supported, false otherwise.
     */
    static detectVideoFormatSupport() {
        const video = document.createElement('video');
        return !!(video.canPlayType && video.canPlayType('video/mp4;').replace(/no/, ''));
    }

    /**
     * Detects Speech Recognition API support in the browser.
     *
     * @returns {boolean} True if Speech Recognition API is supported, false otherwise.
     */
    static detectSpeechRecognitionAPI() {
        return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    }

    /**
     * Detects WebRTC support in the browser.
     *
     * @returns {boolean} True if WebRTC is supported, false otherwise.
     */
    static detectWebRTC() {
        return 'RTCPeerConnection' in window || 'mozRTCPeerConnection' in window || 'webkitRTCPeerConnection' in window;
    }

    /**
     * Detects Retina Display support in the browser.
     * @returns {boolean} True if Retina Display is supported, false otherwise.
     */
    static detectRetinaDisplay() {
        return window.devicePixelRatio && window.devicePixelRatio > 1;
    }

    /**
     * Detects Fullscreen API support in the browser.
     * @returns {boolean} True if Fullscreen API is supported, false otherwise.
     */
    static detectFullscreenAPI() {
        return 'fullscreenEnabled' in document || 'webkitFullscreenEnabled' in document || 'mozFullScreenEnabled' in document;
    }

    /**
     * Detects Orientation API support in the browser.
     * @returns {boolean} True if Orientation API is supported, false otherwise.
     */
    static detectOrientationAPI() {
        return 'orientation' in window || 'onorientationchange' in window;
    }

    /**
     * Detects Gamepad API support in the browser.
     * @returns {boolean} True if Gamepad API is supported, false otherwise.
     */
    static detectGamepadAPI() {
        return 'getGamepads' in navigator || 'webkitGetGamepads' in navigator;
    }

    /**
     * Detects FileSystem API support in the browser.
     * @returns {boolean} True if FileSystem API is supported, false otherwise.
     */
    static detectFileSystemAPI() {
        return 'requestFileSystem' in window || 'webkitRequestFileSystem' in window;
    }

    /**
     * Detects Pointer Lock API support in the browser.
     * @returns {boolean} True if Pointer Lock API is supported, false otherwise.
     */
    static detectPointerLockAPI() {
        return 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
    }

    /**
     * Detects Media Source Extensions support in the browser.
     * @returns {boolean} True if Media Source Extensions are supported, false otherwise.
     */
    static detectMediaSourceExtensions() {
        return 'MediaSource' in window && 'SourceBuffer' in window;
    }
    

    /**
     * Detects Picture-in-Picture API support in the browser.
     * @returns {boolean} True if Picture-in-Picture API is supported, false otherwise.
     */
    static detectPictureInPictureAPI() {
        return 'pictureInPictureEnabled' in document || 'webkitPictureInPictureEnabled' in document;
    }
    
    /**
     * Detects WebP image format support using modern APIs.
     * @returns {boolean} True if WebP image format is supported, false otherwise.
     */
    static detectWebPImageSupport() {
        const img = new Image();
        return 'isImageBitmap' in window && 'createImageBitmap' in window.ImageBitmap && 'decode' in img;
    }


    /**
     * Detects Page Visibility API support in the browser.
     * @returns {boolean} True if Page Visibility API is supported, false otherwise.
     */
    static detectPageVisibilityAPI() {
        return 'hidden' in document || 'webkitHidden' in document;
    }
    
    
    /**
     * Detects Audio Context API support in the browser.
     * @returns {boolean} True if Audio Context API is supported, false otherwise.
     */
    static detectAudioContextAPI() {
        return 'AudioContext' in window || 'webkitAudioContext' in window;
    }
    
    /**
     * Detects WebGL 2.0 API support in the browser.
     * @returns {boolean} True if WebGL 2.0 API is supported, false otherwise.
     */
    static detectWebGL2API() {
        const canvas = document.createElement('canvas');
        return 'WebGL2RenderingContext' in window && canvas.getContext('webgl2');
    }

    /**
     * Detects Gamepad Haptic API support in the browser.
     * @returns {boolean} True if Gamepad Haptic API is supported, false otherwise.
     */
    static detectGamepadHapticAPI() {
        return 'getGamepads' in navigator && 'vibrationActuator' in navigator.getGamepads()[0];
    }

}