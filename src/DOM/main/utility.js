
/**
 * @author - Ermiyas Arage
 * @license MIT
 */


/**
 * Utility class for managing CSS classes on HTML elements.
 * @class
 */
export class Utility {
    /**
     * Adds a CSS class to an HTML element with error handling and optional animation trigger.
     * @param {HTMLElement} element - The HTML element.
     * @param {string} className - The name of the CSS class to add.
     * @param {Object} [options] - Additional options.
     * @param {boolean} [options.checkIfExists=false] - Whether to check if the class already exists before adding.
     * @param {boolean} [options.triggerAnimation=false] - Whether to trigger an animation after the class is added.
     * @throws Will throw an error if the element or className is invalid.
     */
    static addClass(element, className, options = {}) {
        if (!(element instanceof HTMLElement)) {
            throw new Error("Invalid element provided.");
        }

        if (typeof className !== 'string' || !className.trim()) {
            throw new Error("Invalid className provided.");
        }

        const { checkIfExists = false, triggerAnimation = false } = options;

        if (checkIfExists && element.classList.contains(className)) {
            console.warn(`Class "${className}" already exists on the element.`);
            return;
        }

        element.classList.add(className);

        if (triggerAnimation) {
            // Add an animation class, for example, fade-in
            element.style.transition = 'opacity 0.5s';
            element.style.opacity = 0;
            setTimeout(() => {
                element.style.opacity = 1;
            }, 10);
        }
    }

    /**
     * Removes a CSS class from an HTML element with advanced logging and state preservation.
     * @param {HTMLElement} element - The HTML element.
     * @param {string} className - The name of the CSS class to remove.
     * @param {Object} [options] - Additional options.
     * @param {boolean} [options.logChanges=false] - Whether to log the class removal.
     * @param {boolean} [options.preserveState=false] - Whether to preserve a backup of the class list for undo functionality.
     */
    static removeClass(element, className, options = {}) {
        if (!(element instanceof HTMLElement)) {
            throw new Error("Invalid element provided.");
        }

        if (typeof className !== 'string' || !className.trim()) {
            throw new Error("Invalid className provided.");
        }

        const { logChanges = false, preserveState = false } = options;

        if (preserveState) {
            element.dataset.previousClassList = element.className;
        }

        element.classList.remove(className);

        if (logChanges) {
            console.log(`Class "${className}" removed from element.`);
        }
    }

