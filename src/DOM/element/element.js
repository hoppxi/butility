
/**
 * @author - Ermiyas Arage
 * @license MIT
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
     * @param {boolean} [options.draggable] - Whether the element should be draggable.
     * @param {string} [options.style] - Optional inline styles to set on the element.
     * @param {boolean} [options.trackMutation] - Whether to monitor changes to the element.
     * @param {Function} [callback] - A callback function to perform additional operations on the created element.
     * @returns {HTMLElement} The created HTML element.
     * @throws Will throw an error if required properties are missing.
     */
    static create(options, callback) {
        if (!options || !options.name) {
            throw new Error("Element creation requires a 'name' property.");
        }

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

        if (options.draggable) {
            element.draggable = true;
        }

        if (options.style) {
            element.style.cssText = options.style;
        }

        // Observe mutations if specified
        if (options.trackMutation) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    console.log('Mutation observed:', mutation);
                });
            });
            observer.observe(element, { attributes: true, childList: true, subtree: true });
        }

        if (callback && typeof callback === 'function') {
            callback(element);
        }

        return element;
    }

    /**
     * Set the HTML content of an element with additional script evaluation.
     * @param {HTMLElement} element - The target element.
     * @param {string} htmlContent - The HTML content to set.
     * @param {boolean} [evaluateScripts=false] - Whether to evaluate <script> tags in the content.
     */
    static setHTML(element, htmlContent, evaluateScripts = false) {
        element.innerHTML = htmlContent;
        
        if (evaluateScripts) {
            const scripts = element.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                script.replaceWith(newScript);
            });
        }
    }


    /**
     * Get the HTML content of an element and sanitize it to prevent XSS attacks.
     * @param {HTMLElement} element - The target element.
     * @returns {string} - The sanitized HTML content of the element.
     */
    static getHTML(element) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = element.innerHTML;
        tempDiv.querySelectorAll('script, iframe, link').forEach(node => node.remove());
        return tempDiv.innerHTML;
    }

    /**
     * Set the text content of an element with optional transformation.
     * @param {HTMLElement} element - The target element.
     * @param {string} textContent - The text content to set.
     * @param {Object} [options] - Optional transformations for the text content.
     * @param {boolean} [options.toUpperCase] - Whether to convert the text to uppercase.
     * @param {boolean} [options.toLowerCase] - Whether to convert the text to lowercase.
     */
    static setText(element, textContent, options = {}) {
        if (options.toUpperCase) {
            textContent = textContent.toUpperCase();
        }
        if (options.toLowerCase) {
            textContent = textContent.toLowerCase();
        }
        element.textContent = textContent;
    }

    /**
     * Append a child element to a parent element with recursion.
     * @param {HTMLElement} parentElement - The parent element.
     * @param {HTMLElement} childElement - The child element to append.
     * @param {boolean} [recursive=false] - Whether to recursively append all child nodes.
     */
    static appendElement(parentElement, childElement, recursive = false) {
        if (recursive && childElement.childNodes.length) {
            childElement.childNodes.forEach(child => {
                if (child instanceof HTMLElement) {
                    parentElement.appendChild(child.cloneNode(true));
                }
            });
        } else {
            parentElement.appendChild(childElement);
        }
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
     * Generate a unique id with an optional prefix.
     * @param {string} prefix - The optional prefix for the id.
     * @returns {string} - The generated unique id.
     */
    static generateUniqueId(prefix) {
        return (prefix || '') + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Enable event delegation for a parent element.
     * @param {HTMLElement} parentElement - The parent element where the event is bound.
     * @param {string} childSelector - The selector for child elements.
     * @param {string} eventType - The event type to delegate.
     * @param {Function} handler - The event handler.
     */
    static delegateEvent(parentElement, childSelector, eventType, handler) {
        parentElement.addEventListener(eventType, (event) => {
            const potentialElements = parentElement.querySelectorAll(childSelector);
            potentialElements.forEach((el) => {
                if (el === event.target || el.contains(event.target)) {
                    handler.call(el, event);
                }
            });
        });
    }

    /**
     * Clone an element deeply with data attributes, styles, and listeners.
     * @param {HTMLElement} element - The element to clone.
     * @param {boolean} [deepClone=true] - Whether to deeply clone all child elements.
     * @param {boolean} [cloneListeners=false] - Whether to clone event listeners.
     * @returns {HTMLElement} The cloned element.
     */
    static cloneElement(element, deepClone = true, cloneListeners = false) {
        const clone = element.cloneNode(deepClone);

        if (cloneListeners) {
            // Clone event listeners (listeners would have to be explicitly tracked)
            const listeners = getEventListeners(element); // Hypothetical method
            listeners.forEach(listener => clone.addEventListener(listener.type, listener.handler));
        }

        return clone;
    }
}
