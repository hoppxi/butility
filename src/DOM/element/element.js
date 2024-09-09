
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */


/**
 * Utility class for working with HTML elements.
 * @class
 */
export class Element {

    /**
     * Creates an HTML element with the specified options.
     * @param {Object} options - The options for creating the element.
     * @param {string} options.name - The tag name of the element.
     * @param {Array<string>} [options.class] - The classes to add to the element.
     * @param {Object<string, string>} [options.attr] - The attributes to set for the element.
     * @param {string} [options.innerText] - The inner text of the element.
     * @param {string} [options.innerHTML] - The inner HTML of the element.
     * @param {Array<HTMLElement>} [options.children] - The child elements to append to the element.
     * @param {Function} [callback] - A callback function to perform additional operations on the created element.
     * @returns {HTMLElement} The created HTML element.
     */
    static createElement(options, callback) {
        const element = document.createElement(options.name);
    
        if (options.class && Array.isArray(options.class)) {
            options.class.forEach(className => {
                if (className) {
                    element.classList.add(className);
                }
            });
        }
    
        if (options.attr) {
            for (const key in options.attr) {
                if (Object.hasOwnProperty.call(options.attr, key)) {
                    element.setAttribute(key, options.attr[key]);
                }
            }
        }
    
        if (options.innerText) {
            element.innerText = options.innerText;
        } else if (options.innerHTML) {
            element.innerHTML = options.innerHTML;
        }
    
        if (options.children && Array.isArray(options.children)) {
            options.children.forEach(child => {
                if (child instanceof HTMLElement) {
                    element.appendChild(child);
                }
            });
        }
    
        if (callback && typeof callback === 'function') {
            callback(element);
        }
    
        return element;
    }

    /**
     * Set the HTML content of an element.
     * @param {HTMLElement} element - The target element.
     * @param {string} htmlContent - The HTML content to set.
     */
    static setElementHTML(element, htmlContent) {
        element.innerHTML = htmlContent;
    }

    /**
     * Get the HTML content of an element.
     * @param {HTMLElement} element - The target element.
     * @returns {string} - The HTML content of the element.
     */
    static getElementHTML(element) {
        return element.innerHTML;
    }

    /**
     * Set the text content of an element.
     * @param {HTMLElement} element - The target element.
     * @param {string} textContent - The text content to set.
     */
    static setElementText(element, textContent) {
        element.textContent = textContent;
    }

    /**
     * Get the text content of an element.
     * @param {HTMLElement} element - The target element.
     * @returns {string} - The text content of the element.
     */
    static getElementText(element) {
        return element.textContent;
    }

    /**
     * Append a child element to a parent element.
     * @param {HTMLElement} parentElement - The parent element.
     * @param {HTMLElement} childElement - The child element to append.
     */
    static appendElement(parentElement, childElement) {
        parentElement.appendChild(childElement);
    }

    /**
     * Appends multiple child elements to a parent element.
     * @param {HTMLElement} parentElement - The parent element to which child elements will be appended.
     * @param {...HTMLElement} childNodes - The child nodes to be appended.
     */
    static appendElements(parentElement, ...childNodes) {
        childNodes.forEach(childNode => {
            parentElement.appendChild(childNode);
        });
    }
    
    /**
     * Removes a specified element from the DOM.
     * @param {HTMLElement} element - The element to be removed from the DOM.
     */
    static removeElement(element) {
        element.remove();
    }

    /**
     * Prepend a child element to a parent element.
     * @param {HTMLElement} parentElement - The parent element.
     * @param {HTMLElement} childElement - The child element to prepend.
     */
    static prependElement(parentElement, childElement) {
        parentElement.insertBefore(childElement, parentElement.firstChild);
    }

    /**
     * Clone an element with its classes to another element.
     * @param {HTMLElement} sourceElement - The element to clone.
     * @param {HTMLElement} targetElement - The element to which the clone will be appended.
     */
    static cloneElementWithClasses(sourceElement, targetElement) {
        const clonedElement = sourceElement.cloneNode(true);
        targetElement.appendChild(clonedElement);
    }