    /**
     * Checks if an HTML element has a specific CSS class and includes async delay options.
     * @param {HTMLElement} element - The HTML element.
     * @param {string} className - The name of the CSS class to check.
     * @param {Object} [options] - Additional options.
     * @param {number} [options.delay=0] - Optional delay before checking the class, useful in animations.
     * @returns {Promise<boolean>} True if the element has the class, false otherwise.
     */
    static async hasClass(element, className, options = {}) {
        if (!(element instanceof HTMLElement)) {
            throw new Error("Invalid element provided.");
        }

        if (typeof className !== 'string' || !className.trim()) {
            throw new Error("Invalid className provided.");
        }

        const { delay = 0 } = options;

        if (delay > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        return element.classList.contains(className);
    }

    /**
     * Toggles a CSS class on an HTML element with conditional behavior and callbacks.
     * @param {HTMLElement} element - The HTML element.
     * @param {string} className - The name of the CSS class to toggle.
     * @param {Object} [options] - Additional options.
     * @param {Function} [options.onAdd] - Callback function when the class is added.
     * @param {Function} [options.onRemove] - Callback function when the class is removed.
     */
    static toggleClass(element, className, options = {}) {
        if (!(element instanceof HTMLElement)) {
            throw new Error("Invalid element provided.");
        }

        if (typeof className !== 'string' || !className.trim()) {
            throw new Error("Invalid className provided.");
        }

        const { onAdd, onRemove } = options;

        if (element.classList.toggle(className)) {
            if (typeof onAdd === 'function') {
                onAdd(element);
            }
        } else {
            if (typeof onRemove === 'function') {
                onRemove(element);
            }
        }
    }

    /**
     * Replaces one CSS class with another on an HTML element, with undo capability.
     * @param {HTMLElement} element - The HTML element.
     * @param {string} oldClass - The class to be replaced.
     * @param {string} newClass - The class to replace it with.
     * @param {Object} [options] - Additional options.
     * @param {boolean} [options.enableUndo=false] - Whether to enable undo functionality.
     * @returns {Function|null} An undo function if undo is enabled, otherwise null.
     */
    static replaceClass(element, oldClass, newClass, options = {}) {
        if (!(element instanceof HTMLElement)) {
            throw new Error("Invalid element provided.");
        }

        if (typeof oldClass !== 'string' || !oldClass.trim() || typeof newClass !== 'string' || !newClass.trim()) {
            throw new Error("Invalid class names provided.");
        }

        const { enableUndo = false } = options;

        this.removeClass(element, oldClass);
        this.addClass(element, newClass);

        if (enableUndo) {
            const undo = () => {
                this.removeClass(element, newClass);
                this.addClass(element, oldClass);
                console.log(`Undo: Class "${newClass}" replaced back with "${oldClass}".`);
            };
            return undo;
        }

        return null;
    }

    /**
     * Adds multiple CSS classes to an HTML element, with an optional timeout before applying the classes.
     * @param {HTMLElement} element - The HTML element.
     * @param {Array<string>} classNames - The names of the CSS classes to add.
     * @param {Object} [options] - Additional options.
     * @param {number} [options.timeout=0] - Optional delay before applying the classes.
     * @param {boolean} [options.checkForDuplicates=false] - Check for duplicate classes before adding.
     * @returns {Promise<void>} A promise that resolves when all classes are added.
     */
    static async addClasses(element, classNames, options = {}) {
        if (!(element instanceof HTMLElement)) {
            throw new Error("Invalid element provided.");
        }

        if (!Array.isArray(classNames) || classNames.some(name => typeof name !== 'string' || !name.trim())) {
            throw new Error("Invalid classNames provided.");
        }

        const { timeout = 0, checkForDuplicates = false } = options;

        if (timeout > 0) {
            await new Promise(resolve => setTimeout(resolve, timeout));
        }

        classNames.forEach(className => {
            if (!checkForDuplicates || !element.classList.contains(className)) {
                element.classList.add(className);
            }
        });
    }

    /**
     * Replaces multiple CSS classes with new ones on an HTML element.
     * @param {HTMLElement} element - The HTML element.
     * @param {Object.<string, string>} classMap - An object where keys are old classes and values are new classes.
     */
    static replaceClasses(element, classMap) {
        for (const oldClass in classMap) {
            if (classMap.hasOwnProperty(oldClass)) {
                this.replaceClass(element, oldClass, classMap[oldClass]);
            }
        }
    }

    /**
     * Toggles a class on an HTML element conditionally based on a provided boolean condition.
     * @param {HTMLElement} element - The HTML element to toggle the class on.
     * @param {boolean} condition - The boolean condition determining which class to toggle.
     * @param {string} trueClass - The class to add when the condition is true.
     * @param {string} falseClass - The class to add when the condition is false.
     * @throws Will throw an error if the parameters are not of the expected types.
     */
    static toggleClassConditionally(element, condition, trueClass, falseClass) {
        if (condition) {
            this.addClass(element, trueClass);
            this.removeClass(element, falseClass);
        } else {
            this.addClass(element, falseClass);
            this.removeClass(element, trueClass);
        }
    }

    /**
     * Checks if an HTML element has any of the specified classes.
     * @param {HTMLElement} element - The HTML element to check for classes.
     * @param {string[]} classArray - An array of class names to check.
     * @returns {boolean} Returns true if the element has any of the specified classes, otherwise false.
     */
    static hasAnyClass(element, classArray) {
        for (const className of classArray) {
            if (typeof className === 'string' && this.hasClass(element, className)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Replaces the prefix of classes on an HTML element.
     * @param {HTMLElement} element - The HTML element to replace class prefixes on.
     * @param {string} oldPrefix - The prefix to replace in existing class names.
     * @param {string} newPrefix - The new prefix to replace the old prefix with.
     */
    static replaceClassPrefix(element, oldPrefix, newPrefix) {
        const classNames = Array.from(element.classList);
        classNames.forEach(className => {
            if (className.startsWith(oldPrefix)) {
                this.removeClass(className);
                this.addClass(element, className.replace(oldPrefix, newPrefix));
            }
        });
    }

    /**
     * Adds a class to an HTML element only if the class is not already present.
     * @param {HTMLElement} element - The HTML element to add the class to.
     * @param {string} className - The class name to add.
     */
    static addUniqueClass(element, className) {
        if (!this.hasClass(element, className)) {
            this.addClass(element, className)
        }
    }

    /**
     * Adds a class when the element enters the viewport.
     * @param {HTMLElement} element - The HTML element to add the class to.
     * @param {string} className - The class name to add.
     */
    static addClassOnViewportEnter(element, className) {
        const handleScroll = () => {
            const rect = this.element.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                this.addClass(element, className);
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    /**
     * Toggles a class on focus and removes it on blur.
     * @param {HTMLElement} element - The HTML element to add the class to.
     * @param {string} className - The class name to add.
     */
    static toggleClassOnFocus(element, className) {
        element.addEventListener('focus', () => {
            this.addClass(element, className);
        });

        element.addEventListener('blur', () => {
            this.removeClass(element, className);
        });
    }

    /**
     * Toggles a class when the specified media query changes.
     * @param {HTMLElement} element - The HTML element to add the class to.
     * @param {string} className - The class name to add.
     * @param {string} mediaQuery - The media query string.
     */
    toggleClassOnMediaQueryChange(element, className, mediaQuery) {
        const mediaQueryList = window.matchMedia(mediaQuery);
        const handleMediaQueryChange = (event) => {
            if (event.matches) {
                this.toggleClass(element, className);
            }
        };

        mediaQueryList.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQueryList);
    }

    /**
     * Toggles a class when the element is copied.
     * @param {HTMLElement} element - The HTML element to add the class to.
     * @param {string} className - The class name to add.
     */
    toggleClassOnCopy(element, className) {
        this.element.addEventListener('copy', () => {
            this.toggleClass(element, className);
        });
    }

    /**
     * Toggles a class on an element based on idle time.
     * @param {HTMLElement} element - The target element.
     * @param {string} className - The class name to toggle.
     * @param {number} [idleTime=30000] - The idle time threshold in milliseconds.
     */
    static toggleClassOnIdleTime(element, className, idleTime = 30000) {
        let idleTimer;
        const resetIdleTimer = () => {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                this.toggleClass(element, className);
            }, idleTime);
        };

        document.addEventListener('mousemove', resetIdleTimer);
        document.addEventListener('keypress', resetIdleTimer);
        resetIdleTimer();
    }

    /**
     * Adds a class at regular intervals using setInterval.
     * @param {number} [interval=1000] - The interval in milliseconds.
     */
    static addClassOnInterval(element, className, interval = 1000) {
        setInterval(() => {
            this.addClass(element, className);
        }, interval);
    }

    /**
     * Removes a class at regular intervals using setInterval.
     * @param {number} [interval=1000] - The interval in milliseconds.
     */
    removeClassOnInterval(element, className, interval = 1000) {
        setInterval(() => {
            this.removeClass(element, className);
        }, interval);
    }

    /**
     * Toggles a class on an element based on device motion.
     * @param {HTMLElement} element - The target element.
     * @param {string} className - The class name to toggle.
     */
    static toggleClassOnDeviceMotion(element, className) {
        window.addEventListener('deviceorientation', (event) => {
            const tiltThreshold = 20;
            const isTilted = Math.abs(event.beta) > tiltThreshold || Math.abs(event.gamma) > tiltThreshold;
            this.toggleClass(element, className, isTilted);
        });
    }

    /**
     * Toggles a class on an element based on orientation change.
     * @param {HTMLElement} element - The target element.
     * @param {string} className - The class name to toggle.
     */
    static toggleClassOnOrientationChange(element, className) {
        const handleOrientationChange = () => {
            const orientation = window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';
            this.toggleClass(element, `${className}-${orientation}`);
        };

        window.addEventListener('orientationchange', handleOrientationChange);
        handleOrientationChange();
    }

    /**
     * Toggles a class based on horizontal or vertical swipe.
     * @param {HTMLElement} element - The target element.
     * @param {string} className - The base class name to toggle.
     */
    static toggleClassOnSwipe(element,className) {
        let startX, startY;

        element.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
        });

        element.addEventListener('touchend', (event) => {
            const deltaX = event.changedTouches[0].clientX - startX;
            const deltaY = event.changedTouches[0].clientY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal Swipe
                this.toggleClass(element, `${className}-horizontal`);
            } else {
                // Vertical Swipe
                this.toggleClass(element, `${className}-vertical`);
            }
        });
    }
    
