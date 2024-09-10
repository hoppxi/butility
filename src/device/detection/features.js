 
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
     * Detects if Web Workers are supported in the browser.
     * @returns {boolean} True if Web Workers are supported, false otherwise.
     */
    static detectWebWorkers() {
        return 'Worker' in window;
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
     * Detects Battery API support in the browser.
     * @returns {boolean} True if Battery API is supported, false otherwise.
     */
    static detectBatteryAPI() {
        return 'getBattery' in navigator;
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
     * Detects Pointer Events support in the browser.
     *
     * @returns {boolean} True if Pointer Events are supported, false otherwise.
     */
    static detectPointerEvents() {
        return 'PointerEvent' in window;
    }

    /**
     * Detects Touch Events support in the browser.
     * @returns {boolean} True if Touch Events are supported, false otherwise.
     */
    static detectTouchEvents() {
        return 'ontouchstart' in window;
    }

    /**
     * Detects Retina Display support in the browser.
     * @returns {boolean} True if Retina Display is supported, false otherwise.
     */
    static detectRetinaDisplay() {
        return window.devicePixelRatio && window.devicePixelRatio > 1;
    }

    /**
     * Detects Vibration API support in the browser.
     * @returns {boolean} True if Vibration API is supported, false otherwise.
     */
    static detectVibrationAPI() {
        return 'vibrate' in navigator;
    }

    /**
     * Detects Clipboard API support in the browser.
     * @returns {boolean} True if Clipboard API is supported, false otherwise.
     */
    static detectClipboardAPI() {
        return 'ClipboardItem' in window;
    }

    /**
     * Detects Speech Synthesis API support in the browser.
     * @returns {boolean} True if Speech Synthesis API is supported, false otherwise.
     */
    static detectSpeechSynthesisAPI() {
        return 'speechSynthesis' in window;
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
     * Detects Permissions API support in the browser.
     * @returns {boolean} True if Permissions API is supported, false otherwise.
     */
    static detectPermissionsAPI() {
        return 'permissions' in navigator;
    }

    /**
     * Detects Credential Management API support in the browser.
     * @returns {boolean} True if Credential Management API is supported, false otherwise.
     */
    static detectCredentialManagementAPI() {
        return 'credentials' in navigator;
    }

    /**
     * Detects Payment Request API support in the browser.
     * @returns {boolean} True if Payment Request API is supported, false otherwise.
     */
    static detectPaymentRequestAPI() {
        return 'PaymentRequest' in window;
    }

    /**
     * Detects WebAuthn API support in the browser.
     * @returns {boolean} True if WebAuthn API is supported, false otherwise.
     */
    static detectWebAuthnAPI() {
        return 'PublicKeyCredential' in window;
    }

    /**
     * Detects Media Recorder API support in the browser.
     * @returns {boolean} True if Media Recorder API is supported, false otherwise.
     */
    static detectMediaRecorderAPI() {
        return 'MediaRecorder' in window;
    }

    /**
     * Detects Media Source Extensions support in the browser.
     * @returns {boolean} True if Media Source Extensions are supported, false otherwise.
     */
    static detectMediaSourceExtensions() {
        return 'MediaSource' in window && 'SourceBuffer' in window;
    }
       
    /**
     * Detects Web Bluetooth API support in the browser.
     * @returns {boolean} True if Web Bluetooth API is supported, false otherwise.
     */
    static detectWebBluetoothAPI() {
        return 'bluetooth' in navigator;
    }
    
    /**
     * Detects Broadcast Channel API support in the browser.
     * @returns {boolean} True if Broadcast Channel API is supported, false otherwise.
     */
    static detectBroadcastChannelAPI() {
        return 'BroadcastChannel' in window;
    }
    
    /**
     * Detects FileSystem Access API support in the browser.
     * @returns {boolean} True if FileSystem Access API is supported, false otherwise.
     */
    static detectFileSystemAccessAPI() {
        return 'showOpenFilePicker' in window;
    }
    
    /**
     * Detects Media Capabilities API support in the browser.
     * @returns {boolean} True if Media Capabilities API is supported, false otherwise.
     */
    static detectMediaCapabilitiesAPI() {
        return 'mediaCapabilities' in navigator;
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
     * Detects EventSource API support in the browser.
     * @returns {boolean} True if EventSource API is supported, false otherwise.
     */
    static detectEventSourceAPI() {
        return 'EventSource' in window;
    }
    
    /**
     * Detects Fetch API support in the browser.
     * @returns {boolean} True if Fetch API is supported, false otherwise.
     */
    static detectFetchAPI() {
        return 'fetch' in window;
    }
    
    /**
     * Detects FormData API support in the browser.
     * @returns {boolean} True if FormData API is supported, false otherwise.
     */
    static detectFormDataAPI() {
        return 'FormData' in window;
    }
    
    /**
     * Detects Intersection Observer API support in the browser.
     * @returns {boolean} True if Intersection Observer API is supported, false otherwise.
     */
    static detectIntersectionObserverAPI() {
        return 'IntersectionObserver' in window;
    }
    
    /**
     * Detects Mutation Observer API support in the browser.
     * @returns {boolean} True if Mutation Observer API is supported, false otherwise.
     */
    static detectMutationObserverAPI() {
        return 'MutationObserver' in window;
    }
    
    /**
     * Detects Resize Observer API support in the browser.
     * @returns {boolean} True if Resize Observer API is supported, false otherwise.
     */
    static detectResizeObserverAPI() {
        return 'ResizeObserver' in window;
    }
    
    /**
     * Detects Performance API support in the browser.
     * @returns {boolean} True if Performance API is supported, false otherwise.
     */
    static detectPerformanceAPI() {
        return 'performance' in window;
    }
    
    /**
     * Detects Geolocation API support in the browser.
     * @returns {boolean} True if Geolocation API is supported, false otherwise.
     */
    static detectGeolocationAPI() {
        return 'geolocation' in navigator;
    }

    /**
     * Detects Page Visibility API support in the browser.
     * @returns {boolean} True if Page Visibility API is supported, false otherwise.
     */
    static detectPageVisibilityAPI() {
        return 'hidden' in document || 'webkitHidden' in document;
    }
    
    /**
     * Detects Idle API support in the browser.
     * @returns {boolean} True if Idle API is supported, false otherwise.
     */
    static detectIdle() {
        return 'IdleManager' in window;
    }
    
    /**
     * Detects Credentials API support in the browser.
     * @returns {boolean} True if Credentials API is supported, false otherwise.
     */
    static detectCredentialsAPI() {
        return 'credentials' in navigator;
    }
    
    /**
     * Detects Web Share API support in the browser.
     * @returns {boolean} True if Web Share API is supported, false otherwise.
     */
    static detectWebShareAPI() {
        return 'share' in navigator;
    }
    
    /**
     * Detects Background Sync API support in the browser.
     * @returns {boolean} True if Background Sync API is supported, false otherwise.
     */
    static detectBackgroundSyncAPI() {
        return 'BackgroundSyncManager' in window;
    }
    
    /**
     * Detects Notification API support in the browser.
     * @returns {boolean} True if Notification API is supported, false otherwise.
     */
    static detectNotificationAPI() {
        return 'Notification' in window;
    }
    
    /**
     * Detects Push API support in the browser.
     * @returns {boolean} True if Push API is supported, false otherwise.
     */
    static detectPushAPI() {
        return 'PushManager' in window;
    }
    
    /**
     * Detects Notifications API support in the browser.
     * @returns {boolean} True if Notifications API is supported, false otherwise.
     */
    static detectNotificationsAPI() {
        return 'notifications' in navigator;
    }
    
    /**
     * Detects Service Worker API support in the browser.
     * @returns {boolean} True if Service Worker API is supported, false otherwise.
     */
    static detectServiceWorkerAPI() {
        return 'serviceWorker' in navigator;
    }
    
    /**
     * Detects Share API support in the browser.
     * @returns {boolean} True if Share API is supported, false otherwise.
     */
    static detectShareAPI() {
        return 'canShare' in navigator;
    }
    
    /**
     * Detects ImageBitmap API support in the browser.
     * @returns {boolean} True if ImageBitmap API is supported, false otherwise.
     */
    static detectImageBitmapAPI() {
        return 'createImageBitmap' in window;
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
     * Detects WebVR API support in the browser.
     * @returns {boolean} True if WebVR API is supported, false otherwise.
     */
    static detectWebVRAPI() {
        return 'getVRDisplays' in navigator;
    }

    /**
     * Detects WebXR API support in the browser.
     * @returns {boolean} True if WebXR API is supported, false otherwise.
     */
    static detectWebXRAPI() {
        return 'xr' in navigator;
    }

    /**
     * Detects Offscreen Canvas API support in the browser.
     * @returns {boolean} True if Offscreen Canvas API is supported, false otherwise.
     */
    static detectOffscreenCanvasAPI() {
        return 'OffscreenCanvas' in window;
    }
    
    /**
     * Detects Gamepad Haptic API support in the browser.
     * @returns {boolean} True if Gamepad Haptic API is supported, false otherwise.
     */
    static detectGamepadHapticAPI() {
        return 'getGamepads' in navigator && 'vibrationActuator' in navigator.getGamepads()[0];
    }

    /**
     * Detects Presentation API support in the browser.
     * @returns {boolean} True if Presentation API is supported, false otherwise.
     */
    static detectPresentationAPI() {
        return 'PresentationRequest' in window;
    }
    
    /**
     * Detects Wake Lock API support in the browser.
     * @returns {boolean} True if Wake Lock API is supported, false otherwise.
     */
    static detectWakeLockAPI() {
        return 'wakeLock' in navigator;
    }
    
    /**
     * Detects Ambient Light Sensor API support in the browser.
     * @returns {boolean} True if Ambient Light Sensor API is supported, false otherwise.
     */
    static detectAmbientLightSensorAPI() {
        return 'AmbientLightSensor' in window;
    }
    
    /**
     * Detects Proximity Sensor API support in the browser.
     * @returns {boolean} True if Proximity Sensor API is supported, false otherwise.
     */
    static detectProximitySensorAPI() {
        return 'ProximitySensor' in window;
    }
    
    /**
     * Detects Accelerometer API support in the browser.
     * @returns {boolean} True if Accelerometer API is supported, false otherwise.
     */
    static detectAccelerometerAPI() {
        return 'Accelerometer' in window;
    }
    
    /**
     * Detects Gyroscope API support in the browser.
     * @returns {boolean} True if Gyroscope API is supported, false otherwise.
     */
    static detectGyroscopeAPI() {
        return 'Gyroscope' in window;
    }
    
    /**
     * Detects Magnetometer API support in the browser.
     * @returns {boolean} True if Magnetometer API is supported, false otherwise.
     */
    static detectMagnetometerAPI() {
        return 'Magnetometer' in window;
    }
    
    /**
     * Detects Generic Sensor API support in the browser.
     * @returns {boolean} True if Generic Sensor API is supported, false otherwise.
     */
    static detectGenericSensorAPI() {
        return 'Sensor' in window;
    }
    
    /**
     * Detects WebUSB API support in the browser.
     * @returns {boolean} True if WebUSB API is supported, false otherwise.
     */
    static detectWebUSBAPI() {
        return 'usb' in navigator;
    }
    
    /**
     * Detects Serial API support in the browser.
     * @returns {boolean} True if Serial API is supported, false otherwise.
     */
    static detectSerialAPI() {
        return 'serial' in navigator;
    }
    
    /**
     * Detects Bluetooth API support in the browser.
     * @returns {boolean} True if Bluetooth API is supported, false otherwise.
     */
    static detectBluetoothAPI() {
        return 'bluetooth' in navigator;
    }
    
    /**
     * Detects NFC API support in the browser.
     * @returns {boolean} True if NFC API is supported, false otherwise.
     */
    static detectNFCAPI() {
        return 'nfc' in navigator;
    }
    
    /**
     * Detects WebNFC API support in the browser.
     * @returns {boolean} True if WebNFC API is supported, false otherwise.
     */
    static detectWebNFCAPI() {
        return 'NDEFReader' in window;
    }

    /**
     * Detects Image Capture API support in the browser.
     * @returns {boolean} True if Image Capture API is supported, false otherwise.
     */
    static detectImageCaptureAPI() {
        return 'ImageCapture' in window;
    }
    
    /**
     * Detects Media Devices API support in the browser.
     * @returns {boolean} True if Media Devices API is supported, false otherwise.
     */
    static detectMediaDevicesAPI() {
        return 'mediaDevices' in navigator;
    }
    
    /**
     * Detects Screen Capture API support in the browser.
     * @returns {boolean} True if Screen Capture API is supported, false otherwise.
     */
    static detectScreenCaptureAPI() {
        return 'getDisplayMedia' in navigator.mediaDevices;
    }
    
    /**
     * Detects WebXR Device API support in the browser.
     * @returns {boolean} True if WebXR Device API is supported, false otherwise.
     */
    static detectWebXRDeviceAPI() {
        return 'xr' in navigator;
    }
    
    /**
     * Detects WebXR Session API support in the browser.
     * @returns {boolean} True if WebXR Session API is supported, false otherwise.
     */
    static detectWebXRSessionAPI() {
        return 'XRSession' in window;
    }

    /**
     * Detects WebXR Frame API support in the browser.
     * @returns {boolean} True if WebXR Frame API is supported, false otherwise.
     */
    static detectWebXRFrameAPI() {
        return 'XRFrame' in window;
    }
    
    /**
     * Detects WebXR Input Source API support in the browser.
     * @returns {boolean} True if WebXR Input Source API is supported, false otherwise.
     */
    static detectWebXRInputSourceAPI() {
        return 'XRInputSource' in window;
    }

    /**
     * Detects WebXR Pose API support in the browser.
     * @returns {boolean} True if WebXR Pose API is supported, false otherwise.
     */
    static detectWebXRPoseAPI() {
        return 'XRPose' in window;
    }
    
    /**
     * Detects WebXR Hit Test API support in the browser.
     * @returns {boolean} True if WebXR Hit Test API is supported, false otherwise.
     */
    static detectWebXRHitTestAPI() {
        return 'XRHitTest' in window;
    }
    
    /**
     * Detects WebXR Hand API support in the browser.
     * @returns {boolean} True if WebXR Hand API is supported, false otherwise.
     */
    static detectWebXRHandAPI() {
        return 'XRHand' in window;
    }
    
    /**
     * Detects WebXR Spatial Tracking API support in the browser.
     * @returns {boolean} True if WebXR Spatial Tracking API is supported, false otherwise.
     */
    static detectWebXRSpatialTrackingAPI() {
        return 'XRSpatialTracking' in window;
    }
    
    /**
     * Detects WebXR Viewer Reference Space API support in the browser.
     * @returns {boolean} True if WebXR Viewer Reference Space API is supported, false otherwise.
     */
    static detectWebXRViewerReferenceSpaceAPI() {
        return 'XRViewerReferenceSpace' in window;
    }

    /**
     * Detects WebXR Reference Space API support in the browser.
     * @returns {boolean} True if WebXR Reference Space API is supported, false otherwise.
     */
    static detectWebXRReferenceSpaceAPI() {
        return 'XRReferenceSpace' in window;
    }
    
    /**
     * Detects WebXR Viewer API support in the browser.
     * @returns {boolean} True if WebXR Viewer API is supported, false otherwise.
     */
    static detectWebXRViewerAPI() {
        return 'XRViewer' in window;
    }
    
    /**
     * Detects WebXR Layer API support in the browser.
     * @returns {boolean} True if WebXR Layer API is supported, false otherwise.
     */
    static detectWebXRLayerAPI() {
        return 'XRLayer' in window;
    }
    
    /**
     * Detects WebXR Input API support in the browser.
     * @returns {boolean} True if WebXR Input API is supported, false otherwise.
     */
    static detectWebXRInputAPI() {
        return 'XRInput' in window;
    }

    /**
     * Detects WebXR Hand Tracking API support in the browser.
     * @returns {boolean} True if WebXR Hand Tracking API is supported, false otherwise.
     */
    static detectWebXRHandTrackingAPI() {
        return 'XRHandTracking' in window;
    }
    
    /**
     * Detects WebXR Depth API support in the browser.
     * @returns {boolean} True if WebXR Depth API is supported, false otherwise.
     */
    static detectWebXRDepthAPI() {
        return 'XRDepth' in window;
    }
    
    /**
     * Detects WebXR Light Estimation API support in the browser.
     * @returns {boolean} True if WebXR Light Estimation API is supported, false otherwise.
     */
    static detectWebXRLightEstimationAPI() {
        return 'XRLightEstimation' in window;
    }
    
    /**
     * Detects WebXR DOM Overlay API support in the browser.
     * @returns {boolean} True if WebXR DOM Overlay API is supported, false otherwise.
     */
    static detectWebXRDOMOverlayAPI() {
        return 'XRDOMOverlay' in window;
    }
    
    /**
     * Detects WebXR DOM Overlay State API support in the browser.
     * @returns {boolean} True if WebXR DOM Overlay State API is supported, false otherwise.
     */
    static detectWebXRDOMOverlayStateAPI() {
        return 'XRDOMOverlayState' in window;
    }
    
    /**
     * Detects WebXR DOM Overlay Position API support in the browser.
     * @returns {boolean} True if WebXR DOM Overlay Position API is supported, false otherwise.
     */
    static detectWebXRDOMOverlayPositionAPI() {
        return 'XRDOMOverlayPosition' in window;
    }
    
    /**
     * Detects WebXR DOM Overlay Type API support in the browser.
     * @returns {boolean} True if WebXR DOM Overlay Type API is supported, false otherwise.
     */
    static detectWebXRDOMOverlayTypeAPI() {
        return 'XRDOMOverlayType' in window;
    }
    
    /**
     * Detects WebXR Gamepad API support in the browser.
     * @returns {boolean} True if WebXR Gamepad API is supported, false otherwise.
     */
    static detectWebXRGamepadAPI() {
        return 'XRGamepad' in window;
    }
    
    /**
     * Detects WebXR Gamepad Button API support in the browser.
     * @returns {boolean} True if WebXR Gamepad Button API is supported, false otherwise.
     */
    static detectWebXRGamepadButtonAPI() {
        return 'XRGamepadButton' in window;
    }
    
    /**
     * Detects WebXR Gamepad Pose API support in the browser.
     * @returns {boolean} True if WebXR Gamepad Pose API is supported, false otherwise.
     */
    static detectWebXRGamepadPoseAPI() {
        return 'XRGamepadPose' in window;
    }

    /**
     * Detects WebXR Frame Of Reference API support in the browser.
     * @returns {boolean} True if WebXR Frame Of Reference API is supported, false otherwise.
     */
    static detectWebXRFrameOfReferenceAPI() {
        return 'XRFrameOfReference' in window;
    }

    /**
     * Detects WebXR Frame Request Callback API support in the browser.
     * @returns {boolean} True if WebXR Frame Request Callback API is supported, false otherwise.
     */
    static detectWebXRFrameRequestCallbackAPI() {
        return 'XRFrameRequestCallback' in window;
    }

    /**
     * Detects WebXR Audio Listener API support in the browser.
     * @returns {boolean} True if WebXR Audio Listener API is supported, false otherwise.
     */
    static detectWebXRAudioListenerAPI() {
        return 'XRAudioListener' in window;
    }

    /**
     * Detects WebXR Audio Context API support in the browser.
     * @returns {boolean} True if WebXR Audio Context API is supported, false otherwise.
     */
    static detectWebXRAudioContextAPI() {
        return 'XRAudioContext' in window;
    }

    /**
     * Detects WebXR Input Source Event API support in the browser.
     * @returns {boolean} True if WebXR Input Source Event API is supported, false otherwise.
     */
    static detectWebXRInputSourceEventAPI() {
        return 'XRInputSourceEvent' in window;
    }

    /**
     * Detects WebXR Input Source Array API support in the browser.
     * @returns {boolean} True if WebXR Input Source Array API is supported, false otherwise.
     */
    static detectWebXRInputSourceArrayAPI() {
        return 'XRInputSourceArray' in window;
    }

    /**
     * Detects WebXR Input Source Hand API support in the browser.
     * @returns {boolean} True if WebXR Input Source Hand API is supported, false otherwise.
     */
    static detectWebXRInputSourceHandAPI() {
        return 'XRInputSourceHand' in window;
    }

    /**
     * Detects WebXR Input Source Haptic Actuator API support in the browser.
     * @returns {boolean} True if WebXR Input Source Haptic Actuator API is supported, false otherwise.
     */
    static detectWebXRInputSourceHapticActuatorAPI() {
        return 'XRInputSourceHapticActuator' in window;
    }

    /**
     * Detects WebXR Input Source Pose API support in the browser.
     * @returns {boolean} True if WebXR Input Source Pose API is supported, false otherwise.
     */
    static detectWebXRInputSourcePoseAPI() {
        return 'XRInputSourcePose' in window;
    }
    
    /**
     * Detects WebXR Input Source Pose State API support in the browser.
     * @returns {boolean} True if WebXR Input Source Pose State API is supported, false otherwise.
     */
    static detectWebXRInputSourcePoseStateAPI() {
        return 'XRInputSourcePoseState' in window;
    }
    
    /**
     * Detects WebXR Input Source Profile API support in the browser.
     * @returns {boolean} True if WebXR Input Source Profile API is supported, false otherwise.
     */
    static detectWebXRInputSourceProfileAPI() {
        return 'XRInputSourceProfile' in window;
    }
    
    /**
     * Detects WebXR Input Source Target Ray Mode API support in the browser.
     * @returns {boolean} True if WebXR Input Source Target Ray Mode API is supported, false otherwise.
     */
    static detectWebXRInputSourceTargetRayModeAPI() {
        return 'XRInputSourceTargetRayMode' in window;
    }
    
    /**
     * Detects WebXR Input Source Target Ray Space API support in the browser.
     * @returns {boolean} True if WebXR Input Source Target Ray Space API is supported, false otherwise.
     */
    static detectWebXRInputSourceTargetRaySpaceAPI() {
        return 'XRInputSourceTargetRaySpace' in window;
    }
    
    /**
     * Detects WebXR Input Source Touchpad API support in the browser.
     * @returns {boolean} True if WebXR Input Source Touchpad API is supported, false otherwise.
     */
    static detectWebXRInputSourceTouchpadAPI() {
        return 'XRInputSourceTouchpad' in window;
    }
    
    /**
     * Detects WebXR Input Source Vibration Actuator API support in the browser.
     * @returns {boolean} True if WebXR Input Source Vibration Actuator API is supported, false otherwise.
     */
    static detectWebXRInputSourceVibrationActuatorAPI() {
        return 'XRInputSourceVibrationActuator' in window;
    }
    
    /**
     * Detects WebXR Hit Test Source API support in the browser.
     * @returns {boolean} True if WebXR Hit Test Source API is supported, false otherwise.
     */
    static detectWebXRHitTestSourceAPI() {
        return 'XRHitTestSource' in window;
    }
    
    /**
     * Detects WebXR Hit Test Source Offset API support in the browser.
     * @returns {boolean} True if WebXR Hit Test Source Offset API is supported, false otherwise.
     */
    static detectWebXRHitTestSourceOffsetAPI() {
        return 'XRHitTestSourceOffset' in window;
    }
    
    /**
     * Detects WebXR Hit Test Source Pose API support in the browser.
     * @returns {boolean} True if WebXR Hit Test Source Pose API is supported, false otherwise.
     */
    static detectWebXRHitTestSourcePoseAPI() {
        return 'XRHitTestSourcePose' in window;
    }

    /**
     * Detects WebXR Hit Test Source Ray Space API support in the browser.
     * @returns {boolean} True if WebXR Hit Test Source Ray Space API is supported, false otherwise.
     */
    static detectWebXRHitTestSourceRaySpaceAPI() {
        return 'XRHitTestSourceRaySpace' in window;
    }

    /**
     * Detects WebXR Hit Test Result API support in the browser.
     * @returns {boolean} True if WebXR Hit Test Result API is supported, false otherwise.
     */
    static detectWebXRHitTestResultAPI() {
        return 'XRHitTestResult' in window;
    }

    /**
     * Detects WebXR Image API support in the browser.
     * @returns {boolean} True if WebXR Image API is supported, false otherwise.
     */
    static detectWebXRImageAPI() {
        return 'XRImage' in window;
    }

    /**
     * Detects WebXR Image Bitmap API support in the browser.
     * @returns {boolean} True if WebXR Image Bitmap API is supported, false otherwise.
     */
    static detectWebXRImageBitmapAPI() {
        return 'XRImageBitmap' in window;
    }

    /**
     * Detects WebXR Image Bitmap Array API support in the browser.
     * @returns {boolean} True if WebXR Image Bitmap Array API is supported, false otherwise.
     */
    static detectWebXRImageBitmapArrayAPI() {
        return 'XRImageBitmapArray' in window;
    }


    /**
     * Detects WebXR Image Bitmap Rendering Context API support in the browser.
     * @returns {boolean} True if WebXR Image Bitmap Rendering Context API is supported, false otherwise.
     */
    static detectWebXRImageBitmapRenderingContextAPI() {
        return 'XRImageBitmapRenderingContext' in window;
    }

    /**
     * Detects WebXR Image Bitmap Rendering Context Sync API support in the browser.
     * @returns {boolean} True if WebXR Image Bitmap Rendering Context Sync API is supported, false otherwise.
     */
    static detectWebXRImageBitmapRenderingContextSyncAPI() {
        return 'XRImageBitmapRenderingContextSync' in window;
    }

    /**
     * Detects WebXR Image Decode API support in the browser.
     * @returns {boolean} True if WebXR Image Decode API is supported, false otherwise.
     */
    static detectWebXRImageDecodeAPI() {
        return 'XRImageDecode' in window;
    }

    /**
     * Detects WebXR Image Encode API support in the browser.
     * @returns {boolean} True if WebXR Image Encode API is supported, false otherwise.
     */
    static detectWebXRImageEncodeAPI() {
        return 'XRImageEncode' in window;
    }
}