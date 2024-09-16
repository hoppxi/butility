
/**
 * @author - Ermiyas Arage
 * @license MIT
 */


/**
 * Utility class for working with HTML element attributes.
 * @class
 */
export class Attribute {
    /**
     * Set the value of an attribute on an element with additional validation.
     * Also ensures the attribute name follows HTML5 standards and allows setting custom data attributes.
     * @param {HTMLElement} element - The target element.
     * @param {string} attributeName - The name of the attribute.
     * @param {string} attributeValue - The value to set for the attribute.
     */
    static setElementAttribute(element, attributeName, attributeValue) {
        if (!element || !(element instanceof HTMLElement)) {
            throw new Error('Invalid HTMLElement provided.');
        }
        if (typeof attributeName !== 'string' || attributeName.trim() === '') {
            throw new Error('Attribute name must be a non-empty string.');
        }

        if (/^data-/.test(attributeName)) {
            element.dataset[attributeName.slice(5)] = attributeValue; // Custom data attribute support
        } else {
            element.setAttribute(attributeName, attributeValue);
        }
    }

    /**
     * Remove an attribute from an element, with safe checks.
     * Also handles the removal of data attributes.
     * @param {HTMLElement} element - The target element.
     * @param {string} attributeName - The name of the attribute to remove.
     */
    static removeElementAttribute(element, attributeName) {
        if (!element || !(element instanceof HTMLElement)) {
            throw new Error('Invalid HTMLElement provided.');
        }

        if (/^data-/.test(attributeName)) {
            delete element.dataset[attributeName.slice(5)];
        } else if (element.hasAttribute(attributeName)) {
            element.removeAttribute(attributeName);
        } else {
            console.warn(`Attribute "${attributeName}" does not exist on`, element);
        }
    }

    /**
     * Get the value of an attribute on an element.
     * Also supports getting values of custom data attributes.
     * @param {HTMLElement} element - The target element.
     * @param {string} attributeName - The name of the attribute.
     * @returns {string|null} - The value of the attribute or null if not set.
     */
    static getElementAttribute(element, attributeName) {
        if (!element || !(element instanceof HTMLElement)) {
            throw new Error('Invalid HTMLElement provided.');
        }
        return /^data-/.test(attributeName)
            ? element.dataset[attributeName.slice(5)] || null
            : element.getAttribute(attributeName);
    }

    /**
     * Set multiple attributes on an element, optimized with batch processing.
     * Supports setting both regular and data attributes in bulk.
     * @param {HTMLElement} element - The target element.
     * @param {Object} attributes - An object where keys are attribute names and values are attribute values.
     */
    static setElementAttributes(element, attributes) {
        if (!element || !(element instanceof HTMLElement)) {
            throw new Error('Invalid HTMLElement provided.');
        }
        if (!attributes || typeof attributes !== 'object') {
            throw new Error('Attributes must be a valid object.');
        }

        Object.keys(attributes).forEach((attributeName) => {
            if (/^data-/.test(attributeName)) {
                element.dataset[attributeName.slice(5)] = attributes[attributeName];
            } else {
                element.setAttribute(attributeName, attributes[attributeName]);
            }
        });
        console.log(`Attributes set:`, attributes, 'on', element);
    }

    /**
     * Get all attributes and their values from an element, including data attributes.
     * @param {HTMLElement} element - The target element.
     * @returns {Object} - An object containing all attributes and their values.
     */
    static getAllElementAttributes(element) {
        if (!element || !(element instanceof HTMLElement)) {
            throw new Error('Invalid HTMLElement provided.');
        }

        const attributes = {};
        Array.from(element.attributes).forEach(attr => {
            attributes[attr.name] = attr.value;
        });

        // Include dataset (data-* attributes)
        Object.keys(element.dataset).forEach(dataKey => {
            attributes[`data-${dataKey}`] = element.dataset[dataKey];
        });

        return attributes;
    }

    /**
     * Check if an element has a specific attribute.
     * Also checks for data attributes.
     * @param {HTMLElement} element - The target element.
     * @param {string} attributeName - The name of the attribute to check.
     * @returns {boolean} - True if the element has the attribute, false otherwise.
     */
    static hasElementAttribute(element, attributeName) {
        if (!element || !(element instanceof HTMLElement)) {
            throw new Error('Invalid HTMLElement provided.');
        }

        return /^data-/.test(attributeName)
            ? attributeName.slice(5) in element.dataset
            : element.hasAttribute(attributeName);
    }

    /**
     * Toggle the presence of an attribute on an element.
     * Supports toggling between true/false values for boolean attributes.
     * @param {HTMLElement} element - The target element.
     * @param {string} attributeName - The name of the attribute to toggle.
     */
    static toggleElementAttribute(element, attributeName) {
        if (!element || !(element instanceof HTMLElement)) {
            throw new Error('Invalid HTMLElement provided.');
        }

        if (this.hasElementAttribute(element, attributeName)) {
            this.removeElementAttribute(element, attributeName);
        } else {
            this.setElementAttribute(element, attributeName, '');
        }
        console.log(`Attribute "${attributeName}" toggled on`, element);
    }

    /**
     * Remove all attributes from an element, including data attributes.
     * Optimized for performance by batching removal operations.
     * @param {HTMLElement} element - The target element.
     */
    static removeAllElementAttributes(element) {
        if (!element || !(element instanceof HTMLElement)) {
            throw new Error('Invalid HTMLElement provided.');
        }

        Array.from(element.attributes).forEach(attr => {
            element.removeAttribute(attr.name);
        });

        // Remove dataset (data-* attributes)
        Object.keys(element.dataset).forEach(dataKey => {
            delete element.dataset[dataKey];
        });

        console.log(`All attributes removed from`, element);
    }
}