    /**
     * Toggles a class on an element based on network connection status change.
     * @param {HTMLElement} element - The target element.
     * @param {string} className - The class name to toggle.
     */
    static toggleClassOnConnectionStatus(element, className) {
        const handleConnectionChange = () => {
            const isOnline = navigator.onLine;
            this.toggleClass(element, className, isOnline);
        };

        window.addEventListener('online', handleConnectionChange);
        window.addEventListener('offline', handleConnectionChange);
        handleConnectionChange();
    }
    
    /**
     * Toggles a CSS class on an HTML element based on changes in the user's geolocation.
     * Adds advanced error handling, throttling, and custom callback support.
     * @param {HTMLElement} element - The HTML element.
     * @param {string} className - The CSS class to toggle.
     * @param {Object} [options] - Optional settings for geolocation.
     * @param {boolean} [options.enableThrottling=true] - Enables throttling to limit how often the class is toggled.
     * @param {number} [options.throttleInterval=5000] - Throttle interval in milliseconds (default is 5 seconds).
     * @param {Function} [options.onClassToggle] - Optional callback that triggers whenever the class is toggled.
     * @param {Function} [options.onError] - Optional error handling callback for geolocation errors.
     * @param {Object} [options.geoOptions] - Custom geolocation API options (e.g., enableHighAccuracy, timeout, maximumAge).
     */
    static toggleClassOnGeolocationChange(element, className, options = {}) {
        if (!(element instanceof HTMLElement)) {
            throw new Error("Invalid element provided.");
        }

        if (typeof className !== 'string' || !className.trim()) {
            throw new Error("Invalid className provided.");
        }

        const {
            enableThrottling = true,
            throttleInterval = 5000,
            onClassToggle = null,
            onError = null,
            geoOptions = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        } = options;

        let lastToggleTime = 0;
        let classToggled = false;

        const toggleClassWithConditions = (position) => {
            const currentTime = Date.now();

            // Throttling logic to avoid excessive toggling
            if (enableThrottling && currentTime - lastToggleTime < throttleInterval) {
                console.log("Throttling geolocation updates, skipping toggle.");
                return;
            }

            this.toggleClass(element, className);
            if (typeof onClassToggle === 'function') {
                onClassToggle(position, classToggled);
            }
            classToggled = !classToggled;
            lastToggleTime = currentTime;
        };

        const handleGeolocationError = (error) => {
            console.error("Geolocation error occurred:", error.message);

            if (typeof onError === 'function') {
                onError(error);
            }
        };

        const geoWatchId = navigator.geolocation.watchPosition(
            toggleClassWithConditions,
            handleGeolocationError,
            geoOptions
        );

        console.log("Started watching geolocation changes with ID:", geoWatchId);

        return () => {
            navigator.geolocation.clearWatch(geoWatchId);
            console.log("Stopped watching geolocation changes.");
        };
    }

}