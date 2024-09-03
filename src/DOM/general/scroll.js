
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */

import { Utility } from "../main/utility.js";
import { Style } from "../styling/style.js";

/**
 * Utility class for scroll-related operations.
 * @class
 */
export class Scroll {
    /**
     * Fades in an element over a specified duration.
     * @param {HTMLElement} element - The element to fade in.
     * @param {number} duration - The duration of the fade-in animation in milliseconds.
     * @param {Function} [callback] - An optional callback function to execute after the fade-in is complete.
     */
    static fadeIn(element, duration, callback) {
        const startOpacity = 0;
        const endOpacity = 1;
        Scroll.animateOpacity(element, startOpacity, endOpacity, duration, callback);
    }

    /**
     * Fades out an element over a specified duration.
     * @param {HTMLElement} element - The element to fade out.
     * @param {number} duration - The duration of the fade-out animation in milliseconds.
     * @param {Function} [callback] - An optional callback function to execute after the fade-out is complete.
     */
    static fadeOut(element, duration, callback) {
        const startOpacity = 1;
        const endOpacity = 0;
        Scroll.animateOpacity(element, startOpacity, endOpacity, duration, callback);
    }

    /**
     * Slides down an element over a specified duration.
     * @param {HTMLElement} element - The element to slide down.
     * @param {number} duration - The duration of the slide-down animation in milliseconds.
     * @param {Function} [callback] - An optional callback function to execute after the slide-down is complete.
     */
    static slideDown(element, duration, callback) {
        Scroll.animateHeight(element, 0, Scroll.getFullHeight(element), duration, callback);
    }

    /**
     * Slides up an element over a specified duration.
     * @param {HTMLElement} element - The element to slide up.
     * @param {number} duration - The duration of the slide-up animation in milliseconds.
     * @param {Function} [callback] - An optional callback function to execute after the slide-up is complete.
     */
    static slideUp(element, duration, callback) {
        Scroll.animateHeight(element, Scroll.getFullHeight(element), 0, duration, callback);
    }

    /**
     * Toggles the visibility of an element by sliding it up or down over a specified duration.
     * @param {HTMLElement} element - The element to toggle.
     * @param {number} duration - The duration of the slide animation in milliseconds.
     * @param {Function} [callback] - An optional callback function to execute after the toggle is complete.
     */
    static slideToggle(element, duration, callback) {
        if (Scroll.isElementVisible(element)) {
            Scroll.slideUp(element, duration, callback);
        } else {
            Scroll.slideDown(element, duration, callback);
        }
    }

