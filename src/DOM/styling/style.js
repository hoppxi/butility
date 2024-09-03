
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */


/**
 * Utility class for managing CSS styles on HTML elements (Inline styling in JS).
 * @class
 */
export class Style {
    
    /**
     * Adds inline CSS styles to an HTML element.
     * @param {HTMLElement} element - The HTML element.
     * @param {Object.<string, string>} styles - An object where keys are style properties and values are style values.
     */
    static addStyles(element, styles) {
        for (const property in styles) {
            if (styles.hasOwnProperty(property)) {
                element.style[property] = styles[property];
            }
        }
    }

    /**
     * Removes inline CSS styles from an HTML element.
     * @param {HTMLElement} element - The HTML element.
     * @param {...string} properties - The names of the style properties to remove.
     */
    static removeStyles(element, ...properties) {
        for (const property of properties) {
            element.style[property] = '';
        }
    }

    /**
     * Retrieves an object containing all inline CSS styles of an HTML element.
     * @param {HTMLElement} element - The HTML element.
     * @returns {Object.<string, string>} An object where keys are style properties and values are style values.
     */
    static getAllStyles(element) {
        const styles = {};
        for (let i = 0; i < element.style.length; i++) {
            const property = element.style[i];
            styles[property] = element.style[property];
        }
        return styles;
    }

    /**
     * Sets the display style property of an HTML element to 'none'.
     * @param {HTMLElement} element - The HTML element.
     */
    static hideElement(element) {
        element.style.display = 'none';
    }

    /**
     * Sets the display style property of an HTML element to its default value.
     * @param {HTMLElement} element - The HTML element.
     */
    static showElement(element) {
        element.style.display = '';
    }

    /**
     * Get the computed style of an element.
     * @param {HTMLElement} element - The target element.
     * @param {string} property - The CSS property to retrieve.
     * @returns {string} - The computed value of the specified property.
     */
    static getComputedStyle(element, property) {
        return window.getComputedStyle(element).getPropertyValue(property);
    }

    /**
     * Get the dimensions (width and height) of an element.
     * @param {HTMLElement} element - The target element.
     * @returns {Object} - An object containing 'width' and 'height' properties.
     */
    static getElementDimensions(element) {
        const rect = element.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height,
        };
    }
    /**
     * Copies the styles from one HTML element to another.
     * @param {HTMLElement} sourceElement - The HTML element whose styles will be copied.
     * @param {HTMLElement} targetElement - The HTML element to which styles will be applied.
     */
    static copyStyles(sourceElement, targetElement) {
        const computedStyles = getComputedStyle(sourceElement);
        for (const property of computedStyles) {
            const propertyValue = getComputedStyle(sourceElement, property);
            targetElement.style[property] = propertyValue;
        }
    }
}