    /**
     * Wrap an element with another wrapper element.
     * @param {HTMLElement} element - The element to wrap.
     * @param {HTMLElement} wrapperElement - The wrapper element.
     */
    static wrapElement(element, wrapperElement) {
        element.parentNode.insertBefore(wrapperElement, element);
        wrapperElement.appendChild(element);
    }

        /**
     * Unwrap an element by removing its parent and placing its children in its position.
     * @param {HTMLElement} element - The element to unwrap.
     */
    static unwrapElement(element) {
        const parent = element.parentNode;
        while (element.firstChild) {
            parent.insertBefore(element.firstChild, element);
        }
        parent.removeChild(element);
    }

    /**
     * Get the next sibling element of an element.
     * @param {HTMLElement} element - The target element.
     * @returns {HTMLElement|null} - The next sibling element or null if no next sibling exists.
     */
    static getNextSiblingElement(element) {
        return element.nextElementSibling;
    }

    /**
     * Get the previous sibling element of an element.
     * @param {HTMLElement} element - The target element.
     * @returns {HTMLElement|null} - The previous sibling element or null if no previous sibling exists.
     */
    static getPreviousSiblingElement(element) {
        return element.previousElementSibling;
    }

    /**
     * Empty the content of an element by removing all its child nodes.
     * @param {HTMLElement} element - The target element.
     */
    static emptyElement(element) {
        element.innerHTML = '';
    }