    /**
     * Toggles a class on an element when scrolling past a specified offset.
     * @param {HTMLElement} element - The element to toggle the class on.
     * @param {string} className - The class to toggle.
     * @param {number} offset - The offset from the top of the page to trigger the class toggle.
     */
    static toggleClassOnScroll(element, className, offset) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY || window.pageYOffset;
            if (scrollPosition > offset) {
                Utility.addClass(className);
            } else {
                Utility.removeClass(className)
            }
        });
    }

    /**
     * Scrolls smoothly to the top of the page over a specified duration.
     * @param {number} duration - The duration of the smooth scroll in milliseconds.
     */
    static smoothScrollToTop(duration) {
        const start = window.pageYOffset || document.documentElement.scrollTop;
        const change = -start;
        const increment = 20;
        let currentTime = 0;

        const animateScroll = () => {
            currentTime += increment;
            const val = Scroll.easeInOutQuad(currentTime, start, change, duration);
            window.scrollTo(0, val);
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };

        animateScroll();
    }

    /**
     * Animate opacity of an element.
     * @param {HTMLElement} element - The element to animate.
     * @param {number} startOpacity - The starting opacity value.
     * @param {number} endOpacity - The ending opacity value.
     * @param {number} duration - The duration of the animation in milliseconds.
     * @param {Function} [callback] - An optional callback function to execute after the animation is complete.
     * @private
     */
    static animateOpacity(element, startOpacity, endOpacity, duration, callback) {
        const startTime = performance.now();
        const animate = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = elapsed / duration;
            const opacity = Scroll.easeInOutQuad(progress, startOpacity, endOpacity - startOpacity, 1);
            Style.addStyles(element, {opacity: opacity.toString()});
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else if (callback) {
                callback();
            }
        };
        requestAnimationFrame(animate);
    }

    /**
     * Animate height of an element.
     * @param {HTMLElement} element - The element to animate.
     * @param {number} startHeight - The starting height value.
     * @param {number} endHeight - The ending height value.
     * @param {number} duration - The duration of the animation in milliseconds.
     * @param {Function} [callback] - An optional callback function to execute after the animation is complete.
     * @private
     */
    static animateHeight(element, startHeight, endHeight, duration, callback) {
        const startTime = performance.now();
        const animate = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = elapsed / duration;
            const height = Scroll.easeInOutQuad(progress, startHeight, endHeight - startHeight, 1);
            Style.addStyles(element, {height: height + 'px'});
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                Style.addStyles(element, {height: ''}); // Reset height to allow content to flow
                if (callback) {
                    callback();
                }
            }
        };
        requestAnimationFrame(animate);
    }

    /**
     * Get the full height of an element including padding and border.
     * @param {HTMLElement} element - The element.
     * @returns {number} - The full height of the element.
     * @private
     */
    static getFullHeight(element) {
        const style = getComputedStyle(element);
        const height = element.offsetHeight;
        const borderTop = parseFloat(style.borderTopWidth);
        const borderBottom = parseFloat(style.borderBottomWidth);
        const paddingTop = parseFloat(style.paddingTop);
        const paddingBottom = parseFloat(style.paddingBottom);
        return height + borderTop + borderBottom + paddingTop + paddingBottom;
    }

    /**
     * Check if an element is currently visible in the viewport.
     * @param {HTMLElement} element - The element to check.
     * @returns {boolean} - True if the element is visible, false otherwise.
     * @private
     */
    static isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    }

    /**
     * Easing function for animations (quadratic in/out).
     * @param {number} t - The current time.
     * @param {number} b - The starting value.
     * @param {number} c - The change in value.
     * @param {number} d - The duration of the animation.
     * @returns {number} - The eased value.
     * @private
     */
    static easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }
    
    /**
     * Scrolls smoothly to the specified position over a specified duration.
     * @param {number} targetPosition - The target scroll position.
     * @param {number} duration - The duration of the smooth scroll in milliseconds.
     * @private
     */
    static smoothScrollToPosition(targetPosition, duration) {
        const start = window.pageYOffset || document.documentElement.scrollTop;
        const change = targetPosition - start;
        const increment = 20;
        let currentTime = 0;

        const animateScroll = () => {
            currentTime += increment;
            const val = Scroll.easeInOutQuad(currentTime, start, change, duration);
            window.scrollTo(0, val);
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };

        animateScroll();
    }

    /**
     * Scrolls smoothly to the specified element over a specified duration.
     * @param {HTMLElement} element - The target element to scroll to.
     * @param {number} duration - The duration of the smooth scroll in milliseconds.
     */
       static smoothScrollToElement(element, duration) {
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        Scroll.smoothScrollToPosition(elementTop, duration);
    }

    /**
     * Scrolls to the specified element without animation.
     * @param {HTMLElement} element - The target element to scroll to.
     */
    static scrollToElement(element) {
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: elementTop,
            behavior: 'auto',
        });
    }

    /**
     * Scrolls smoothly to the top of the page over a specified duration.
     * @param {number} duration - The duration of the smooth scroll in milliseconds.
     */
    static scrollToTop(duration) {
        Scroll.smoothScrollToPosition(0, duration);
    }

    /**
     * Scrolls smoothly to the bottom of the page over a specified duration.
     * @param {number} duration - The duration of the smooth scroll in milliseconds.
     */
    static scrollToBottom(duration) {
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        const scrollPosition = documentHeight - window.innerHeight;
        Scroll.smoothScrollToPosition(scrollPosition, duration);
    }

    /**
     * Scrolls to the specified position within an element.
     * @param {HTMLElement} element - The element containing the scrollable content.
     * @param {number} position - The target scroll position within the element.
     */
    static scrollToPosition(element, position) {
        element.scrollTop = position;
    }

    /**
     * Gets the current scroll position within an element.
     * @param {HTMLElement} element - The element containing the scrollable content.
     * @returns {number} - The current scroll position within the element.
     */
    static getScrollPosition(element) {
        return element.scrollTop;
    }

    /**
     * Disables scrolling on the entire page.
     */
    static disableScroll() {
        Style.addStyles(document.body, {overflow: 'hidden'});
    }

    /**
     * Enables scrolling on the entire page.
     */
    static enableScroll() {
        Style.addStyles(document.body, {overflow: ''});
    }

    /**
     * Gets the current scroll position of the viewport from the top.
     * @returns {number} - The current scroll position of the viewport from the top.
     */
    static getViewportScrollTop() {
        return window.scrollY || window.pageYOffset;
    }

    /**
     * Gets the current scroll position of the viewport from the left.
     * @returns {number} - The current scroll position of the viewport from the left.
     */
    static getViewportScrollLeft() {
        return window.scrollX || window.pageXOffset;
    }

    /**
     * Gets the current scroll position of the entire document from the top.
     * @returns {number} - The current scroll position of the document from the top.
     */
    static getDocumentScrollTop() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }

    /**
     * Gets the current scroll position of the entire document from the left.
     * @returns {number} - The current scroll position of the document from the left.
     */
    static getDocumentScrollLeft() {
        return document.documentElement.scrollLeft || document.body.scrollLeft;
    }

}
