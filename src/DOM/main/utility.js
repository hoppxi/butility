
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */


/**
 * Utility class for managing CSS classes on HTML elements.
 * @class
 */
export default class Utility {
    /**
     * Adds a CSS class to an HTML element.
     * @param {HTMLElement} element - The HTML element.
     * @param {string} className - The name of the CSS class to add.
     */
    static addClass(element, className) {
        element.classList.add(className);
    }

    /**
     * Removes a CSS class from an HTML element.
     * @param {HTMLElement} element - The HTML element.
     * @param {string} className - The name of the CSS class to remove.
     */
    static removeClass(element, className) {
        element.classList.remove(className);
    }

    /**
     * Checks if an HTML element has a specific CSS class.
     * @param {HTMLElement} element - The HTML element.
     * @param {string} className - The name of the CSS class to check.
     * @returns {boolean} True if the element has the class, false otherwise.
     */
    static hasClass(element, className) {
        return element.classList.contains(className);
    }

    /**
     * Toggles a CSS class on an HTML element. If the class is present, it is removed; otherwise, it is added.
     * @param {HTMLElement} element - The HTML element.
     * @param {string} className - The name of the CSS class to toggle.
     */
    static toggleClass(element, className) {
        element.classList.toggle(className);
    }

    /**
     * Replaces one CSS class with another on an HTML element.
     * @param {HTMLElement} element - The HTML element.
     * @param {string} oldClass - The class to be replaced.
     * @param {string} newClass - The class to replace it with.
     */
    static replaceClass(element, oldClass, newClass) {
        this.removeClass(element, oldClass);
        this.addClass(element, newClass);
    }

    /**
     * Adds multiple CSS classes to an HTML element.
     * @param {HTMLElement} element - The HTML element.
     * @param {...string} classNames - The names of the CSS classes to add.
     */
    static addClasses(element, ...classNames) {
        element.classList.add(...classNames);
    }

    /**
     * Removes multiple CSS classes from an HTML element.
     * @param {HTMLElement} element - The HTML element.
     * @param {...string} classNames - The names of the CSS classes to remove.
     */
    static removeClasses(element, ...classNames) {
        element.classList.remove(...classNames);
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
     * Removes all CSS classes from an HTML element.
     * @param {HTMLElement} element - The HTML element.
     */
    static removeAllClasses(element) {
        element.className = '';
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
            Utility.addClass(element, trueClass);
            Utility.removeClass(element, falseClass);
        } else {
            Utility.addClass(element, falseClass);
            Utility.removeClass(element, trueClass);
        }
    }


    /**
     * Retrieves an array of all CSS classes on an HTML element.
     * @param {HTMLElement} element - The HTML element.
     * @returns {string[]} An array of CSS class names.
     */
    static getAllClasses(element) {
        return Array.from(element.classList);
    }

    /**
     * Checks if an HTML element has any of the specified classes.
     * @param {HTMLElement} element - The HTML element to check for classes.
     * @param {string[]} classArray - An array of class names to check.
     * @returns {boolean} Returns true if the element has any of the specified classes, otherwise false.
     */
    static hasAnyClass(element, classArray) {
        for (const className of classArray) {
            if (typeof className === 'string' && element.classList.contains(className)) {
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
                Utility.removeClass(className);
                Utility.addClass(element, className.replace(oldPrefix, newPrefix));
            }
        });
    }

    /**
     * Adds a class to an HTML element only if the class is not already present.
     * @param {HTMLElement} element - The HTML element to add the class to.
     * @param {string} className - The class name to add.
     */
    static addUniqueClass(element, className) {
        if (!Utility.hasClass(element, className)) {
            Utility.addClass(element, className)
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
                Utility.addClass(element, className);
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
        this.element.addEventListener('focus', () => {
            Utility.addClass(element, className);
        });

        this.element.addEventListener('blur', () => {
            Utility.removeClass(element, className);
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
                Utility.toggleClass(element, className);
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
            Utility.toggleClass(element, className);
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
                Utility.toggleClass(element, className);
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
            Utility.addClass(element, className);
        }, interval);
    }

    /**
     * Removes a class at regular intervals using setInterval.
     * @param {number} [interval=1000] - The interval in milliseconds.
     */
    removeClassOnInterval(element, className, interval = 1000) {
        setInterval(() => {
            Utility.removeClass(element, className);
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
            Utility.toggleClass(element, className, isTilted);
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
            Utility.toggleClass(element, `${className}-${orientation}`);
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
                Utility.toggleClass(element, `${className}-horizontal`);
            } else {
                // Vertical Swipe
                Utility.toggleClass(element, `${className}-vertical`);
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
            Utility.toggleClass(element, className, isOnline);
        };

        window.addEventListener('online', handleConnectionChange);
        window.addEventListener('offline', handleConnectionChange);
        handleConnectionChange();
    }
    
    /**
     * Toggles a class when the geolocation changes.
     * @param {HTMLElement} element - The target element.
     * @param {string} className - The class name to toggle.
     */
    static toggleClassOnGeolocationChange(element, className) {
        navigator.geolocation.watchPosition(
            (position) => {
                Utility.toggleClass(element, className);
            },
            (error) => {
                console.error(error);
            }
        );
    }
}