    /**
     * Check if an element is currently visible in the viewport.
     * @param {HTMLElement} element - The element to check.
     * @returns {boolean} - True if the element is visible, false otherwise.
     */
    static isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    }

    /**
     * Check if an element is currently hidden.
     * @param {HTMLElement} element - The element to check.
     * @returns {boolean} - True if the element is hidden, false otherwise.
     */
    static isElementHidden(element) {
        return element.offsetParent === null;
    }

    /**
     * Get the first child element of a parent element.
     * @param {HTMLElement} parentElement - The parent element.
     * @returns {HTMLElement|null} - The first child element or null if no child element exists.
     */
    static getFirstChildElement(parentElement) {
        return parentElement.firstElementChild;
    }

    /**
     * Get the last child element of a parent element.
     * @param {HTMLElement} parentElement - The parent element.
     * @returns {HTMLElement|null} - The last child element or null if no child element exists.
     */
    static getLastChildElement(parentElement) {
        return parentElement.lastElementChild;
    }

    /**
     * Get child elements of a parent element by a specific class.
     * @param {HTMLElement} parentElement - The parent element.
     * @param {string} className - The class name to filter child elements.
     * @returns {Array<HTMLElement>} - An array of child elements with the specified class.
     */
    static getChildrenByClass(parentElement, className) {
        return Array.from(parentElement.getElementsByClassName(className));
    }

    /**
     * Get elements by a CSS selector within a specific context.
     * @param {string} selector - The CSS selector.
     * @param {HTMLElement|Document} context - The context within which to search for elements.
     * @returns {Array<HTMLElement>} - An array of elements matching the selector within the given context.
     */
    static getElementsBySelector(selector, context) {
        return Array.from((context || document).querySelectorAll(selector));
    }

    /**
     * Get the closest ancestor element matching a selector.
     * @param {HTMLElement} element - The target element.
     * @param {string} selector - The CSS selector to match.
     * @returns {HTMLElement|null} - The closest ancestor element matching the selector, or null if not found.
     */
    static getClosestElement(element, selector) {
        return element.closest(selector);
    }

    /**
     * Find the first parent element matching a selector.
     * @param {HTMLElement} element - The target element.
     * @param {string} selector - The CSS selector to match.
     * @returns {HTMLElement|null} - The first parent element matching the selector, or null if not found.
     */
    static findParentElement(element, selector) {
        let currentElement = element.parentElement;
        while (currentElement && !currentElement.matches(selector)) {
            currentElement = currentElement.parentElement;
        }
        return currentElement;
    }

    /**
     * Find all ancestors of an element matching a selector.
     * @param {HTMLElement} element - The target element.
     * @param {string} selector - The CSS selector to match.
     * @returns {Array<HTMLElement>} - An array of ancestor elements matching the selector.
     */
    static findAncestors(element, selector) {
        const ancestors = [];
        let currentElement = element.parentElement;
        while (currentElement) {
            if (currentElement.matches(selector)) {
                ancestors.push(currentElement);
            }
            currentElement = currentElement.parentElement;
        }
        return ancestors;
    }

    /**
     * Find all descendants of a parent element matching a selector.
     * @param {HTMLElement} parentElement - The parent element.
     * @param {string} selector - The CSS selector to match.
     * @returns {Array<HTMLElement>} - An array of descendant elements matching the selector.
     */
    static findDescendants(parentElement, selector) {
        return Array.from(parentElement.querySelectorAll(selector));
    }

    /**
     * Check if an element matches a CSS selector.
     * @param {HTMLElement} element - The target element.
     * @param {string} selector - The CSS selector to match.
     * @returns {boolean} - True if the element matches the selector, false otherwise.
     */
    static matchesSelector(element, selector) {
        return element.matches(selector);
    }

    /**
     * Find the closest common ancestor of an array of elements.
     * @param {Array<HTMLElement>} elements - The array of elements.
     * @returns {HTMLElement|null} - The closest common ancestor, or null if not found.
     */
    static closestCommonAncestor(elements) {
        const set1 = new Set();
        let currentElement = elements[0];
        while (currentElement) {
            set1.add(currentElement);
            currentElement = currentElement.parentElement;
        }

        for (let i = 1; i < elements.length; i++) {
            currentElement = elements[i];
            while (currentElement) {
                if (set1.has(currentElement)) {
                    return currentElement;
                }
                currentElement = currentElement.parentElement;
            }
        }

        return null;
    }

    /**
     * Set data attribute on an element.
     * @param {HTMLElement} element - The target element.
     * @param {string} key - The data attribute key.
     * @param {string} value - The data attribute value.
     */
    static setElementData(element, key, value) {
        element.dataset[key] = value;
    }

    /**
     * Get the value of a data attribute on an element.
     * @param {HTMLElement} element - The target element.
     * @param {string} key - The data attribute key.
     * @returns {string|null} - The value of the data attribute or null if the attribute is not set.
     */
    static getElementData(element, key) {
        return element.dataset[key];
    }

    /**
     * Remove a data attribute from an element.
     * @param {HTMLElement} element - The target element.
     * @param {string} key - The data attribute key to remove.
     */
    static removeElementData(element, key) {
        delete element.dataset[key];
    }

    /**
     * Clear all data attributes from an element.
     * @param {HTMLElement} element - The target element.
     */
    static clearElementData(element) {
        for (const key in element.dataset) {
            delete element.dataset[key];
        }
    }

    /**
     * Get all data attributes and their values from an element.
     * @param {HTMLElement} element - The target element.
     * @returns {Object} - An object containing all data attributes and their values.
     */
    static getDataAttributes(element) {
        return { ...element.dataset };
    }

    /**
     * Set the id attribute of an element.
     * @param {HTMLElement} element - The target element.
     * @param {string} newId - The new id value.
     */
    static setElementId(element, newId) {
        element.id = newId;
    }

    /**
     * Get the id attribute of an element.
     * @param {HTMLElement} element - The target element.
     * @returns {string} - The id attribute value.
     */
    static getElementId(element) {
        return element.id;
    }

    /**
     * Generate a unique id with an optional prefix.
     * @param {string} prefix - The optional prefix for the id.
     * @returns {string} - The generated unique id.
     */
    static generateUniqueId(prefix) {
        return (prefix || '') + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Set a property on an element.
     * @param {HTMLElement} element - The target element.
     * @param {string} propertyName - The name of the property to set.
     * @param {any} propertyValue - The value to set for the property.
     */
    static setElementProperty(element, propertyName, propertyValue) {
        element[propertyName] = propertyValue;
    }

    /**
     * Get the value of a property on an element.
     * @param {HTMLElement} element - The target element.
     * @param {string} propertyName - The name of the property to get.
     * @returns {any} - The value of the property.
     */
    static getElementProperty(element, propertyName) {
        return element[propertyName];
    }

    /**
     * Remove a property from an element.
     * @param {HTMLElement} element - The target element.
     * @param {string} propertyName - The name of the property to remove.
     */
    static removeElementProperty(element, propertyName) {
        delete element[propertyName];
    }
}
