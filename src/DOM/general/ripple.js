
/**
 * @author - Ermiyas Arage
 * @license MIT
 */

import { Element } from "../element/element.js"; 
import { Style } from "../styling/style.js";

/**
 * Utility class for ripple-effect and related operations.
 * @class
 */
export class Ripple {

	/**
	 * Adds a ripple effect to the specified element when clicked.
	 * @param {HTMLElement} element - The element to which the ripple effect will be applied.
	 * @param {Object} [options] - Additional options for customizing the ripple effect.
	 * @param {string} [options.color='rgba(255, 255, 255, 0.5)'] - The color of the ripple effect in CSS color format.
	 * @param {string} [options.duration='0.6s'] - The duration of the ripple effect animation in CSS time format.
	 * @param {number} [options.size=4] - The size of the ripple effect relative to the element's dimensions.
	 */
	static addRippleEffect(element, options = {}) {
		const defaultOptions = {
			color: 'rgba(255, 255, 255, 0.5)',
			duration: '0.6s',
			size: 4
		};

		const mergedOptions = { ...defaultOptions, ...options };

		element.addEventListener('click', function(event) {
			const targetElement = event.currentTarget;
			
			// Create ripple element
			const ripple = Element.createElement({
				name: 'span',
				class: ['ripple']
			});
			
			// Customize ripple styles
			Style.addStyles(ripple, {
				backgroundColor: mergedOptions.color,
				animationDuration: mergedOptions.duration,
			});

			/**
			 * Ripple effect css,
			 * Add this to your existing CSS file or create a new one
			 * 	.ripple {
			 * 		position: absolute;
			 * 		border-radius: 50%;
			 * 		transform: scale(0);
			 * 		animation: rippleEffect 0.6s linear;
			 * 	}
			 *
			 * 	@keyframes rippleEffect {
			 * 		to {
			 * 			transform: scale(4);
			 * 			opacity: 0;
			 * 		}
			 * 	}
			 */

			// Position the ripple in the container
			const rect = targetElement.getBoundingClientRect();
			const rippleX = event.clientX - rect.left;
			const rippleY = event.clientY - rect.top;
			ripple.style.left = rippleX + 'px';
			ripple.style.top = rippleY + 'px';
			
			// Add the ripple to the target element
			Element.appendElement(targetElement, ripple);
			
			// Remove the ripple after animation ends
			ripple.addEventListener('animationend', () => {
				ripple.remove();
			});
		});
	}


    /**
     * Adds a ripple effect to multiple elements based on a CSS selector.
     * @param {string} selector - The CSS selector used to select elements to which the ripple effect will be applied.
     * @param {Object} [options] - Additional options for customizing the ripple effect (same options as addRippleEffect).
     */
    static addRippleEffectToMultiple(selector, options = {}) {
        const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
            Ripple.addRippleEffect(element, options);
        });
    }

    /**
     * Removes the ripple effect from the specified element.
     * @param {HTMLElement} element - The element from which the ripple effect will be removed.
     */
    static removeRippleEffect(element) {
        const ripples = element.querySelectorAll('.ripple');
        ripples.forEach(ripple => {
            ripple.remove();
        });
    }

    /**
     * Removes the ripple effect from multiple elements based on a CSS selector.
     * @param {string} selector - The CSS selector used to select elements from which the ripple effect will be removed.
     */
    static removeRippleEffectFromMultiple(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            Ripple.removeRippleEffect(element);
        });
    }
}


/**
 * Utility class for ripple-effect and related operations with extended configuration and different logic.
 * @class
 */
export class RippleEffect {

    /**
     * @constructor
     * @param {HTMLElement} element - The element to add the ripple effect to.
     * @param {Object} options - Additional options for customization.
     * @param {number} options.duration - The duration of the ripple effect in milliseconds.
     * @param {string} options.eventType - The event type to trigger the ripple effect.
     * @param {Function} options.createRipple - Function to create a custom ripple element.
     */
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            duration: options.duration || 400,
            eventType: options.eventType || 'mousedown',
            createRipple: options.createRipple || this.createDefaultRipple.bind(this),
        };

        this.element.addEventListener(this.options.eventType, this.handleEvent.bind(this));
    }

    /**
     * Handles the specified event to create a ripple effect.
     * 
     * @param {Event} event - The triggering event.
     */
    handleEvent(event) {
        const ripple = this.options.createRipple();
		Element.appendElement(this.element, ripple);

        const rect = this.element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        Style.addStyles(ripple, { left: `${x}px`, top: `${y}px`});

        setTimeout(() => {
            ripple.remove();
        }, this.options.duration);
    }

    /**
     * Creates the default ripple element.
     * Users can override this method for custom ripple creation.
     * 
     * @returns {HTMLElement} - The default ripple element.
     */
    createDefaultRipple() {
        const ripple = Element.createElement({
			name: 'span',
			class: ['ripple']
		});
        return ripple;
    }
}