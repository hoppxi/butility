
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
     * Set the value of an attribute on an element.
     * @param {HTMLElement} element - The target element.
     * @param {string} attributeName - The name of the attribute.
     * @param {string} attributeValue - The value to set for the attribute.
     */
    static setElementAttribute(element, attributeName, attributeValue) {
        element.setAttribute(attributeName, attributeValue);
    }

    /**
     * Remove an attribute from an element.
     * @param {HTMLElement} element - The target element.
     * @param {string} attributeName - The name of the attribute to remove.
     */
    static removeElementAttribute(element, attributeName) {
        element.removeAttribute(attributeName);
    }

    /**
     * Get the value of an attribute on an element.
     * @param {HTMLElement} element - The target element.
     * @param {string} attributeName - The name of the attribute.
     * @returns {string|null} - The value of the attribute or null if the attribute is not set.
     */
    static getElementAttribute(element, attributeName) {
        return element.getAttribute(attributeName);
    }

    /**
     * Set multiple attributes on an element.
     * @param {HTMLElement} element - The target element.
     * @param {Object} attributes - An object where keys are attribute names and values are attribute values.
     */
    static setElementAttributes(element, attributes) {
        for (const attributeName in attributes) {
            if (Object.prototype.hasOwnProperty.call(attributes, attributeName)) {
                element.setAttribute(attributeName, attributes[attributeName]);
            }
        }
    }

    /**
     * Get all attributes and their values from an element.
     * @param {HTMLElement} element - The target element.
     * @returns {Object} - An object containing all attributes and their values.
     */
    static getAllElementAttributes(element) {
        const attributes = {};
        for (const attr of element.attributes) {
            attributes[attr.name] = attr.value;
        }
        return attributes;
    }

    /**
     * Check if an element has a specific attribute.
     * @param {HTMLElement} element - The target element.
     * @param {string} attributeName - The name of the attribute to check.
     * @returns {boolean} - True if the element has the attribute, false otherwise.
     */
    static hasElementAttribute(element, attributeName) {
        return element.hasAttribute(attributeName);
    }

    /**
     * Toggle the presence of an attribute on an element.
     * If the attribute exists, it will be removed; if it doesn't exist, it will be added.
     * @param {HTMLElement} element - The target element.
     * @param {string} attributeName - The name of the attribute to toggle.
     */
    static toggleElementAttribute(element, attributeName) {
        if (this.hasElementAttribute(element, attributeName)) {
            this.removeElementAttribute(element, attributeName);
        } else {
            this.setElementAttribute(element, attributeName, '');
        }
    }

    /**
     * Remove all attributes from an element.
     * @param {HTMLElement} element - The target element.
     */
    static removeAllElementAttributes(element) {
        for (const attr of element.attributes) {
            element.removeAttribute(attr.name);
        }
    }
}
