(() => {
  // src/DOM/element/element.js
  var Element = class {
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
    static createElement(options, callback2) {
      const element = document.createElement(options.name);
      if (options.class && Array.isArray(options.class)) {
        options.class.forEach((className) => {
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
        options.children.forEach((child) => {
          if (child instanceof HTMLElement) {
            element.appendChild(child);
          }
        });
      }
      if (callback2 && typeof callback2 === "function") {
        callback2(element);
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
      childNodes.forEach((childNode) => {
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
      element.innerHTML = "";
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
      const set1 = /* @__PURE__ */ new Set();
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
      return (prefix || "") + Math.random().toString(36).substr(2, 9);
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
  };

  // src/DOM/element/attribute.js
  var Attribute = class _Attribute {
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
      if (_Attribute.hasElementAttribute(element, attributeName)) {
        _Attribute.removeElementAttribute(element, attributeName);
      } else {
        _Attribute.setElementAttribute(element, attributeName, "");
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
  };

  // src/DOM/composite/object.js
  var Obj = class _Obj {
    /**
     * Compare two objects for equality.
     * @param {Object} obj1 - The first object.
     * @param {Object} obj2 - The second object.
     * @returns {boolean} - True if the objects are equal, false otherwise.
     */
    static compareObjects(obj1, obj2) {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    /**
     * Deep clone an object.
     * @param {Object} obj - The object to clone.
     * @returns {Object} - The cloned object.
     */
    static deepCloneObject(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    /**
     * Deep merge two objects.
     * @param {Object} target - The target object.
     * @param {Object} source - The source object.
     * @returns {Object} - The merged object.
     */
    static deepMergeObjects(target, source) {
      const merged = { ...target };
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          if (merged.hasOwnProperty(key) && typeof merged[key] === "object" && typeof source[key] === "object") {
            merged[key] = _Obj.deepMergeObjects(merged[key], source[key]);
          } else {
            merged[key] = source[key];
          }
        }
      }
      return merged;
    }
    /**
     * Deep freeze an object.
     * @param {Object} obj - The object to freeze.
     * @returns {Object} - The frozen object.
     */
    static deepFreezeObject(obj) {
      const keys = Object.keys(obj);
      keys.forEach((key) => {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          _Obj.deepFreezeObject(obj[key]);
        }
      });
      return Object.freeze(obj);
    }
    /**
     * Check if an object is a plain object.
     * @param {Object} obj - The object to check.
     * @returns {boolean} - True if the object is a plain object, false otherwise.
     */
    static isPlainObject(obj) {
      return typeof obj === "object" && obj !== null && obj.constructor === Object;
    }
    /**
     * Check if an object is empty (has no own properties).
     * @param {Object} obj - The object to check.
     * @returns {boolean} - True if the object is empty, false otherwise.
     */
    static isObjectEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
    /**
     * Check if two objects are equal.
     * @param {Object} obj1 - The first object.
     * @param {Object} obj2 - The second object.
     * @returns {boolean} - True if the objects are equal, false otherwise.
     */
    static isObjectEqual(obj1, obj2) {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    /**
     * Check if an object is a subset of another object.
     * @param {Object} subset - The potential subset.
     * @param {Object} superset - The superset.
     * @returns {boolean} - True if the subset is a subset of the superset, false otherwise.
     */
    static isObjectSubset(subset, superset) {
      for (const key in subset) {
        if (subset.hasOwnProperty(key) && superset.hasOwnProperty(key)) {
          if (typeof subset[key] === "object" && typeof superset[key] === "object") {
            if (!_Obj.isObjectSubset(subset[key], superset[key])) {
              return false;
            }
          } else if (subset[key] !== superset[key]) {
            return false;
          }
        } else {
          return false;
        }
      }
      return true;
    }
    /**
     * Get the keys of an object.
     * @param {Object} obj - The object.
     * @returns {Array} - An array containing the keys of the object.
     */
    static getObjectKeys(obj) {
      return Object.keys(obj);
    }
    /**
     * Get the values of an object.
     * @param {Object} obj - The object.
     * @returns {Array} - An array containing the values of the object.
     */
    static getObjectValues(obj) {
      return Object.values(obj);
    }
    /**
     * Get the entries of an object (key-value pairs).
     * @param {Object} obj - The object.
     * @returns {Array} - An array containing the entries of the object.
     */
    static getObjectEntries(obj) {
      return Object.entries(obj);
    }
    /**
     * Map over the values of an object and apply a function.
     * @param {Object} obj - The object.
     * @param {Function} callback - The function to apply to each value.
     * @returns {Object} - A new object with the same keys and the modified values.
     */
    static objectMap(obj, callback2) {
      const mappedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          mappedObj[key] = callback2(obj[key], key, obj);
        }
      }
      return mappedObj;
    }
    /**
     * Filter an object based on a predicate function.
     * @param {Object} obj - The object.
     * @param {Function} predicate - The predicate function to filter values.
     * @returns {Object} - A new object containing only the values that satisfy the predicate.
     */
    static objectFilter(obj, predicate) {
      const filteredObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && predicate(obj[key], key, obj)) {
          filteredObj[key] = obj[key];
        }
      }
      return filteredObj;
    }
    /**
     * Reduce an object to a single value using a callback function.
     * @param {Object} obj - The object.
     * @param {Function} callback - The callback function to execute on each value.
     * @param {*} initialValue - The initial value for the reduction.
     * @returns {*} - The final reduced value.
     */
    static objectReduce(obj, callback2, initialValue) {
      let accumulator = initialValue;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          accumulator = callback2(accumulator, obj[key], key, obj);
        }
      }
      return accumulator;
    }
    /**
     * Iterate over the values of an object and apply a function.
     * @param {Object} obj - The object.
     * @param {Function} callback - The function to apply to each value.
     */
    static objectForEach(obj, callback2) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          callback2(obj[key], key, obj);
        }
      }
    }
    /**
     * Pick specified keys from an object.
     * @param {Object} obj - The object.
     * @param {Array} keys - An array of keys to pick.
     * @returns {Object} - A new object containing only the specified keys.
     */
    static objectPick(obj, keys) {
      const pickedObj = {};
      keys.forEach((key) => {
        if (obj.hasOwnProperty(key)) {
          pickedObj[key] = obj[key];
        }
      });
      return pickedObj;
    }
    /**
     * Omit specified keys from an object.
     * @param {Object} obj - The object.
     * @param {Array} keys - An array of keys to omit.
     * @returns {Object} - A new object excluding the specified keys.
     */
    static objectOmit(obj, keys) {
      const omittedObj = { ...obj };
      keys.forEach((key) => {
        if (omittedObj.hasOwnProperty(key)) {
          delete omittedObj[key];
        }
      });
      return omittedObj;
    }
    /**
     * Rename keys in an object based on a provided key mapping.
     * @param {Object} obj - The object.
     * @param {Object} keyMap - An object representing the key mapping, where keys are old keys and values are new keys.
     * @returns {Object} - A new object with keys renamed according to the key mapping.
     */
    static objectRenameKeys(obj, keyMap) {
      const renamedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const newKey = keyMap[key] || key;
          renamedObj[newKey] = obj[key];
        }
      }
      return renamedObj;
    }
    /**
     * Flip keys and values in an object.
     * @param {Object} obj - The object.
     * @returns {Object} - A new object with keys and values swapped.
     */
    static objectFlipKeys(obj) {
      const flippedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          flippedObj[obj[key]] = key;
        }
      }
      return flippedObj;
    }
    /**
     * Merge two objects.
     * @param {Object} obj1 - The first object.
     * @param {Object} obj2 - The second object.
     * @returns {Object} - A new object containing the merged properties of obj1 and obj2.
     */
    static objectMerge(obj1, obj2) {
      return { ...obj1, ...obj2 };
    }
    /**
     * Zip two arrays into an object where the elements of the first array become keys and the elements of the second array become values.
     * @param {Array} keys - The array of keys.
     * @param {Array} values - The array of values.
     * @returns {Object} - A new object zipped from the keys and values arrays.
     */
    static objectZip(keys, values) {
      const zippedObj = {};
      keys.forEach((key, index) => {
        zippedObj[key] = values[index];
      });
      return zippedObj;
    }
    /**
     * Convert an object to a query string.
     * @param {Object} obj - The object.
     * @returns {string} - A query string representation of the object.
     */
    static objectToQueryString(obj) {
      const queryString = Object.entries(obj).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");
      return queryString;
    }
    /**
     * Convert a query string to an object.
     * @param {string} queryString - The query string.
     * @returns {Object} - An object representation of the query string.
     */
    static queryStringToObject(queryString) {
      const obj = {};
      const params = new URLSearchParams(queryString);
      params.forEach((value, key) => {
        obj[key] = value;
      });
      return obj;
    }
  };

  // src/DOM/composite/string.js
  var String2 = class {
    /**
     * Check if a string is empty.
     * @param {string} value - The string to check.
     * @returns {boolean} - True if the string is empty, false otherwise.
     */
    static isEmptyString(value) {
      return value.trim() === "";
    }
    /**
     * Trim leading and trailing whitespace from a string.
     * @param {string} value - The string to trim.
     * @returns {string} - The trimmed string.
     */
    static trimString(value) {
      return value.trim();
    }
    /**
     * Capitalize the first letter of a string.
     * @param {string} value - The string to capitalize.
     * @returns {string} - The capitalized string.
     */
    static capitalizeString(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    /**
     * Check if a string starts with a specific substring.
     * @param {string} mainString - The main string.
     * @param {string} searchString - The substring to check for.
     * @returns {boolean} - True if the string starts with the substring, false otherwise.
     */
    static startsWithString(mainString, searchString) {
      return mainString.startsWith(searchString);
    }
    /**
     * Check if a string ends with a specific substring.
     * @param {string} mainString - The main string.
     * @param {string} searchString - The substring to check for.
     * @returns {boolean} - True if the string ends with the substring, false otherwise.
     */
    static endsWithString(mainString, searchString) {
      return mainString.endsWith(searchString);
    }
    /**
     * Check if a string contains a specific substring.
     * @param {string} mainString - The main string.
     * @param {string} searchString - The substring to check for.
     * @returns {boolean} - True if the string contains the substring, false otherwise.
     */
    static containsString(mainString, searchString) {
      return mainString.includes(searchString);
    }
    /**
     * Replace all occurrences of a substring in a string.
     * @param {string} mainString - The main string.
     * @param {string} searchString - The substring to replace.
     * @param {string} replacement - The string to replace with.
     * @returns {string} - The modified string.
     */
    static replaceAllOccurrences(mainString, searchString, replacement) {
      return mainString.split(searchString).join(replacement);
    }
    /**
     * Format a string using values.
     * @param {string} template - The string template with placeholders.
     * @param {Object} values - The values to replace placeholders in the template.
     * @returns {string} - The formatted string.
     */
    static formatString(template, values) {
      return template.replace(/{([^{}]*)}/g, (match, key) => values[key]);
    }
    /**
     * Generate a random string of a specified length.
     * @param {number} length - The length of the random string.
     * @returns {string} - The generated random string.
     */
    static generateRandomString(length) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let randomString = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }
      return randomString;
    }
  };

  // src/DOM/styling/color.js
  var Color = class _Color {
    /**
     * Convert RGB values to Hex color code.
     * @param {number} r - Red value (0-255).
     * @param {number} g - Green value (0-255).
     * @param {number} b - Blue value (0-255).
     * @returns {string} Hex color code.
     */
    static rgbToHex(r, g, b) {
      const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      };
      return "#" + toHex(r) + toHex(g) + toHex(b);
    }
    /**
     * Convert Hex color code to RGB values.
     * @param {string} hex - Hex color code.
     * @returns {?{r: number, g: number, b: number}} RGB values or null if invalid input.
     */
    static hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    /**
     * Convert RGBA values to Hex color code.
     * @param {number} r - Red value (0-255).
     * @param {number} g - Green value (0-255).
     * @param {number} b - Blue value (0-255).
     * @param {number} a - Alpha value (0-1).
     * @returns {string} Hex color code with alpha.
     */
    static rgbaToHex(r, g, b, a) {
      return _Color.rgbToHex(r, g, b) + Math.round(a * 255).toString(16).padStart(2, "0");
    }
    /**
     * Convert Hex color code to RGBA string.
     * @param {string} hex - Hex color code.
     * @param {number} a - Alpha value (0-1).
     * @returns {?string} RGBA string or null if invalid input.
     */
    static hexToRgba(hex, a) {
      const rgb = _Color.hexToRgb(hex);
      return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})` : null;
    }
    /**
     * Calculate color brightness.
     * @param {string} color - Hex color code.
     * @returns {?number} Color brightness (0-1) or null if invalid input.
     */
    static colorBrightness(color) {
      const rgb = _Color.hexToRgb(color);
      return rgb ? (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255 : null;
    }
    /**
     * Calculate color contrast between two colors.
     * @param {string} color1 - Hex color code.
     * @param {string} color2 - Hex color code.
     * @returns {?number} Color contrast (0-1) or null if invalid input.
     */
    static colorContrast(color1, color2) {
      const brightness1 = _Color.colorBrightness(color1);
      const brightness2 = _Color.colorBrightness(color2);
      if (brightness1 !== null && brightness2 !== null) {
        return Math.abs(brightness1 - brightness2);
      }
      return null;
    }
    /**
     * Generate a random Hex color code.
     * @returns {string} Random Hex color code.
     */
    static generateRandomColor() {
      const randomColorComponent = () => Math.floor(Math.random() * 256);
      return _Color.rgbToHex(randomColorComponent(), randomColorComponent(), randomColorComponent());
    }
    /**
     * Darkens a given color by a specified percentage.
     * @param {string} color - The input color (hexadecimal or RGB).
     * @param {number} percentage - The percentage by which to darken the color.
     * @returns {string} The darkened color.
     */
    static darkenColor(color, percentage) {
      const { r, g, b } = _Color.hexToRgb(color);
      const factor = 1 - percentage / 100;
      const newR = Math.floor(r * factor);
      const newG = Math.floor(g * factor);
      const newB = Math.floor(b * factor);
      return _Color.rgbToHex(newR, newG, newB);
    }
    /**
     * Lightens a given color by a specified percentage.
     * @param {string} color - The input color (hexadecimal or RGB).
     * @param {number} percentage - The percentage by which to lighten the color.
     * @returns {string} The lightened color.
     */
    static lightenColor(color, percentage) {
      const { r, g, b } = _Color.hexToRgb(color);
      const factor = 1 + percentage / 100;
      const newR = Math.min(Math.floor(r * factor), 255);
      const newG = Math.min(Math.floor(g * factor), 255);
      const newB = Math.min(Math.floor(b * factor), 255);
      return _Color.rgbToHex(newR, newG, newB);
    }
    /**
     * Calculates the luminance of a given color.
     * @param {string} color - The input color (hexadecimal or RGB).
     * @returns {number} The luminance value.
     */
    static calculateLuminance(color) {
      const { r, g, b } = _Color.hexToRgb(color);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }
    /**
    * Checks if two colors are equal.
    * @param {string} color1 - The first color (hexadecimal or RGB).
    * @param {string} color2 - The second color (hexadecimal or RGB).
    * @returns {boolean} True if the colors are equal, false otherwise.
    */
    static areColorsEqual(color1, color2) {
      return color1.toLowerCase() === color2.toLowerCase();
    }
    /**
    * Converts HSL (Hue, Saturation, Lightness) values to RGB format.
    * @param {number} hue - The hue value (0-360).
    * @param {number} saturation - The saturation value (0-100).
    * @param {number} lightness - The lightness value (0-100).
    * @returns {Object} An object containing the red, green, and blue components.
    */
    static hslToRgb(hue, saturation, lightness) {
      const h = hue / 360;
      const s = saturation / 100;
      const l = lightness / 100;
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      const rgb = {
        r: Math.round(_Color.hueToRgb(p, q, h + 1 / 3) * 255),
        g: Math.round(_Color.hueToRgb(p, q, h) * 255),
        b: Math.round(_Color.hueToRgb(p, q, h - 1 / 3) * 255)
      };
      return rgb;
    }
    static hueToRgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }
    /**
    * Converts RGB color components to HSL (Hue, Saturation, Lightness) values.
    * @param {number} red - The red component (0-255).
    * @param {number} green - The green component (0-255).
    * @param {number} blue - The blue component (0-255).
    * @returns {Object} An object containing the hue, saturation, and lightness values.
    */
    static rgbToHsl(red, green, blue) {
      const r = red / 255;
      const g = green / 255;
      const b = blue / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;
      let h, s, l;
      if (delta === 0) {
        h = 0;
      } else if (max === r) {
        h = (g - b) / delta % 6;
      } else if (max === g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }
      h = Math.round((h * 60 + 360) % 360);
      l = (max + min) / 2;
      s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      s = Math.round(s * 100);
      l = Math.round(l * 100);
      return { h, s, l };
    }
    /**
    * Mixes two colors together based on a specified weight.
    * @param {string} color1 - The first color (hexadecimal or RGB).
    * @param {string} color2 - The second color (hexadecimal or RGB).
    * @param {number} weight - The weight of the first color in the mixture (0-1).
    * @returns {string} The resulting mixed color.
    */
    static mixColors(color1, color2, weight) {
      const rgb1 = _Color.hexToRgb(color1);
      const rgb2 = _Color.hexToRgb(color2);
      const mixedColor = {
        r: Math.round(rgb1.r * weight + rgb2.r * (1 - weight)),
        g: Math.round(rgb1.g * weight + rgb2.g * (1 - weight)),
        b: Math.round(rgb1.b * weight + rgb2.b * (1 - weight))
      };
      return _Color.rgbToHex(mixedColor.r, mixedColor.g, mixedColor.b);
    }
    /**
    * Generates a gradient of colors between two given colors.
    * @param {string} startColor - The starting color (hexadecimal or RGB).
    * @param {string} endColor - The ending color (hexadecimal or RGB).
    * @param {number} steps - The number of steps in the gradient.
    * @returns {Array} An array of colors representing the gradient.
    */
    static generateColorGradient(startColor, endColor, steps) {
      const gradient = [];
      for (let i = 0; i < steps; i++) {
        const weight = i / (steps - 1);
        const interpolatedColor = _Color.mixColors(startColor, endColor, weight);
        gradient.push(interpolatedColor);
      }
      return gradient;
    }
    /**
    * Inverts the color by subtracting each RGB component from 255.
    * @param {string} color - The input color (hexadecimal or RGB).
    * @returns {string} The inverted color.
    */
    static invertColor(color) {
      const { r, g, b } = _Color.hexToRgb(color);
      const invertedColor = {
        r: 255 - r,
        g: 255 - g,
        b: 255 - b
      };
      return _Color.rgbToHex(invertedColor.r, invertedColor.g, invertedColor.b);
    }
  };

  // src/DOM/styling/style.js
  var Style = class {
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
        element.style[property] = "";
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
      element.style.display = "none";
    }
    /**
     * Sets the display style property of an HTML element to its default value.
     * @param {HTMLElement} element - The HTML element.
     */
    static showElement(element) {
      element.style.display = "";
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
        height: rect.height
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
  };

  // src/DOM/main/utility.js
  var Utility = class _Utility {
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
      element.className = "";
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
        _Utility.addClass(element, trueClass);
        _Utility.removeClass(element, falseClass);
      } else {
        _Utility.addClass(element, falseClass);
        _Utility.removeClass(element, trueClass);
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
        if (typeof className === "string" && element.classList.contains(className)) {
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
      classNames.forEach((className) => {
        if (className.startsWith(oldPrefix)) {
          _Utility.removeClass(className);
          _Utility.addClass(element, className.replace(oldPrefix, newPrefix));
        }
      });
    }
    /**
     * Adds a class to an HTML element only if the class is not already present.
     * @param {HTMLElement} element - The HTML element to add the class to.
     * @param {string} className - The class name to add.
     */
    static addUniqueClass(element, className) {
      if (!_Utility.hasClass(element, className)) {
        _Utility.addClass(element, className);
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
          _Utility.addClass(element, className);
          window.removeEventListener("scroll", handleScroll);
        }
      };
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    /**
     * Toggles a class on focus and removes it on blur.
     * @param {HTMLElement} element - The HTML element to add the class to.
     * @param {string} className - The class name to add.
     */
    static toggleClassOnFocus(element, className) {
      this.element.addEventListener("focus", () => {
        _Utility.addClass(element, className);
      });
      this.element.addEventListener("blur", () => {
        _Utility.removeClass(element, className);
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
          _Utility.toggleClass(element, className);
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
      this.element.addEventListener("copy", () => {
        _Utility.toggleClass(element, className);
      });
    }
    /**
     * Toggles a class on an element based on idle time.
     * @param {HTMLElement} element - The target element.
     * @param {string} className - The class name to toggle.
     * @param {number} [idleTime=30000] - The idle time threshold in milliseconds.
     */
    static toggleClassOnIdleTime(element, className, idleTime = 3e4) {
      let idleTimer;
      const resetIdleTimer = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          _Utility.toggleClass(element, className);
        }, idleTime);
      };
      document.addEventListener("mousemove", resetIdleTimer);
      document.addEventListener("keypress", resetIdleTimer);
      resetIdleTimer();
    }
    /**
     * Adds a class at regular intervals using setInterval.
     * @param {number} [interval=1000] - The interval in milliseconds.
     */
    static addClassOnInterval(element, className, interval = 1e3) {
      setInterval(() => {
        _Utility.addClass(element, className);
      }, interval);
    }
    /**
     * Removes a class at regular intervals using setInterval.
     * @param {number} [interval=1000] - The interval in milliseconds.
     */
    removeClassOnInterval(element, className, interval = 1e3) {
      setInterval(() => {
        _Utility.removeClass(element, className);
      }, interval);
    }
    /**
     * Toggles a class on an element based on device motion.
     * @param {HTMLElement} element - The target element.
     * @param {string} className - The class name to toggle.
     */
    static toggleClassOnDeviceMotion(element, className) {
      window.addEventListener("deviceorientation", (event) => {
        const tiltThreshold = 20;
        const isTilted = Math.abs(event.beta) > tiltThreshold || Math.abs(event.gamma) > tiltThreshold;
        _Utility.toggleClass(element, className, isTilted);
      });
    }
    /**
     * Toggles a class on an element based on orientation change.
     * @param {HTMLElement} element - The target element.
     * @param {string} className - The class name to toggle.
     */
    static toggleClassOnOrientationChange(element, className) {
      const handleOrientationChange = () => {
        const orientation = window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape";
        _Utility.toggleClass(element, `${className}-${orientation}`);
      };
      window.addEventListener("orientationchange", handleOrientationChange);
      handleOrientationChange();
    }
    /**
     * Toggles a class based on horizontal or vertical swipe.
     * @param {HTMLElement} element - The target element.
     * @param {string} className - The base class name to toggle.
     */
    static toggleClassOnSwipe(element, className) {
      let startX, startY;
      element.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
      });
      element.addEventListener("touchend", (event) => {
        const deltaX = event.changedTouches[0].clientX - startX;
        const deltaY = event.changedTouches[0].clientY - startY;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          _Utility.toggleClass(element, `${className}-horizontal`);
        } else {
          _Utility.toggleClass(element, `${className}-vertical`);
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
        _Utility.toggleClass(element, className, isOnline);
      };
      window.addEventListener("online", handleConnectionChange);
      window.addEventListener("offline", handleConnectionChange);
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
          _Utility.toggleClass(element, className);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  // src/DOM/general/drag-drop.js
  var DragDrop = class {
    /**
     * Make an element draggable.
     *
     * @param {HTMLElement} draggableElement - The element to make draggable.
     * @param {Object} options - Additional options for configuring drag behavior.
     */
    static setDraggable(draggableElement, options = {}) {
      draggableElement.draggable = true;
      draggableElement.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", "");
        if (options && typeof options.dragStart === "function") {
          options.dragStart(event);
        }
      });
      draggableElement.addEventListener("dragend", (event) => {
        if (options && typeof options.dragEnd === "function") {
          options.dragEnd(event);
        }
      });
    }
    /**
     * Destroy draggable behavior on an element.
     *
     * @param {HTMLElement} draggableElement - The element to remove draggable behavior from.
     */
    static destroyDraggable(draggableElement) {
      draggableElement.draggable = false;
      draggableElement.removeEventListener("dragstart", null);
      draggableElement.removeEventListener("dragend", null);
    }
    /**
     * Disable draggable behavior on an element.
     *
     * @param {HTMLElement} draggableElement - The element to disable draggable behavior on.
     */
    static disableDraggable(draggableElement) {
      draggableElement.draggable = false;
    }
    /**
     * Enable draggable behavior on an element.
     *
     * @param {HTMLElement} draggableElement - The element to enable draggable behavior on.
     */
    static enableDraggable(draggableElement) {
      draggableElement.draggable = true;
    }
    /**
     * Make an element droppable.
     *
     * @param {HTMLElement} droppableElement - The element to make droppable.
     * @param {Object} options - Additional options for configuring drop behavior.
     */
    static createDroppable(droppableElement, options = {}) {
      droppableElement.addEventListener("dragover", (event) => {
        event.preventDefault();
        if (options && typeof options.dragOver === "function") {
          options.dragOver(event);
        }
      });
      droppableElement.addEventListener("drop", (event) => {
        event.preventDefault();
        if (options && typeof options.drop === "function") {
          options.drop(event);
        }
      });
    }
    /**
     * Destroy droppable behavior on an element.
     *
     * @param {HTMLElement} droppableElement - The element to remove droppable behavior from.
     */
    static destroyDroppable(droppableElement) {
      droppableElement.removeEventListener("dragover", null);
      droppableElement.removeEventListener("drop", null);
    }
    /**
     * Disable droppable behavior on an element.
     *
     * @param {HTMLElement} droppableElement - The element to disable droppable behavior on.
     */
    static disableDroppable(droppableElement) {
      droppableElement.removeEventListener("dragover", null);
      droppableElement.removeEventListener("drop", null);
    }
    /**
     * Enable droppable behavior on an element.
     *
     * @param {HTMLElement} droppableElement - The element to enable droppable behavior on.
     */
    static enableDroppable(droppableElement) {
      droppableElement.addEventListener("dragover", (event) => {
        event.preventDefault();
      });
      droppableElement.addEventListener("drop", (event) => {
        event.preventDefault();
      });
    }
  };

  // src/DOM/general/scroll.js
  var Scroll = class _Scroll {
    /**
     * Fades in an element over a specified duration.
     * @param {HTMLElement} element - The element to fade in.
     * @param {number} duration - The duration of the fade-in animation in milliseconds.
     * @param {Function} [callback] - An optional callback function to execute after the fade-in is complete.
     */
    static fadeIn(element, duration, callback2) {
      const startOpacity = 0;
      const endOpacity = 1;
      _Scroll.animateOpacity(element, startOpacity, endOpacity, duration, callback2);
    }
    /**
     * Fades out an element over a specified duration.
     * @param {HTMLElement} element - The element to fade out.
     * @param {number} duration - The duration of the fade-out animation in milliseconds.
     * @param {Function} [callback] - An optional callback function to execute after the fade-out is complete.
     */
    static fadeOut(element, duration, callback2) {
      const startOpacity = 1;
      const endOpacity = 0;
      _Scroll.animateOpacity(element, startOpacity, endOpacity, duration, callback2);
    }
    /**
     * Slides down an element over a specified duration.
     * @param {HTMLElement} element - The element to slide down.
     * @param {number} duration - The duration of the slide-down animation in milliseconds.
     * @param {Function} [callback] - An optional callback function to execute after the slide-down is complete.
     */
    static slideDown(element, duration, callback2) {
      _Scroll.animateHeight(element, 0, _Scroll.getFullHeight(element), duration, callback2);
    }
    /**
     * Slides up an element over a specified duration.
     * @param {HTMLElement} element - The element to slide up.
     * @param {number} duration - The duration of the slide-up animation in milliseconds.
     * @param {Function} [callback] - An optional callback function to execute after the slide-up is complete.
     */
    static slideUp(element, duration, callback2) {
      _Scroll.animateHeight(element, _Scroll.getFullHeight(element), 0, duration, callback2);
    }
    /**
     * Toggles the visibility of an element by sliding it up or down over a specified duration.
     * @param {HTMLElement} element - The element to toggle.
     * @param {number} duration - The duration of the slide animation in milliseconds.
     * @param {Function} [callback] - An optional callback function to execute after the toggle is complete.
     */
    static slideToggle(element, duration, callback2) {
      if (_Scroll.isElementVisible(element)) {
        _Scroll.slideUp(element, duration, callback2);
      } else {
        _Scroll.slideDown(element, duration, callback2);
      }
    }
    /**
     * Toggles a class on an element when scrolling past a specified offset.
     * @param {HTMLElement} element - The element to toggle the class on.
     * @param {string} className - The class to toggle.
     * @param {number} offset - The offset from the top of the page to trigger the class toggle.
     */
    static toggleClassOnScroll(element, className, offset2) {
      window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY || window.pageYOffset;
        if (scrollPosition > offset2) {
          Utility.addClass(className);
        } else {
          Utility.removeClass(className);
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
        const val = _Scroll.easeInOutQuad(currentTime, start, change, duration);
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
    static animateOpacity(element, startOpacity, endOpacity, duration, callback2) {
      const startTime = performance.now();
      const animate = (timestamp) => {
        const elapsed = timestamp - startTime;
        const progress = elapsed / duration;
        const opacity = _Scroll.easeInOutQuad(progress, startOpacity, endOpacity - startOpacity, 1);
        Style.addStyles(element, { opacity: opacity.toString() });
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else if (callback2) {
          callback2();
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
    static animateHeight(element, startHeight, endHeight, duration, callback2) {
      const startTime = performance.now();
      const animate = (timestamp) => {
        const elapsed = timestamp - startTime;
        const progress = elapsed / duration;
        const height = _Scroll.easeInOutQuad(progress, startHeight, endHeight - startHeight, 1);
        Style.addStyles(element, { height: height + "px" });
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          Style.addStyles(element, { height: "" });
          if (callback2) {
            callback2();
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
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
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
        const val = _Scroll.easeInOutQuad(currentTime, start, change, duration);
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
      _Scroll.smoothScrollToPosition(elementTop, duration);
    }
    /**
     * Scrolls to the specified element without animation.
     * @param {HTMLElement} element - The target element to scroll to.
     */
    static scrollToElement(element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop,
        behavior: "auto"
      });
    }
    /**
     * Scrolls smoothly to the top of the page over a specified duration.
     * @param {number} duration - The duration of the smooth scroll in milliseconds.
     */
    static scrollToTop(duration) {
      _Scroll.smoothScrollToPosition(0, duration);
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
      _Scroll.smoothScrollToPosition(scrollPosition, duration);
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
      Style.addStyles(document.body, { overflow: "hidden" });
    }
    /**
     * Enables scrolling on the entire page.
     */
    static enableScroll() {
      Style.addStyles(document.body, { overflow: "" });
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
  };

  // src/DOM/modal/modal.js
  var Modal = class {
    /**
     * Create a modal with the given options.
     *
     * @param {Object} options - Options for configuring the modal (Id, class).
     * @returns {HTMLElement} - The created modal element.
     */
    static createModal(options) {
      const modal = document.createElement("div");
      modal.id = options.id || "modal";
      Utility.addClass(modal, options.class || "modal");
      return modal;
    }
    /**
     * Open a modal with the specified ID.
     *
     * @param {string} modalId - The ID of the modal to be opened.
     */
    static openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        Style.addStyles(modal, { display: "block" });
      }
    }
    /**
     * Close a modal with the specified ID.
     *
     * @param {string} modalId - The ID of the modal to be closed.
     */
    static closeModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        Style.addStyles(modal, { display: "none" });
      }
    }
    /**
     * Destroy a modal with the specified ID.
     *
     * @param {string} modalId - The ID of the modal to be destroyed.
     */
    static destroyModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.remove();
      }
    }
    /**
     * Set the content of a modal with the specified ID.
     *
     * @param {string} modalId - The ID of the modal to set content for.
     * @param {string} content - The HTML content to set for the modal.
     */
    static setModalContent(modalId, content) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.innerHTML = content;
      }
    }
    /**
     * Get the content of a modal with the specified ID.
     *
     * @param {string} modalId - The ID of the modal to get content from.
     * @returns {string} - The HTML content of the modal.
     */
    static getModalContent(modalId) {
      const modal = document.getElementById(modalId);
      return modal ? modal.innerHTML : "";
    }
  };

  // src/DOM/general/ripple.js
  var Ripple = class _Ripple {
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
        color: "rgba(255, 255, 255, 0.5)",
        duration: "0.6s",
        size: 4
      };
      const mergedOptions = { ...defaultOptions, ...options };
      element.addEventListener("click", function(event) {
        const targetElement = event.currentTarget;
        const ripple = Element.createElement({
          name: "span",
          class: ["ripple"]
        });
        Style.addStyles(ripple, {
          backgroundColor: mergedOptions.color,
          animationDuration: mergedOptions.duration
        });
        const rect = targetElement.getBoundingClientRect();
        const rippleX = event.clientX - rect.left;
        const rippleY = event.clientY - rect.top;
        ripple.style.left = rippleX + "px";
        ripple.style.top = rippleY + "px";
        Element.appendElement(targetElement, ripple);
        ripple.addEventListener("animationend", () => {
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
      elements.forEach((element) => {
        _Ripple.addRippleEffect(element, options);
      });
    }
    /**
     * Removes the ripple effect from the specified element.
     * @param {HTMLElement} element - The element from which the ripple effect will be removed.
     */
    static removeRippleEffect(element) {
      const ripples = element.querySelectorAll(".ripple");
      ripples.forEach((ripple) => {
        ripple.remove();
      });
    }
    /**
     * Removes the ripple effect from multiple elements based on a CSS selector.
     * @param {string} selector - The CSS selector used to select elements from which the ripple effect will be removed.
     */
    static removeRippleEffectFromMultiple(selector) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        _Ripple.removeRippleEffect(element);
      });
    }
  };
  var RippleEffect = class {
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
        eventType: options.eventType || "mousedown",
        createRipple: options.createRipple || this.createDefaultRipple.bind(this)
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
      Style.addStyles(ripple, { left: `${x}px`, top: `${y}px` });
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
        name: "span",
        class: ["ripple"]
      });
      return ripple;
    }
  };

  // src/DOM/general/tooltip.js
  function Tooltip(targetElement, tooltipContent, callback2) {
    let tooltipElement = null;
    function showTooltip() {
      tooltipElement = Element.createElement({
        name: "div",
        class: ["tooltip"],
        innerText: tooltipContent
      });
      const rect = targetElement.getBoundingClientRect();
      const y = rect.top + window.scrollY - tooltipElement.offsetHeight - 5;
      const targetCenterX = rect.left + window.scrollX + rect.width / 2;
      Element.appendElement(document.body, tooltipElement);
      const tooltipWidth = tooltipElement.offsetWidth;
      Element.removeElement(tooltipElement);
      const x = targetCenterX - tooltipWidth / 2;
      Style.addStyles(tooltipElement, { top: `${y}px`, left: `${x}px`, marginLeft: "0" });
      Element.appendElement(document.body, tooltipElement);
      if (callback2 && typeof callback2 === "function") {
        callback2(tooltipElement);
      }
    }
    function hideTooltip() {
      if (tooltipElement) {
        Element.removeElement(tooltipElement);
        tooltipElement = null;
      }
    }
    function isTouchScreen() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    const tooltipEnabled = localStorage.getItem("tooltip") !== "false";
    if (!isTouchScreen() && tooltipEnabled) {
      targetElement.addEventListener("mouseenter", showTooltip);
      targetElement.addEventListener("mouseout", hideTooltip);
    }
  }

  // src/form/main.js
  var FormAction = class {
    /**
     * Generate a random password.
     * @param {number} length - The length of the password.
     * @param {object} options - Additional options for password generation (eg. charset).
     * @returns {string} - The generated password.
     */
    static generatePassword(length, options) {
      const charset = options.charset || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      return password;
    }
    /**
     * Hash a password with a salt using the Web Crypto API.
     * @param {string} password - The password to hash.
     * @param {string} salt - The salt for hashing.
     * @returns {Promise<string>} - A promise that resolves to the hashed password.
     */
    static async hashPassword(password, salt) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password + salt);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashedPassword = Array.from(new Uint8Array(hashBuffer)).map((byte) => String.fromCharCode(byte)).join("");
      return hashedPassword;
    }
    /**
     * Verify a password against its hash and salt.
     * @param {string} hash - The hashed password.
     * @param {string} password - The password to verify.
     * @param {string} salt - The salt used for hashing.
     * @returns {boolean} - True if the password is verified, false otherwise.
     */
    static verifyPassword(hash, password, salt) {
      const hashedPassword = this.hashPassword(password, salt);
      return hash === hashedPassword;
    }
    /**
     * Encrypt text with a key.
     * @param {string} text - The text to encrypt.
     * @param {string} key - The encryption key.
     * @returns {string} - The encrypted text.
     */
    static encryptText(text, key) {
      const cipher = crypto.createCipheriv("aes-256-cbc", key);
      let encryptedText = cipher.update(text, "utf-8", "hex");
      encryptedText += cipher.final("hex");
      return encryptedText;
    }
    /**
     * Decrypt encrypted text with a key.
     * @param {string} encryptedText - The encrypted text to decrypt.
     * @param {string} key - The decryption key.
     * @returns {string} - The decrypted text.
     */
    static decryptText(encryptedText, key) {
      const decipher = crypto.createDecipheriv("aes-256-cbc", key);
      let decryptedText = decipher.update(encryptedText, "hex", "utf-8");
      decryptedText += decipher.final("utf-8");
      return decryptedText;
    }
    /**
     * Generate a secure token of the specified length using the Web Crypto API.
     * @param {number} length - The length of the token.
     * @returns {Promise<string>} - A promise that resolves to the generated secure token.
     */
    static async generateToken(length) {
      const tokenArray = new Uint8Array(length);
      crypto.getRandomValues(tokenArray);
      const token = Array.from(tokenArray).map((byte) => byte.toString(16).padStart(2, "0")).join("");
      return token;
    }
    /**
     * Generate a secure one-time password (OTP) of the specified length using the Web Crypto API.
     * @param {number} length - The length of the OTP.
     * @returns {Promise<string>} - A promise that resolves to the generated OTP.
     */
    static async generateOTP(length) {
      const otpArray = new Uint8Array(length);
      crypto.getRandomValues(otpArray);
      const otp = Array.from(otpArray).map((byte) => byte.toString(10)).join("").slice(0, length);
      return otp;
    }
    /**
     * Disable all input elements in a form.
     * @param {HTMLFormElement} formElement - The form element to disable.
     */
    static disableForm(formElement) {
      const inputs = formElement.querySelectorAll("input, textarea, select");
      inputs.forEach((input) => input.disabled = true);
    }
    /**
     * Enable all input elements in a form.
     * @param {HTMLFormElement} formElement - The form element to enable.
     */
    static enableForm(formElement) {
      const inputs = formElement.querySelectorAll("input, textarea, select");
      inputs.forEach((input) => input.disabled = false);
    }
    /**
     * Scroll to the first error in a form.
     * @param {HTMLFormElement} formElement - The form element to scroll within.
     */
    static scrollToError(formElement) {
      const firstError = formElement.querySelector(".error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    /**
     * Show an error message associated with an element.
     * @param {HTMLElement} element - The element to show the error message for.
     * @param {string} message - The error message to display.
     */
    static showErrorMessage(element, message) {
      const errorElement = document.createElement("div");
      errorElement.className = "error";
      Element.setElementText(errorElement, message);
      Element.prependElement(errorElement, element.nextSibling);
    }
    /**
     * Hide the error message associated with an element.
     * @param {HTMLElement} element - The element to hide the error message for.
     */
    static hideErrorMessage(element) {
      const errorElement = element.parentNode.querySelector(".error");
      if (errorElement) {
        Element.unwrapElement(errorElement);
      }
    }
    /**
     * Validate an input element.
     * @param {HTMLInputElement} inputElement - The input element to validate.
     * @returns {boolean} - True if the input is valid, false otherwise.
     */
    /**
     * Reset the value of an input element.
     * @param {HTMLInputElement} inputElement - The input element to reset.
     */
    static resetInput(inputElement) {
      inputElement.value = "";
    }
    /**
     * Disable an input element.
     * @param {HTMLInputElement} inputElement - The input element to disable.
     */
    static disableInput(inputElement) {
      inputElement.disabled = true;
    }
    /**
     * Enable an input element.
     * @param {HTMLInputElement} inputElement - The input element to enable.
     */
    static enableInput(inputElement) {
      inputElement.disabled = false;
    }
    /**
     * Toggle the validity of an input element.
     * @param {HTMLInputElement} inputElement - The input element to toggle validity for.
     * @param {boolean} isValid - True if the input is valid, false otherwise.
     */
    static toggleInputValidity(inputElement, isValid) {
      inputElement.setCustomValidity(isValid ? "" : "Invalid input");
    }
    /**
     * Highlight an input element as invalid.
     * @param {HTMLInputElement} inputElement - The input element to highlight.
     */
    static highlightInvalidInput(inputElement) {
      Utility.addClass(inputElement, "invalid");
      if (Utility.hasClass(inputElement, "invalid")) {
        Style.addStyles(inputElement, { borderColor: "red" });
      }
    }
  };
  var SerializeForm = class {
    /**
     * Serialize form data into a URL-encoded string.
     * @param {HTMLFormElement} formElement - The HTML form element to serialize.
     * @returns {string} URL-encoded form data string.
     */
    static serializeFormData(formElement) {
      const formDataArray = [];
      for (const field of new FormData(formElement)) {
        formDataArray.push(`${encodeURIComponent(field[0])}=${encodeURIComponent(field[1])}`);
      }
      return formDataArray.join("&");
    }
    /**
     * Deserialize URL-encoded form data string and populate the form fields.
     * @param {HTMLFormElement} formElement - The HTML form element to populate.
     * @param {string} data - URL-encoded form data string.
     */
    static deserializeFormData(formElement, data) {
      const formDataPairs = data.split("&");
      for (const pair of formDataPairs) {
        const [name, value] = pair.split("=");
        const decodedName = decodeURIComponent(name);
        const decodedValue = decodeURIComponent(value);
        const inputElement = formElement.elements.namedItem(decodedName);
        if (inputElement) {
          if (inputElement.type === "checkbox" || inputElement.type === "radio") {
            inputElement.checked = inputElement.value === decodedValue;
          } else {
            inputElement.value = decodedValue;
          }
        }
      }
    }
  };

  // src/form/validate.js
  var Validate = class {
    /**
     * Validates an email address.
     *
     * @param {string} email - The email address to validate.
     * @returns {boolean} - Returns true if the email is valid, otherwise false.
     */
    static validateEmailAddress(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return false;
      }
      const [localPart, domainPart] = email.split("@");
      if (localPart.length > 64 || domainPart.length > 255) {
        return false;
      }
      if (email.length > 320) {
        return false;
      }
      const localPartRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
      if (!localPartRegex.test(localPart)) {
        return false;
      }
      const domainPartRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
      if (!domainPartRegex.test(domainPart)) {
        return false;
      }
      const tldRegex = /^[a-zA-Z]{2,}$/;
      const topLevelDomain = domainPart.split(".").pop();
      if (!tldRegex.test(topLevelDomain)) {
        return false;
      }
      return true;
    }
    /**
     * Validates a phone number.
     * @param {string} phoneNumber - The phone number to validate.
     * @returns {boolean} - True if the phone number is valid, false otherwise.
     */
    static validatePhoneNumber(phoneNumber) {
      const phoneRegex = /^[0-9+\(\)#\.\s\-]+$/;
      if (!phoneRegex.test(phoneNumber)) {
        return false;
      }
      const digitsOnly = phoneNumber.replace(/\D/g, "");
      if (digitsOnly.length < 8 || digitsOnly.length > 15) {
        return false;
      }
      const countryCodeRegex = /^\+(\d{1,4})$/;
      const countryCodeMatch = phoneNumber.match(countryCodeRegex);
      if (countryCodeMatch && countryCodeMatch[1].length > 4) {
        return false;
      }
      return true;
    }
    /**
     * Validates a One-Time Password (OTP) entered by the user.
     *
     * @param {string} userOTP - The OTP entered by the user for validation.
     * @param {string} storedOTP - The predefined OTP stored for comparison.
     * @param {number} [expirationTime=5] - The expiration time for the OTP in minutes.
     * @param {number} [maxAttempts=3] - The maximum allowed attempts for OTP validation.
     *
     * @returns {Object} An object containing the validation result.
     * @property {boolean} success - Indicates whether the OTP validation was successful.
     * @property {string} message - A message providing information about the validation result.
     */
    static validateOTP(userOTP, storedOTP, expirationTime = 5, maxAttempts = 3) {
      const now = (/* @__PURE__ */ new Date()).getTime();
      const storedOTPDetails = JSON.parse(localStorage.getItem("otpDetails")) || {};
      if (storedOTPDetails.attempts >= maxAttempts) {
        return {
          success: false,
          message: "Maximum attempts exceeded. Please try again later."
        };
      }
      if (storedOTPDetails.timestamp && now - storedOTPDetails.timestamp > expirationTime * 60 * 1e3) {
        return {
          success: false,
          message: "OTP has expired. Please request a new one."
        };
      }
      if (userOTP === storedOTP) {
        localStorage.setItem("otpDetails", JSON.stringify({ attempts: 0, timestamp: null }));
        return {
          success: true,
          message: "OTP validated successfully!"
        };
      } else {
        storedOTPDetails.attempts = (storedOTPDetails.attempts || 0) + 1;
        storedOTPDetails.timestamp = now;
        localStorage.setItem("otpDetails", JSON.stringify(storedOTPDetails));
        return {
          success: false,
          message: "Invalid OTP. Please try again."
        };
      }
    }
    /**
     * Validates a JSON Web Token (JWT) entered by the user.
     * @param {string} userToken - The JWT entered by the user for validation.
     * @param {string} secretKey - The secret key used to sign the JWT.
     *
     * @returns {Object} An object containing the validation result.
     * @property {boolean} success - Indicates whether the JWT validation was successful.
     * @property {Object|null} payload - The decoded payload of the JWT (if successful).
     * @property {string} message - A message providing information about the validation result.
     */
    static validateJWT(userToken, secretKey) {
      const tokenParts = userToken.split(".");
      if (tokenParts.length !== 3) {
        return {
          success: false,
          payload: null,
          message: "Invalid JWT format. Please try again."
        };
      }
      const [headerBase64, payloadBase64, signature] = tokenParts;
      try {
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const calculatedSignature = btoa(JSON.stringify(decodedPayload) + secretKey);
        if (calculatedSignature !== signature) {
          throw new Error("Invalid signature");
        }
        return {
          success: true,
          payload: decodedPayload,
          message: "JWT validated successfully!"
        };
      } catch (error) {
        return {
          success: false,
          payload: null,
          message: "Invalid JWT. Please try again."
        };
      }
    }
    /**
     * Validates the strength of a password.
     *
     * @param {string} password - The password to validate.
     * @returns {string} - Returns a string indicating the strength level:
     *   - "Weak" for weak passwords
     *   - "Moderate" for moderately strong passwords
     *   - "Strong" for strong passwords
     *   - "Very Strong" for very strong passwords
     */
    static validatePasswordStrength(password) {
      const minLength = 8;
      const maxLength = 100;
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const digitRegex = /\d/;
      const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
      if (password.length < minLength) {
        return "Weak - Too short";
      }
      if (password.length > maxLength) {
        return "Moderate - Too long";
      }
      const hasUppercase = uppercaseRegex.test(password);
      const hasLowercase = lowercaseRegex.test(password);
      const hasDigit = digitRegex.test(password);
      const hasSpecialChar = specialCharRegex.test(password);
      const conditionsFulfilled = [hasUppercase, hasLowercase, hasDigit, hasSpecialChar].filter(Boolean).length;
      if (conditionsFulfilled === 1) {
        return "Weak - Low complexity";
      } else if (conditionsFulfilled === 2) {
        return "Moderate - Moderate complexity";
      } else if (conditionsFulfilled === 3) {
        return "Strong - High complexity";
      } else if (conditionsFulfilled === 4) {
        return "Very Strong - Very high complexity";
      } else {
        return "Weak - Insufficient complexity";
      }
    }
  };

  // src/form/creditCard.js
  var CreditCard = class {
    /**
     * Check if the provided credit card number is valid.
     * Using Luhn's algorithm for better validation.
     *
     * @param {string} cardNumber - The credit card number to validate.
     * @returns {boolean} - True if the credit card number is valid, false otherwise.
     */
    static isValidCreditCardNumber(cardNumber) {
      if (!/^\d{16}$/.test(cardNumber)) return false;
      let sum = 0;
      let shouldDouble = false;
      for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = +cardNumber[i];
        if (shouldDouble) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
      }
      return sum % 10 === 0;
    }
    /**
     * Check if the provided credit card expiry date is valid.
     *
     * @param {string} expiryDate - The credit card expiry date to validate (format: MM/YY).
     * @returns {boolean} - True if the expiry date is valid, false otherwise.
     */
    static isValidCreditCardExpiry(expiryDate) {
      if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false;
      const [month, year] = expiryDate.split("/").map(Number);
      const currentDate = /* @__PURE__ */ new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear() % 100;
      if (month < 1 || month > 12) return false;
      if (year < currentYear || year === currentYear && month < currentMonth) {
        return false;
      }
      return true;
    }
    /**
     * Check if the provided credit card CVV is valid.
     *
     * @param {string} cvv - The credit card CVV to validate.
     * @returns {boolean} - True if the CVV is valid, false otherwise.
     */
    static isValidCreditCardCVV(cvv) {
      return /^\d{3,4}$/.test(cvv);
    }
    /**
     * Mask the provided credit card number, showing only the last four digits.
     *
     * @param {string} cardNumber - The credit card number to mask.
     * @returns {string} - The masked credit card number.
     */
    static maskCreditCardNumber(cardNumber) {
      return cardNumber.slice(-4).padStart(cardNumber.length, "*");
    }
  };

  // src/media/device-media/image.js
  var Image2 = class _Image {
    /**
     * Resize an image to fit within specified dimensions while maintaining aspect ratio.
     * @param {File} file - The image file.
     * @param {number} maxWidth - The maximum width of the resized image.
     * @param {number} maxHeight - The maximum height of the resized image.
     * @returns {Promise<Blob>} - A Promise that resolves to the resized image as a Blob.
     */
    static resizeImage(file, maxWidth, maxHeight) {
      return new Promise((resolve, reject) => {
        const img = new _Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => resolve(blob), file.type);
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = URL.createObjectURL(file);
      });
    }
    /**
     * Rotate an image by a specified number of degrees.
     * @param {File} file - The image file.
     * @param {number} degrees - The number of degrees to rotate the image.
     * @returns {Promise<Blob>} - A Promise that resolves to the rotated image as a Blob.
     */
    static rotateImage(file, degrees) {
      return new Promise((resolve, reject) => {
        const img = new _Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.height;
          canvas.height = img.width;
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(degrees * (Math.PI / 180));
          ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
          canvas.toBlob((blob) => resolve(blob), file.type);
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = URL.createObjectURL(file);
      });
    }
    /**
     * Compress an image by adjusting its quality.
     * @param {File} file - The image file.
     * @param {number} quality - The quality of the compressed image (0 to 1).
     * @returns {Promise<Blob>} - A Promise that resolves to the compressed image as a Blob.
     */
    static compressImage(file, quality) {
      return new Promise((resolve, reject) => {
        const img = new _Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          canvas.toBlob((blob) => resolve(blob), file.type, quality);
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = URL.createObjectURL(file);
      });
    }
    /**
     * Crop an image based on specified coordinates.
     * @param {File} file - The image file.
     * @param {Object} coordinates - The coordinates for cropping (e.g., { x: 10, y: 20, width: 100, height: 150 }).
     * @returns {Promise<Blob>} - A Promise that resolves to the cropped image as a Blob.
     */
    static cropImage(file, coordinates) {
      return new Promise((resolve, reject) => {
        const img = new _Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = coordinates.width;
          canvas.height = coordinates.height;
          ctx.drawImage(img, -coordinates.x, -coordinates.y, img.width, img.height);
          canvas.toBlob((blob) => resolve(blob), file.type);
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = URL.createObjectURL(file);
      });
    }
    /**
     * Flip an image along a specified axis.
     * @param {File} file - The image file.
     * @param {string} axis - The axis along which to flip the image ('horizontal' or 'vertical').
     * @returns {Promise<Blob>} - A Promise that resolves to the flipped image as a Blob.
     */
    static flipImage(file, axis) {
      return new Promise((resolve, reject) => {
        const img = new _Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          if (axis === "horizontal") {
            ctx.scale(-1, 1);
            ctx.drawImage(img, -img.width, 0, img.width, img.height);
          } else if (axis === "vertical") {
            ctx.scale(1, -1);
            ctx.drawImage(img, 0, -img.height, img.width, img.height);
          } else {
            reject(new Error('Invalid axis. Use "horizontal" or "vertical".'));
            return;
          }
          canvas.toBlob((blob) => resolve(blob), file.type);
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = URL.createObjectURL(file);
      });
    }
    /**
     * Convert an image to a base64-encoded string.
     * @param {File} file - The image file.
     * @returns {Promise<string>} - A Promise that resolves to the base64-encoded image string.
     */
    static convertImageToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result.split(",")[1]);
        };
        reader.onerror = () => {
          reject(new Error("Failed to read image as base64."));
        };
        reader.readAsDataURL(file);
      });
    }
    /**
     * Preload a list of images and invoke a callback once all images are loaded.
     * @param {string[]} imageUrls - An array of image URLs to preload.
     * @param {function} callback - The callback function to invoke once all images are loaded.
     */
    static preloadImagesWithCallback(imageUrls, callback2) {
      const images = [];
      let loadedImages = 0;
      function imageLoaded() {
        loadedImages++;
        if (loadedImages === imageUrls.length) {
          callback2(images);
        }
      }
      imageUrls.forEach((url, index) => {
        const img = new _Image();
        img.onload = () => {
          images[index] = img;
          imageLoaded();
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${url}`);
          imageLoaded();
        };
        img.src = url;
      });
    }
    /**
     * Calculate the aspect ratio of an image based on its width and height.
     * @param {number} width - The width of the image.
     * @param {number} height - The height of the image.
     * @returns {number} - The aspect ratio of the image.
     */
    static calculateAspectRatio(width, height) {
      return width / height;
    }
  };

  // src/media/device-media/capture.js
  var Capture = class {
    /**
     * Opens the device camera and streams video to a specified element.
     * @param {Object} options - Options for opening the camera.
     * @param {string} options.targetElementId - The ID of the HTML element to display the camera stream.
     * @returns {Promise<MediaStream>} - A Promise that resolves to the camera stream.
     */
    static openCamera(options) {
      const { targetElementId } = options;
      return new Promise((resolve, reject) => {
        const videoElement = document.getElementById(targetElementId);
        if (!videoElement) {
          reject(new Error(`Element with ID ${targetElementId} not found.`));
          return;
        }
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          videoElement.srcObject = stream;
          resolve(stream);
        }).catch((error) => {
          reject(error);
        });
      });
    }
    /**
     * Captures a photo from the camera stream.
     * @param {Object} options - Options for capturing a photo.
     * @param {string} options.targetElementId - The ID of the HTML element to display the camera stream.
     * @returns {Promise<Blob>} - A Promise that resolves to the captured photo as a Blob.
     */
    static capturePhoto(options) {
      const { targetElementId } = options;
      return new Promise((resolve, reject) => {
        const videoElement = document.getElementById(targetElementId);
        if (!videoElement || !videoElement.srcObject) {
          reject(new Error(`Element with ID ${targetElementId} not found or camera not opened.`));
          return;
        }
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        videoElement.addEventListener("loadedmetadata", () => {
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => resolve(blob), "image/jpeg");
        });
        videoElement.onerror = () => {
          reject(new Error("Error capturing photo."));
        };
      });
    }
    /**
     * Records video from the camera stream.
     * @param {Object} options - Options for recording video.
     * @param {string} options.targetElementId - The ID of the HTML element to display the camera stream.
     * @param {number} options.duration - The duration to record.
     * @returns {Promise<Blob>} - A Promise that resolves to the recorded video as a Blob.
     */
    static recordVideo(options) {
      const { targetElementId, duration } = options;
      return new Promise((resolve, reject) => {
        const videoElement = document.getElementById(targetElementId);
        if (!videoElement || !videoElement.srcObject) {
          reject(new Error(`Element with ID ${targetElementId} not found or camera not opened.`));
          return;
        }
        const mediaStream = videoElement.srcObject;
        const mediaRecorder = new MediaRecorder(mediaStream, {
          mimeType: "video/webm"
        });
        const chunks = [];
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };
        mediaRecorder.onstop = () => {
          const videoBlob = new Blob(chunks, { type: "video/webm" });
          resolve(videoBlob);
        };
        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
        }, options.duration || 5e3);
      });
    }
  };

  // src/media/device-media/fullScreen.js
  var FullScreen = class {
    /**
     * Detects whether fullscreen mode is supported in the current browser.
     * @returns {boolean} - True if fullscreen is supported, false otherwise.
     */
    static detectFullscreenSupport() {
      return document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
    }
    /**
     * Enters fullscreen mode for the specified element.
     * @param {Element} element - The HTML element to enter fullscreen.
     */
    static enterFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
    /**
     * Exits fullscreen mode.
     */
    static exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    /**
     * Gets the element currently in fullscreen mode.
     * @returns {Element|null} - The element in fullscreen, or null if no element is in fullscreen.
     */
    static getFullscreenElement() {
      return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
    }
  };

  // src/network/request/server.js
  var RequestServer = class {
    /**
     * Makes an AJAX request with the provided options.
     * @param {Object} options - The options for the AJAX request.
     * @param {string} options.method - The HTTP method for the request (e.g., 'GET', 'POST').
     * @param {string} options.url - The URL to make the request to.
     * @param {Object} [options.headers] - Additional headers to include in the request.
     * @param {string|FormData} [options.data] - The data to include in the request body.
     * @param {function} [options.success] - Callback function to handle a successful response.
     * @param {function} [options.error] - Callback function to handle an error response.
     */
    static ajax(options) {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method, options.url, true);
      if (options.headers) {
        for (const [key, value] of Object.entries(options.headers)) {
          xhr.setRequestHeader(key, value);
        }
      }
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          if (options.success) {
            options.success(xhr.responseText);
          }
        } else {
          if (options.error) {
            options.error(`Request failed with status ${xhr.status}`);
          }
        }
      };
      xhr.onerror = function() {
        if (options.error) {
          options.error("Request failed");
        }
      };
      xhr.send(options.data);
    }
    /**
     * Makes a GET request.
     * @param {string} url - The URL for the GET request.
     * @param {Object} data - The data to be sent with the request.
     * @param {function} callback - The callback function to handle the response.
     */
    static get(url, data, callback2) {
      const xhr = new XMLHttpRequest();
      const queryString = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");
      const fullUrl = data ? `${url}?${queryString}` : url;
      xhr.open("GET", fullUrl, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            callback2(JSON.parse(xhr.responseText));
          } else {
            callback2(null);
          }
        }
      };
      xhr.send();
    }
    /**
     * Makes a POST request.
     * @param {string} url - The URL for the POST request.
     * @param {Object} data - The data to be sent with the request.
     * @param {function} callback - The callback function to handle the response.
     */
    static post(url, data, callback2) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            callback2(JSON.parse(xhr.responseText));
          } else {
            callback2(null);
          }
        }
      };
      xhr.send(JSON.stringify(data));
    }
    /**
     * Makes a PUT request.
     * @param {string} url - The URL for the PUT request.
     * @param {Object} data - The data to be sent with the request.
     * @param {function} callback - The callback function to handle the response.
     */
    static put(url, data, callback2) {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            callback2(JSON.parse(xhr.responseText));
          } else {
            callback2(null);
          }
        }
      };
      xhr.send(JSON.stringify(data));
    }
    /**
     * Makes a PATCH request.
     * @param {string} url - The URL for the PATCH request.
     * @param {Object} data - The data to be sent with the request.
     * @param {function} callback - The callback function to handle the response.
     */
    static patch(url, data, callback2) {
      const xhr = new XMLHttpRequest();
      xhr.open("PATCH", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            callback2(JSON.parse(xhr.responseText));
          } else {
            callback2(null);
          }
        }
      };
      xhr.send(JSON.stringify(data));
    }
    /**
     * Makes a DELETE request.
     * @param {string} url - The URL for the DELETE request.
     * @param {Object} data - The data to be sent with the request.
     * @param {function} callback - The callback function to handle the response.
     */
    static deleteRequest(url, data, callback2) {
      const xhr = new XMLHttpRequest();
      const queryString = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");
      const fullUrl = data ? `${url}?${queryString}` : url;
      xhr.open("DELETE", fullUrl, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            callback2(JSON.parse(xhr.responseText));
          } else {
            callback2(null);
          }
        }
      };
      xhr.send();
    }
    /**
     * Makes a JSONP request.
     * @param {string} url - The URL for the JSONP request.
     * @param {function} callback - The callback function to handle the response.
     */
    static jsonp(url, callback2) {
      const script = document.createElement("script");
      script.src = url;
      document.head.appendChild(script);
      window.jsonpCallback = function(data) {
        callback2(data);
        document.head.removeChild(script);
        delete window.jsonpCallback;
      };
    }
    /**
     * Makes a Fetch API request for JSON.
     * @param {string} url - The URL for the Fetch request.
     * @param {Object} options - Additional options for the Fetch request.
     */
    static fetchJson(url, options) {
      fetch(url, options).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      }).then((data) => {
        callback(data);
      }).catch((error) => {
        callback(null, error);
      });
    }
  };

  // src/media/file/file.js
  var File = class _File {
    /**
     * Gets the MIME type of a file.
     * @param {File} file - The file to get the MIME type for.
     * @returns {string} - The MIME type of the file.
     */
    static getMimeType(file) {
      return file.type;
    }
    /**
     * Validates whether the file has an allowed file type.
     * @param {File} file - The file to validate.
     * @param {string[]} allowedTypes - An array of allowed MIME types.
     * @returns {boolean} - True if the file type is allowed, false otherwise.
     */
    static validateFileType(file, allowedTypes) {
      const fileType = _File.getMimeType(file);
      return allowedTypes.includes(fileType);
    }
    /**
     * Validates whether the file size is within the specified limit.
     * @param {File} file - The file to validate.
     * @param {number} maxSize - The maximum allowed size in bytes.
     * @returns {boolean} - True if the file size is within the limit, false otherwise.
     */
    static validateFileSize(file, maxSize) {
      return file.size <= maxSize;
    }
    /**
     * Uploads a file using a basic XMLHttpRequest without external dependencies.
     * @param {File} file - The file to upload.
     * @param {string} url - The URL to upload the file to.
     * @param {function} progressCallback - A callback function to handle upload progress (optional).
     * @returns {Promise<string>} - A Promise that resolves to the server response.
     */
    static uploadFile(file, url, progressCallback) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);
        RequestServer.post(url, formData, (response) => {
          if (response) {
            resolve(response);
          } else {
            reject(new Error("File upload failed"));
          }
        }, progressCallback);
      });
    }
    /**
     * Downloads a file from the server using the RequestServer class.
     * @param {string} fileUrl - The URL for the zip file to be downloaded.
     * @param {string} fileName - The desired name for the downloaded zip file.
     * @returns {Promise<void>} A Promise that resolves once the download is complete.
     */
    static async downloadZip(fileUrl, fileName) {
      return new Promise((resolve, reject) => {
        RequestServer.get(fileUrl, {}, (response) => {
          if (response) {
            const blob = new Blob([response], { type: "application/zip" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            resolve();
          } else {
            reject(new Error(`Failed to download zip file.`));
          }
        });
      });
    }
    /**
     * Unzips a provided zip file blob and returns an array of extracted files.
     *
     * @param {Blob} zipBlob - The Blob object representing the zip file.
     * @returns {Promise<Array<{ name: string, content: string }>>} A Promise that resolves with an array of objects,
     * each containing the name and content of an extracted file.
     */
    static async unzip(zipBlob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const arrayBuffer = event.target.result;
          const zip = new JSZip();
          zip.loadAsync(arrayBuffer).then((zipFiles) => {
            const extractedFiles = [];
            zip.forEach((relativePath, zipEntry) => {
              zipFiles.file(zipEntry.name).async("string").then((content) => {
                extractedFiles.push({ name: zipEntry.name, content });
              });
            });
            Promise.all(extractedFiles).then(() => resolve(extractedFiles)).catch((err) => reject(err));
          }).catch((err) => reject(new Error(`Failed to unzip the file: ${err.message}`)));
        };
        reader.onerror = () => {
          reject(new Error("Error reading zip file."));
        };
        reader.readAsArrayBuffer(zipBlob);
      });
    }
    /**
     * Zips an array of text content into a single zip file.
     *
     * @param {Array<{ name: string, content: string }>} files - Array of objects containing the name and content of each file.
     * @param {string} zipFileName - The desired name for the zip file.
     * @returns {Blob} Blob representing the zip file.
     */
    static zip(files, zipFileName) {
      const zipData = [];
      files.forEach((file) => {
        const content = new TextEncoder().encode(file.content);
        zipData.push({
          name: file.name,
          content,
          contentLength: content.length
        });
      });
      const centralDirectory = [];
      let currentOffset = 0;
      zipData.forEach((file) => {
        centralDirectory.push({
          name: file.name,
          offset: currentOffset,
          contentLength: file.contentLength
        });
        currentOffset += file.contentLength;
      });
      const zipArray = [];
      zipData.forEach((file) => {
        const header = new Uint8Array([
          80,
          75,
          3,
          4,
          // local file header signature
          10,
          0,
          // version needed to extract
          0,
          0,
          // general purpose bit flag
          0,
          0,
          // compression method
          0,
          0,
          0,
          0,
          // file modification time
          0,
          0,
          0,
          0,
          // file modification date
          0,
          0,
          0,
          0,
          // CRC-32
          0,
          0,
          0,
          0,
          // compressed size
          0,
          0,
          0,
          0,
          // uncompressed size
          file.name.length,
          0
          // file name length
        ]);
        const headerArray = new Uint8Array(header.length + file.name.length);
        headerArray.set(header);
        headerArray.set(new TextEncoder().encode(file.name), header.length);
        const content = new Uint8Array(file.content);
        const fileEntry = new Uint8Array(headerArray.length + content.length);
        fileEntry.set(headerArray);
        fileEntry.set(content, headerArray.length);
        zipArray.push(fileEntry);
      });
      const centralDirectoryArray = [];
      centralDirectory.forEach((file) => {
        const header = new Uint8Array([
          80,
          75,
          1,
          2,
          // central file header signature
          10,
          0,
          // version made by
          10,
          0,
          // version needed to extract
          0,
          0,
          // general purpose bit flag
          0,
          0,
          // compression method
          0,
          0,
          0,
          0,
          // file modification time
          0,
          0,
          0,
          0,
          // file modification date
          0,
          0,
          0,
          0,
          // CRC-32
          0,
          0,
          0,
          0,
          // compressed size
          0,
          0,
          0,
          0,
          // uncompressed size
          file.name.length,
          0,
          // file name length
          0,
          0,
          // extra field length
          0,
          0,
          // file comment length
          0,
          0,
          // disk number start
          0,
          0,
          // internal file attributes
          0,
          0,
          0,
          0,
          // external file attributes
          file.currentOffset & 255,
          // relative offset of local header (lo)
          file.currentOffset >> 8 & 255
          // relative offset of local header (hi)
        ]);
        const headerArray = new Uint8Array(header.length + file.name.length);
        headerArray.set(header);
        headerArray.set(new TextEncoder().encode(file.name), header.length);
        centralDirectoryArray.push(headerArray);
      });
      const endOfCentralDirectory = new Uint8Array([
        80,
        75,
        5,
        6,
        // end of central directory signature
        0,
        0,
        0,
        0,
        // number of this disk
        0,
        0,
        0,
        0,
        // number of the disk with the start of the central directory
        centralDirectoryArray.length & 255,
        // total number of entries in the central directory on this disk (lo)
        centralDirectoryArray.length >> 8 & 255,
        // total number of entries in the central directory on this disk (hi)
        centralDirectoryArray.length & 255,
        // total number of entries in the central directory (lo)
        centralDirectoryArray.length >> 8 & 255,
        // total number of entries in the central directory (hi)
        centralDirectoryArray.reduce((acc, entry) => acc + entry.length, 0) & 4294967295,
        // size of the central directory (lo)
        centralDirectoryArray.reduce((acc, entry) => acc + entry.length, 0) >> 8 & 4294967295 & 255,
        // size of the central directory (hi)
        offset & 4294967295 & 255,
        // offset of start of central directory with respect to the starting disk number (lo)
        (offset & 4294967295) >> 8 & 255,
        // offset of start of central directory with respect to the starting disk number (hi)
        0,
        0
        // .zip file comment length
      ]);
      const zipFile = new Uint8Array(zipArray.reduce((acc, entry) => acc + entry.length, 0) + centralDirectoryArray.reduce((acc, entry) => acc + entry.length, 0) + endOfCentralDirectory.length);
      currentOffset = 0;
      zipArray.forEach((entry) => {
        zipFile.set(entry, currentOffset);
        currentOffset += entry.length;
      });
      centralDirectoryArray.forEach((entry) => {
        zipFile.set(entry, currentOffset);
        currentOffset += entry.length;
      });
      zipFile.set(endOfCentralDirectory, currentOffset);
      const zipBlob = new Blob([zipFile], { type: "application/zip" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(zipBlob);
      link.download = zipFileName;
      link.click();
      return zipBlob;
    }
  };

  // src/media/file/blob.js
  var Blob2 = class _Blob {
    /**
     * Converts a base64-encoded string to a Blob.
     * @param {string} base64 - The base64-encoded string.
     * @param {string} contentType - The content type of the Blob (e.g., 'image/jpeg').
     * @returns {Blob} - The Blob created from the base64 string.
     */
    static convertBase64ToBlob(base64, contentType) {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new _Blob([byteArray], { type: contentType });
    }
    /**
     * Creates a Blob URL from a Blob.
     * @param {Blob} blob - The Blob to create a URL for.
     * @returns {string} - The Blob URL.
     */
    static createBlobURL(blob) {
      return URL.createObjectURL(blob);
    }
    /**
     * Revokes a Blob URL to free up resources.
     * @param {string} url - The Blob URL to revoke.
     */
    static revokeBlobURL(url) {
      URL.revokeObjectURL(url);
    }
    /**
     * Initiates a download of a Blob as a file.
     * @param {Blob} blob - The Blob to download.
     * @param {string} filename - The name to be given to the downloaded file.
     */
    static downloadBlob(blob, filename) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  // src/network/URL/url.js
  var URLClass = class {
    /**
     * Parses a query string and returns an object containing the parameters.
     *
     * @param {string} queryString - The query string to parse.
     * @returns {object} - An object containing key-value pairs of parameters.
     */
    static parseQueryStringParameters(queryString) {
      const params = {};
      if (!queryString || typeof queryString !== "string") {
        return params;
      }
      queryString = queryString.startsWith("?") ? queryString.slice(1) : queryString;
      const pairs = queryString.split("&");
      for (const pair of pairs) {
        const [key, value] = pair.split("=");
        const decodedKey = decodeURIComponent(key);
        const decodedValue = value ? decodeURIComponent(value) : "";
        if (params.hasOwnProperty(decodedKey)) {
          if (Array.isArray(params[decodedKey])) {
            params[decodedKey].push(decodedValue);
          } else {
            params[decodedKey] = [params[decodedKey], decodedValue];
          }
        } else {
          params[decodedKey] = decodedValue;
        }
      }
      return params;
    }
    /**
     * Replaces or adds a query string parameter in a URL.
     *
     * @param {string} url - The URL to modify.
     * @param {string} key - The parameter key to replace or add.
     * @param {string} value - The new value for the parameter.
     * @returns {string} - The modified URL.
     */
    static replaceQueryStringParameter(url, key, value) {
      if (!url || typeof url !== "string") {
        return url;
      }
      const [baseUrl, queryString] = url.split("?");
      const params = {};
      if (queryString) {
        const pairs = queryString.split("&");
        for (const pair of pairs) {
          const [existingKey, existingValue] = pair.split("=");
          const decodedKey = decodeURIComponent(existingKey);
          const decodedValue = existingValue ? decodeURIComponent(existingValue) : "";
          params[decodedKey] = decodedValue;
        }
      }
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      params[encodedKey] = encodedValue;
      const newQueryString = Object.entries(params).map(([k, v]) => `${k}=${v}`).join("&");
      const modifiedUrl = newQueryString ? `${baseUrl}?${newQueryString}` : baseUrl;
      return modifiedUrl;
    }
    /**
     * Removes a query string parameter from a URL.
     *
     * @param {string} url - The URL to modify.
     * @param {string} key - The parameter key to remove.
     * @returns {string} - The modified URL.
     */
    static removeQueryStringParameter(url, key) {
      if (!url || typeof url !== "string") {
        return url;
      }
      const [baseUrl, queryString] = url.split("?");
      const params = {};
      if (queryString) {
        const pairs = queryString.split("&");
        for (const pair of pairs) {
          const [existingKey, existingValue] = pair.split("=");
          const decodedKey = decodeURIComponent(existingKey);
          const decodedValue = existingValue ? decodeURIComponent(existingValue) : "";
          params[decodedKey] = decodedValue;
        }
        delete params[key];
      }
      const newQueryString = Object.entries(params).map(([k, v]) => `${k}=${v}`).join("&");
      const modifiedUrl = newQueryString ? `${baseUrl}?${newQueryString}` : baseUrl;
      return modifiedUrl;
    }
    /**
     * Merges two URLs by combining their components.
     *
     * @param {string} baseURL - The base URL.
     * @param {string} relativeURL - The relative URL to be merged with the base URL.
     *
     * @returns {string} The merged URL.
     */
    static mergeURL(baseURL, relativeURL) {
      const base = new URL(baseURL);
      const relative = new URL(relativeURL, base);
      relative.search = relative.search || base.search;
      relative.hash = relative.hash || base.hash;
      return relative.href;
    }
    /**
     * Parses a URL into an object.
     * @param {string} url - The URL to parse.
     * @returns {URL} - The URL object.
     */
    static parseURL(url) {
      return new URL(url);
    }
    /**
     * Serializes a URL object into a string.
     * @param {URL} urlObject - The URL object to serialize.
     * @returns {string} - The serialized URL.
     */
    static serializeURL(urlObject) {
      return urlObject.toString();
    }
    /**
     * Checks if a given string is a valid URL.
     * @param {string} url - The URL to validate.
     * @returns {boolean} - True if the URL is valid, false otherwise.
     */
    static isValidURL(url) {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    }
  };

  // src/network/ip/ip.js
  var IP = class {
    /**
     * Validates an IPv4 address.
     * @param {string} ip - The IPv4 address to validate.
     * @returns {boolean} - True if the IPv4 address is valid, false otherwise.
     */
    static validateIPv4Address(ip) {
      const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
      return ipv4Regex.test(ip);
    }
    /**
     * Validates an IPv6 address.
     * @param {string} ip - The IPv6 address to validate.
     * @returns {boolean} - True if the IPv6 address is valid, false otherwise.
     */
    static validateIPv6Address(ip) {
      const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
      return ipv6Regex.test(ip);
    }
    /**
     * Converts an IPv4 address to IPv6 format.
     * @param {string} ip - The IPv4 address to convert.
     * @returns {string} - The IPv6 address derived from the given IPv4 address.
     */
    static convertIPv4ToIPv6(ip) {
      return `::ffff:${ip}`;
    }
    /**
     * Converts an IPv6 address to IPv4 format.
     * @param {string} ip - The IPv6 address to convert.
     * @returns {string|null} - The IPv4 address derived from the given IPv6 address,
     *                          or null if the input is not a valid IPv6 address with an IPv4 prefix.
     */
    static convertIPv6ToIPv4(ip) {
      const ipv4Regex = /::ffff:(\d+\.\d+\.\d+\.\d+)/;
      const match = ip.match(ipv4Regex);
      return match ? match[1] : null;
    }
  };

  // src/network/web-worker/webWorker.js
  var WebWorker = class {
    /**
     * Create a new web worker.
     * @param {string} scriptUrl - The URL of the worker script.
     * @returns {Worker} - The created web worker.
     */
    static createWorker(scriptUrl) {
      return new Worker(scriptUrl);
    }
    /**
     * Terminate a web worker.
     * @param {Worker} worker - The web worker to terminate.
     */
    static terminateWorker(worker) {
      worker.terminate();
    }
    /**
     * Post a message to a web worker.
     * @param {Worker} worker - The web worker to send the message to.
     * @param {any} message - The message to post to the worker.
     */
    static postMessageToWorker(worker, message) {
      worker.postMessage(message);
    }
    /**
     * Handle messages from a web worker.
     * @param {Worker} worker - The web worker to listen for messages.
     * @param {Function} callback - The callback function to handle messages.
     */
    static handleWorkerMessage(worker, callback2) {
      worker.onmessage = (event) => {
        callback2(event.data);
      };
    }
  };

  // src/device/detection/features.js
  var DetectFeature = class {
    /**
     * Detects the presence of ad blockers.
     * @returns {boolean} True if an ad blocker is detected, false otherwise.
     */
    static detectAdBlocker() {
      const testAd = document.createElement("div");
      testAd.innerHTML = "&nbsp;";
      testAd.className = "adsbox";
      document.body.appendChild(testAd);
      const isAdBlocked = testAd.offsetHeight === 0;
      document.body.removeChild(testAd);
      return isAdBlocked;
    }
    /**
     * Detects WebGL support in the browser.
     * @returns {boolean} True if WebGL is supported, false otherwise.
     */
    static detectWebGLSupport() {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (context) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
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
          resolve(true);
        };
        img.onerror = function() {
          resolve(false);
        };
        img.src = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4IBYAAAAwAQCdASoBAAEAAAB5IHpF5GAAAABJ6AA/AJYAAQAAAP8AAAABAAABAAEAAAABAAAAAQAAAAEAAAABAAgAAwAAPwAA";
        img.style.display = "none";
      });
    }
    /**
     * Detects if cookies are enabled in the browser.
     * @returns {boolean} True if cookies are enabled, false otherwise.
     */
    static detectCookiesEnabled() {
      const testCookieName = "testCookie";
      const testCookieValue = "testValue";
      document.cookie = `${testCookieName}=${testCookieValue}; path=/`;
      const cookiesEnabled = document.cookie.indexOf(testCookieName + "=" + testCookieValue) !== -1;
      document.cookie = `${testCookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      return cookiesEnabled;
    }
    /**
     * Detects if the Do Not Track (DNT) header is enabled.
     * @returns {boolean} True if Do Not Track is enabled, false otherwise.
     */
    static detectDoNotTrack() {
      if (navigator.doNotTrack === "1" || window.doNotTrack === "1") {
        return true;
      } else {
        return false;
      }
    }
    /**
     * Detects if local storage is supported in the browser.
     * @returns {boolean} True if local storage is supported, false otherwise.
     */
    static detectLocalStorage() {
      try {
        const testKey = "__testKey__";
        localStorage.setItem(testKey, "testValue");
        localStorage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Detects if session storage is supported in the browser.
     * @returns {boolean} True if session storage is supported, false otherwise.
     */
    static detectSessionStorage() {
      try {
        const testKey = "__testKey__";
        sessionStorage.setItem(testKey, "testValue");
        sessionStorage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    }
    /**
     * Detects if WebSockets are supported in the browser.
     * @returns {boolean} True if WebSockets are supported, false otherwise.
     */
    static detectWebSockets() {
      return "WebSocket" in window || "MozWebSocket" in window;
    }
    /**
     * Detects if Web Workers are supported in the browser.
     * @returns {boolean} True if Web Workers are supported, false otherwise.
     */
    static detectWebWorkers() {
      return "Worker" in window;
    }
    /**
     * Detects if SVG support is available in the browser.
     * @returns {boolean} True if SVG is supported, false otherwise.
     */
    static detectSVGSupport() {
      return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
    }
    /**
     * Detects if inline SVG support is available in the browser.
     * @returns {boolean} True if inline SVG is supported, false otherwise.
     */
    static detectInlineSVGSupport() {
      const div = document.createElement("div");
      div.innerHTML = "<svg></svg>";
      return div.firstChild && div.firstChild.namespaceURI === "http://www.w3.org/2000/svg";
    }
    /**
     * Detects if Canvas is supported in the browser.
     * @returns {boolean} True if Canvas is supported, false otherwise.
     */
    static detectCanvasSupport() {
      const canvas = document.createElement("canvas");
      return !!(canvas.getContext && canvas.getContext("2d"));
    }
    /**
     * Detects audio format support in the browser.
     * @returns {boolean} True if audio format is supported, false otherwise.
     */
    static detectAudioFormatSupport() {
      const audio = document.createElement("audio");
      return !!(audio.canPlayType && audio.canPlayType("audio/mpeg;").replace(/no/, ""));
    }
    /**
     * Detects video format support in the browser.
     * @returns {boolean} True if video format is supported, false otherwise.
     */
    static detectVideoFormatSupport() {
      const video = document.createElement("video");
      return !!(video.canPlayType && video.canPlayType("video/mp4;").replace(/no/, ""));
    }
    /**
     * Detects Battery API support in the browser.
     * @returns {boolean} True if Battery API is supported, false otherwise.
     */
    static detectBatteryAPI() {
      return "getBattery" in navigator;
    }
    /**
     * Detects Speech Recognition API support in the browser.
     *
     * @returns {boolean} True if Speech Recognition API is supported, false otherwise.
     */
    static detectSpeechRecognitionAPI() {
      return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    }
    /**
     * Detects WebRTC support in the browser.
     *
     * @returns {boolean} True if WebRTC is supported, false otherwise.
     */
    static detectWebRTC() {
      return "RTCPeerConnection" in window || "mozRTCPeerConnection" in window || "webkitRTCPeerConnection" in window;
    }
    /**
     * Detects Pointer Events support in the browser.
     *
     * @returns {boolean} True if Pointer Events are supported, false otherwise.
     */
    static detectPointerEvents() {
      return "PointerEvent" in window;
    }
    /**
     * Detects Touch Events support in the browser.
     * @returns {boolean} True if Touch Events are supported, false otherwise.
     */
    static detectTouchEvents() {
      return "ontouchstart" in window;
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
      return "vibrate" in navigator;
    }
    /**
     * Detects Clipboard API support in the browser.
     * @returns {boolean} True if Clipboard API is supported, false otherwise.
     */
    static detectClipboardAPI() {
      return "ClipboardItem" in window;
    }
    /**
     * Detects Speech Synthesis API support in the browser.
     * @returns {boolean} True if Speech Synthesis API is supported, false otherwise.
     */
    static detectSpeechSynthesisAPI() {
      return "speechSynthesis" in window;
    }
    /**
     * Detects Fullscreen API support in the browser.
     * @returns {boolean} True if Fullscreen API is supported, false otherwise.
     */
    static detectFullscreenAPI() {
      return "fullscreenEnabled" in document || "webkitFullscreenEnabled" in document || "mozFullScreenEnabled" in document;
    }
    /**
     * Detects Orientation API support in the browser.
     * @returns {boolean} True if Orientation API is supported, false otherwise.
     */
    static detectOrientationAPI() {
      return "orientation" in window || "onorientationchange" in window;
    }
    /**
     * Detects Gamepad API support in the browser.
     * @returns {boolean} True if Gamepad API is supported, false otherwise.
     */
    static detectGamepadAPI() {
      return "getGamepads" in navigator || "webkitGetGamepads" in navigator;
    }
    /**
     * Detects FileSystem API support in the browser.
     * @returns {boolean} True if FileSystem API is supported, false otherwise.
     */
    static detectFileSystemAPI() {
      return "requestFileSystem" in window || "webkitRequestFileSystem" in window;
    }
    /**
     * Detects Pointer Lock API support in the browser.
     * @returns {boolean} True if Pointer Lock API is supported, false otherwise.
     */
    static detectPointerLockAPI() {
      return "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document;
    }
    /**
     * Detects Permissions API support in the browser.
     * @returns {boolean} True if Permissions API is supported, false otherwise.
     */
    static detectPermissionsAPI() {
      return "permissions" in navigator;
    }
    /**
     * Detects Credential Management API support in the browser.
     * @returns {boolean} True if Credential Management API is supported, false otherwise.
     */
    static detectCredentialManagementAPI() {
      return "credentials" in navigator;
    }
    /**
     * Detects Payment Request API support in the browser.
     * @returns {boolean} True if Payment Request API is supported, false otherwise.
     */
    static detectPaymentRequestAPI() {
      return "PaymentRequest" in window;
    }
    /**
     * Detects WebAuthn API support in the browser.
     * @returns {boolean} True if WebAuthn API is supported, false otherwise.
     */
    static detectWebAuthnAPI() {
      return "PublicKeyCredential" in window;
    }
    /**
     * Detects Media Recorder API support in the browser.
     * @returns {boolean} True if Media Recorder API is supported, false otherwise.
     */
    static detectMediaRecorderAPI() {
      return "MediaRecorder" in window;
    }
    /**
     * Detects Media Source Extensions support in the browser.
     * @returns {boolean} True if Media Source Extensions are supported, false otherwise.
     */
    static detectMediaSourceExtensions() {
      return "MediaSource" in window && "SourceBuffer" in window;
    }
    /**
     * Detects Web Bluetooth API support in the browser.
     * @returns {boolean} True if Web Bluetooth API is supported, false otherwise.
     */
    static detectWebBluetoothAPI() {
      return "bluetooth" in navigator;
    }
    /**
     * Detects Broadcast Channel API support in the browser.
     * @returns {boolean} True if Broadcast Channel API is supported, false otherwise.
     */
    static detectBroadcastChannelAPI() {
      return "BroadcastChannel" in window;
    }
    /**
     * Detects FileSystem Access API support in the browser.
     * @returns {boolean} True if FileSystem Access API is supported, false otherwise.
     */
    static detectFileSystemAccessAPI() {
      return "showOpenFilePicker" in window;
    }
    /**
     * Detects Media Capabilities API support in the browser.
     * @returns {boolean} True if Media Capabilities API is supported, false otherwise.
     */
    static detectMediaCapabilitiesAPI() {
      return "mediaCapabilities" in navigator;
    }
    /**
     * Detects Picture-in-Picture API support in the browser.
     * @returns {boolean} True if Picture-in-Picture API is supported, false otherwise.
     */
    static detectPictureInPictureAPI() {
      return "pictureInPictureEnabled" in document || "webkitPictureInPictureEnabled" in document;
    }
    /**
     * Detects WebP image format support using modern APIs.
     * @returns {boolean} True if WebP image format is supported, false otherwise.
     */
    static detectWebPImageSupport() {
      const img = new Image();
      return "isImageBitmap" in window && "createImageBitmap" in window.ImageBitmap && "decode" in img;
    }
    /**
     * Detects EventSource API support in the browser.
     * @returns {boolean} True if EventSource API is supported, false otherwise.
     */
    static detectEventSourceAPI() {
      return "EventSource" in window;
    }
    /**
     * Detects Fetch API support in the browser.
     * @returns {boolean} True if Fetch API is supported, false otherwise.
     */
    static detectFetchAPI() {
      return "fetch" in window;
    }
    /**
     * Detects FormData API support in the browser.
     * @returns {boolean} True if FormData API is supported, false otherwise.
     */
    static detectFormDataAPI() {
      return "FormData" in window;
    }
    /**
     * Detects Intersection Observer API support in the browser.
     * @returns {boolean} True if Intersection Observer API is supported, false otherwise.
     */
    static detectIntersectionObserverAPI() {
      return "IntersectionObserver" in window;
    }
    /**
     * Detects Mutation Observer API support in the browser.
     * @returns {boolean} True if Mutation Observer API is supported, false otherwise.
     */
    static detectMutationObserverAPI() {
      return "MutationObserver" in window;
    }
    /**
     * Detects Resize Observer API support in the browser.
     * @returns {boolean} True if Resize Observer API is supported, false otherwise.
     */
    static detectResizeObserverAPI() {
      return "ResizeObserver" in window;
    }
    /**
     * Detects Performance API support in the browser.
     * @returns {boolean} True if Performance API is supported, false otherwise.
     */
    static detectPerformanceAPI() {
      return "performance" in window;
    }
    /**
     * Detects Geolocation API support in the browser.
     * @returns {boolean} True if Geolocation API is supported, false otherwise.
     */
    static detectGeolocationAPI() {
      return "geolocation" in navigator;
    }
    /**
     * Detects Page Visibility API support in the browser.
     * @returns {boolean} True if Page Visibility API is supported, false otherwise.
     */
    static detectPageVisibilityAPI() {
      return "hidden" in document || "webkitHidden" in document;
    }
    /**
     * Detects Idle API support in the browser.
     * @returns {boolean} True if Idle API is supported, false otherwise.
     */
    static detectIdle() {
      return "IdleManager" in window;
    }
    /**
     * Detects Credentials API support in the browser.
     * @returns {boolean} True if Credentials API is supported, false otherwise.
     */
    static detectCredentialsAPI() {
      return "credentials" in navigator;
    }
    /**
     * Detects Web Share API support in the browser.
     * @returns {boolean} True if Web Share API is supported, false otherwise.
     */
    static detectWebShareAPI() {
      return "share" in navigator;
    }
    /**
     * Detects Background Sync API support in the browser.
     * @returns {boolean} True if Background Sync API is supported, false otherwise.
     */
    static detectBackgroundSyncAPI() {
      return "BackgroundSyncManager" in window;
    }
    /**
     * Detects Notification API support in the browser.
     * @returns {boolean} True if Notification API is supported, false otherwise.
     */
    static detectNotificationAPI() {
      return "Notification" in window;
    }
    /**
     * Detects Push API support in the browser.
     * @returns {boolean} True if Push API is supported, false otherwise.
     */
    static detectPushAPI() {
      return "PushManager" in window;
    }
    /**
     * Detects Notifications API support in the browser.
     * @returns {boolean} True if Notifications API is supported, false otherwise.
     */
    static detectNotificationsAPI() {
      return "notifications" in navigator;
    }
    /**
     * Detects Service Worker API support in the browser.
     * @returns {boolean} True if Service Worker API is supported, false otherwise.
     */
    static detectServiceWorkerAPI() {
      return "serviceWorker" in navigator;
    }
    /**
     * Detects Share API support in the browser.
     * @returns {boolean} True if Share API is supported, false otherwise.
     */
    static detectShareAPI() {
      return "canShare" in navigator;
    }
    /**
     * Detects ImageBitmap API support in the browser.
     * @returns {boolean} True if ImageBitmap API is supported, false otherwise.
     */
    static detectImageBitmapAPI() {
      return "createImageBitmap" in window;
    }
    /**
     * Detects Audio Context API support in the browser.
     * @returns {boolean} True if Audio Context API is supported, false otherwise.
     */
    static detectAudioContextAPI() {
      return "AudioContext" in window || "webkitAudioContext" in window;
    }
    /**
     * Detects WebGL 2.0 API support in the browser.
     * @returns {boolean} True if WebGL 2.0 API is supported, false otherwise.
     */
    static detectWebGL2API() {
      const canvas = document.createElement("canvas");
      return "WebGL2RenderingContext" in window && canvas.getContext("webgl2");
    }
    /**
     * Detects WebVR API support in the browser.
     * @returns {boolean} True if WebVR API is supported, false otherwise.
     */
    static detectWebVRAPI() {
      return "getVRDisplays" in navigator;
    }
    /**
     * Detects WebXR API support in the browser.
     * @returns {boolean} True if WebXR API is supported, false otherwise.
     */
    static detectWebXRAPI() {
      return "xr" in navigator;
    }
    /**
     * Detects Offscreen Canvas API support in the browser.
     * @returns {boolean} True if Offscreen Canvas API is supported, false otherwise.
     */
    static detectOffscreenCanvasAPI() {
      return "OffscreenCanvas" in window;
    }
    /**
     * Detects Gamepad Haptic API support in the browser.
     * @returns {boolean} True if Gamepad Haptic API is supported, false otherwise.
     */
    static detectGamepadHapticAPI() {
      return "getGamepads" in navigator && "vibrationActuator" in navigator.getGamepads()[0];
    }
    /**
     * Detects Presentation API support in the browser.
     * @returns {boolean} True if Presentation API is supported, false otherwise.
     */
    static detectPresentationAPI() {
      return "PresentationRequest" in window;
    }
    /**
     * Detects Wake Lock API support in the browser.
     * @returns {boolean} True if Wake Lock API is supported, false otherwise.
     */
    static detectWakeLockAPI() {
      return "wakeLock" in navigator;
    }
    /**
     * Detects Ambient Light Sensor API support in the browser.
     * @returns {boolean} True if Ambient Light Sensor API is supported, false otherwise.
     */
    static detectAmbientLightSensorAPI() {
      return "AmbientLightSensor" in window;
    }
    /**
     * Detects Proximity Sensor API support in the browser.
     * @returns {boolean} True if Proximity Sensor API is supported, false otherwise.
     */
    static detectProximitySensorAPI() {
      return "ProximitySensor" in window;
    }
    /**
     * Detects Accelerometer API support in the browser.
     * @returns {boolean} True if Accelerometer API is supported, false otherwise.
     */
    static detectAccelerometerAPI() {
      return "Accelerometer" in window;
    }
    /**
     * Detects Gyroscope API support in the browser.
     * @returns {boolean} True if Gyroscope API is supported, false otherwise.
     */
    static detectGyroscopeAPI() {
      return "Gyroscope" in window;
    }
    /**
     * Detects Magnetometer API support in the browser.
     * @returns {boolean} True if Magnetometer API is supported, false otherwise.
     */
    static detectMagnetometerAPI() {
      return "Magnetometer" in window;
    }
    /**
     * Detects Generic Sensor API support in the browser.
     * @returns {boolean} True if Generic Sensor API is supported, false otherwise.
     */
    static detectGenericSensorAPI() {
      return "Sensor" in window;
    }
    /**
     * Detects WebUSB API support in the browser.
     * @returns {boolean} True if WebUSB API is supported, false otherwise.
     */
    static detectWebUSBAPI() {
      return "usb" in navigator;
    }
    /**
     * Detects Serial API support in the browser.
     * @returns {boolean} True if Serial API is supported, false otherwise.
     */
    static detectSerialAPI() {
      return "serial" in navigator;
    }
    /**
     * Detects Bluetooth API support in the browser.
     * @returns {boolean} True if Bluetooth API is supported, false otherwise.
     */
    static detectBluetoothAPI() {
      return "bluetooth" in navigator;
    }
    /**
     * Detects NFC API support in the browser.
     * @returns {boolean} True if NFC API is supported, false otherwise.
     */
    static detectNFCAPI() {
      return "nfc" in navigator;
    }
    /**
     * Detects WebNFC API support in the browser.
     * @returns {boolean} True if WebNFC API is supported, false otherwise.
     */
    static detectWebNFCAPI() {
      return "NDEFReader" in window;
    }
    /**
     * Detects Image Capture API support in the browser.
     * @returns {boolean} True if Image Capture API is supported, false otherwise.
     */
    static detectImageCaptureAPI() {
      return "ImageCapture" in window;
    }
    /**
     * Detects Media Devices API support in the browser.
     * @returns {boolean} True if Media Devices API is supported, false otherwise.
     */
    static detectMediaDevicesAPI() {
      return "mediaDevices" in navigator;
    }
    /**
     * Detects Screen Capture API support in the browser.
     * @returns {boolean} True if Screen Capture API is supported, false otherwise.
     */
    static detectScreenCaptureAPI() {
      return "getDisplayMedia" in navigator.mediaDevices;
    }
    /**
     * Detects WebXR Device API support in the browser.
     * @returns {boolean} True if WebXR Device API is supported, false otherwise.
     */
    static detectWebXRDeviceAPI() {
      return "xr" in navigator;
    }
    /**
     * Detects WebXR Session API support in the browser.
     * @returns {boolean} True if WebXR Session API is supported, false otherwise.
     */
    static detectWebXRSessionAPI() {
      return "XRSession" in window;
    }
    /**
     * Detects WebXR Frame API support in the browser.
     * @returns {boolean} True if WebXR Frame API is supported, false otherwise.
     */
    static detectWebXRFrameAPI() {
      return "XRFrame" in window;
    }
    /**
     * Detects WebXR Input Source API support in the browser.
     * @returns {boolean} True if WebXR Input Source API is supported, false otherwise.
     */
    static detectWebXRInputSourceAPI() {
      return "XRInputSource" in window;
    }
    /**
     * Detects WebXR Pose API support in the browser.
     * @returns {boolean} True if WebXR Pose API is supported, false otherwise.
     */
    static detectWebXRPoseAPI() {
      return "XRPose" in window;
    }
    /**
     * Detects WebXR Hit Test API support in the browser.
     * @returns {boolean} True if WebXR Hit Test API is supported, false otherwise.
     */
    static detectWebXRHitTestAPI() {
      return "XRHitTest" in window;
    }
    /**
     * Detects WebXR Hand API support in the browser.
     * @returns {boolean} True if WebXR Hand API is supported, false otherwise.
     */
    static detectWebXRHandAPI() {
      return "XRHand" in window;
    }
    /**
     * Detects WebXR Spatial Tracking API support in the browser.
     * @returns {boolean} True if WebXR Spatial Tracking API is supported, false otherwise.
     */
    static detectWebXRSpatialTrackingAPI() {
      return "XRSpatialTracking" in window;
    }
    /**
     * Detects WebXR Viewer Reference Space API support in the browser.
     * @returns {boolean} True if WebXR Viewer Reference Space API is supported, false otherwise.
     */
    static detectWebXRViewerReferenceSpaceAPI() {
      return "XRViewerReferenceSpace" in window;
    }
    /**
     * Detects WebXR Reference Space API support in the browser.
     * @returns {boolean} True if WebXR Reference Space API is supported, false otherwise.
     */
    static detectWebXRReferenceSpaceAPI() {
      return "XRReferenceSpace" in window;
    }
    /**
     * Detects WebXR Viewer API support in the browser.
     * @returns {boolean} True if WebXR Viewer API is supported, false otherwise.
     */
    static detectWebXRViewerAPI() {
      return "XRViewer" in window;
    }
    /**
     * Detects WebXR Layer API support in the browser.
     * @returns {boolean} True if WebXR Layer API is supported, false otherwise.
     */
    static detectWebXRLayerAPI() {
      return "XRLayer" in window;
    }
    /**
     * Detects WebXR Input API support in the browser.
     * @returns {boolean} True if WebXR Input API is supported, false otherwise.
     */
    static detectWebXRInputAPI() {
      return "XRInput" in window;
    }
    /**
     * Detects WebXR Hand Tracking API support in the browser.
     * @returns {boolean} True if WebXR Hand Tracking API is supported, false otherwise.
     */
    static detectWebXRHandTrackingAPI() {
      return "XRHandTracking" in window;
    }
    /**
     * Detects WebXR Depth API support in the browser.
     * @returns {boolean} True if WebXR Depth API is supported, false otherwise.
     */
    static detectWebXRDepthAPI() {
      return "XRDepth" in window;
    }
    /**
     * Detects WebXR Light Estimation API support in the browser.
     * @returns {boolean} True if WebXR Light Estimation API is supported, false otherwise.
     */
    static detectWebXRLightEstimationAPI() {
      return "XRLightEstimation" in window;
    }
    /**
     * Detects WebXR DOM Overlay API support in the browser.
     * @returns {boolean} True if WebXR DOM Overlay API is supported, false otherwise.
     */
    static detectWebXRDOMOverlayAPI() {
      return "XRDOMOverlay" in window;
    }
    /**
     * Detects WebXR DOM Overlay State API support in the browser.
     * @returns {boolean} True if WebXR DOM Overlay State API is supported, false otherwise.
     */
    static detectWebXRDOMOverlayStateAPI() {
      return "XRDOMOverlayState" in window;
    }
    /**
     * Detects WebXR DOM Overlay Position API support in the browser.
     * @returns {boolean} True if WebXR DOM Overlay Position API is supported, false otherwise.
     */
    static detectWebXRDOMOverlayPositionAPI() {
      return "XRDOMOverlayPosition" in window;
    }
    /**
     * Detects WebXR DOM Overlay Type API support in the browser.
     * @returns {boolean} True if WebXR DOM Overlay Type API is supported, false otherwise.
     */
    static detectWebXRDOMOverlayTypeAPI() {
      return "XRDOMOverlayType" in window;
    }
    /**
     * Detects WebXR Gamepad API support in the browser.
     * @returns {boolean} True if WebXR Gamepad API is supported, false otherwise.
     */
    static detectWebXRGamepadAPI() {
      return "XRGamepad" in window;
    }
    /**
     * Detects WebXR Gamepad Button API support in the browser.
     * @returns {boolean} True if WebXR Gamepad Button API is supported, false otherwise.
     */
    static detectWebXRGamepadButtonAPI() {
      return "XRGamepadButton" in window;
    }
    /**
     * Detects WebXR Gamepad Pose API support in the browser.
     * @returns {boolean} True if WebXR Gamepad Pose API is supported, false otherwise.
     */
    static detectWebXRGamepadPoseAPI() {
      return "XRGamepadPose" in window;
    }
    /**
     * Detects WebXR Frame Of Reference API support in the browser.
     * @returns {boolean} True if WebXR Frame Of Reference API is supported, false otherwise.
     */
    static detectWebXRFrameOfReferenceAPI() {
      return "XRFrameOfReference" in window;
    }
    /**
     * Detects WebXR Frame Request Callback API support in the browser.
     * @returns {boolean} True if WebXR Frame Request Callback API is supported, false otherwise.
     */
    static detectWebXRFrameRequestCallbackAPI() {
      return "XRFrameRequestCallback" in window;
    }
    /**
     * Detects WebXR Audio Listener API support in the browser.
     * @returns {boolean} True if WebXR Audio Listener API is supported, false otherwise.
     */
    static detectWebXRAudioListenerAPI() {
      return "XRAudioListener" in window;
    }
    /**
     * Detects WebXR Audio Context API support in the browser.
     * @returns {boolean} True if WebXR Audio Context API is supported, false otherwise.
     */
    static detectWebXRAudioContextAPI() {
      return "XRAudioContext" in window;
    }
    /**
     * Detects WebXR Input Source Event API support in the browser.
     * @returns {boolean} True if WebXR Input Source Event API is supported, false otherwise.
     */
    static detectWebXRInputSourceEventAPI() {
      return "XRInputSourceEvent" in window;
    }
    /**
     * Detects WebXR Input Source Array API support in the browser.
     * @returns {boolean} True if WebXR Input Source Array API is supported, false otherwise.
     */
    static detectWebXRInputSourceArrayAPI() {
      return "XRInputSourceArray" in window;
    }
    /**
     * Detects WebXR Input Source Hand API support in the browser.
     * @returns {boolean} True if WebXR Input Source Hand API is supported, false otherwise.
     */
    static detectWebXRInputSourceHandAPI() {
      return "XRInputSourceHand" in window;
    }
    /**
     * Detects WebXR Input Source Haptic Actuator API support in the browser.
     * @returns {boolean} True if WebXR Input Source Haptic Actuator API is supported, false otherwise.
     */
    static detectWebXRInputSourceHapticActuatorAPI() {
      return "XRInputSourceHapticActuator" in window;
    }
    /**
     * Detects WebXR Input Source Pose API support in the browser.
     * @returns {boolean} True if WebXR Input Source Pose API is supported, false otherwise.
     */
    static detectWebXRInputSourcePoseAPI() {
      return "XRInputSourcePose" in window;
    }
    /**
     * Detects WebXR Input Source Pose State API support in the browser.
     * @returns {boolean} True if WebXR Input Source Pose State API is supported, false otherwise.
     */
    static detectWebXRInputSourcePoseStateAPI() {
      return "XRInputSourcePoseState" in window;
    }
    /**
     * Detects WebXR Input Source Profile API support in the browser.
     * @returns {boolean} True if WebXR Input Source Profile API is supported, false otherwise.
     */
    static detectWebXRInputSourceProfileAPI() {
      return "XRInputSourceProfile" in window;
    }
    /**
     * Detects WebXR Input Source Target Ray Mode API support in the browser.
     * @returns {boolean} True if WebXR Input Source Target Ray Mode API is supported, false otherwise.
     */
    static detectWebXRInputSourceTargetRayModeAPI() {
      return "XRInputSourceTargetRayMode" in window;
    }
    /**
     * Detects WebXR Input Source Target Ray Space API support in the browser.
     * @returns {boolean} True if WebXR Input Source Target Ray Space API is supported, false otherwise.
     */
    static detectWebXRInputSourceTargetRaySpaceAPI() {
      return "XRInputSourceTargetRaySpace" in window;
    }
    /**
     * Detects WebXR Input Source Touchpad API support in the browser.
     * @returns {boolean} True if WebXR Input Source Touchpad API is supported, false otherwise.
     */
    static detectWebXRInputSourceTouchpadAPI() {
      return "XRInputSourceTouchpad" in window;
    }
    /**
     * Detects WebXR Input Source Vibration Actuator API support in the browser.
     * @returns {boolean} True if WebXR Input Source Vibration Actuator API is supported, false otherwise.
     */
    static detectWebXRInputSourceVibrationActuatorAPI() {
      return "XRInputSourceVibrationActuator" in window;
    }
    /**
     * Detects WebXR Hit Test Source API support in the browser.
     * @returns {boolean} True if WebXR Hit Test Source API is supported, false otherwise.
     */
    static detectWebXRHitTestSourceAPI() {
      return "XRHitTestSource" in window;
    }
    /**
     * Detects WebXR Hit Test Source Offset API support in the browser.
     * @returns {boolean} True if WebXR Hit Test Source Offset API is supported, false otherwise.
     */
    static detectWebXRHitTestSourceOffsetAPI() {
      return "XRHitTestSourceOffset" in window;
    }
    /**
     * Detects WebXR Hit Test Source Pose API support in the browser.
     * @returns {boolean} True if WebXR Hit Test Source Pose API is supported, false otherwise.
     */
    static detectWebXRHitTestSourcePoseAPI() {
      return "XRHitTestSourcePose" in window;
    }
    /**
     * Detects WebXR Hit Test Source Ray Space API support in the browser.
     * @returns {boolean} True if WebXR Hit Test Source Ray Space API is supported, false otherwise.
     */
    static detectWebXRHitTestSourceRaySpaceAPI() {
      return "XRHitTestSourceRaySpace" in window;
    }
    /**
     * Detects WebXR Hit Test Result API support in the browser.
     * @returns {boolean} True if WebXR Hit Test Result API is supported, false otherwise.
     */
    static detectWebXRHitTestResultAPI() {
      return "XRHitTestResult" in window;
    }
    /**
     * Detects WebXR Image API support in the browser.
     * @returns {boolean} True if WebXR Image API is supported, false otherwise.
     */
    static detectWebXRImageAPI() {
      return "XRImage" in window;
    }
    /**
     * Detects WebXR Image Bitmap API support in the browser.
     * @returns {boolean} True if WebXR Image Bitmap API is supported, false otherwise.
     */
    static detectWebXRImageBitmapAPI() {
      return "XRImageBitmap" in window;
    }
    /**
     * Detects WebXR Image Bitmap Array API support in the browser.
     * @returns {boolean} True if WebXR Image Bitmap Array API is supported, false otherwise.
     */
    static detectWebXRImageBitmapArrayAPI() {
      return "XRImageBitmapArray" in window;
    }
    /**
     * Detects WebXR Image Bitmap Rendering Context API support in the browser.
     * @returns {boolean} True if WebXR Image Bitmap Rendering Context API is supported, false otherwise.
     */
    static detectWebXRImageBitmapRenderingContextAPI() {
      return "XRImageBitmapRenderingContext" in window;
    }
    /**
     * Detects WebXR Image Bitmap Rendering Context Sync API support in the browser.
     * @returns {boolean} True if WebXR Image Bitmap Rendering Context Sync API is supported, false otherwise.
     */
    static detectWebXRImageBitmapRenderingContextSyncAPI() {
      return "XRImageBitmapRenderingContextSync" in window;
    }
    /**
     * Detects WebXR Image Decode API support in the browser.
     * @returns {boolean} True if WebXR Image Decode API is supported, false otherwise.
     */
    static detectWebXRImageDecodeAPI() {
      return "XRImageDecode" in window;
    }
    /**
     * Detects WebXR Image Encode API support in the browser.
     * @returns {boolean} True if WebXR Image Encode API is supported, false otherwise.
     */
    static detectWebXRImageEncodeAPI() {
      return "XRImageEncode" in window;
    }
  };

  // src/device/detection/device.js
  var DetectDevice = class {
    /**
     * Detect the user's browser information.
     * @returns {string} - The detected browser name.
     */
    static detectBrowser() {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes("chrome") && !userAgent.includes("edge")) {
        return "Chrome";
      } else if (userAgent.includes("firefox")) {
        return "Firefox";
      } else if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
        return "Safari";
      } else if (userAgent.includes("edge") || userAgent.includes("edg")) {
        return "Edge";
      } else if (userAgent.includes("msie") || userAgent.includes("trident")) {
        return "IE";
      } else if (userAgent.includes("opera") || userAgent.includes("opr")) {
        return "Opera";
      }
      return "Unknown Browser type!";
    }
    /**
     * Detect the user's operating system.
     * @returns {string} - The detected operating system.
     */
    static detectOS() {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes("win")) {
        return "Windows";
      } else if (userAgent.includes("mac")) {
        return "Mac OS";
      } else if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
        return "iOS";
      } else if (userAgent.includes("android")) {
        return "Android";
      } else if (userAgent.includes("linux")) {
        return "Linux";
      }
      return "Unknown OS";
    }
    /**
     * Detects whether the browser is running in a mobile environment.
     * @returns {boolean} - True if the browser is in a mobile environment, false otherwise.
     */
    static isMobileBrowser() {
      const userAgent = navigator.userAgent.toLowerCase();
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    }
    /**
     * Detect if the user is using a mobile device.
     * @returns {boolean} - True if the user is on a mobile device, false otherwise.
     */
    static detectMobileDevice() {
      const userAgent = navigator.userAgent.toLowerCase();
      return userAgent.includes("mobile") || userAgent.includes("android") || userAgent.includes("iphone");
    }
    /**
     * Detect if the user is using a touch device.
     * @returns {boolean} - True if the user is on a touch device, false otherwise.
     */
    static detectTouchDevice() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }
    /**
     * Detect the user's device type (desktop, tablet, mobile).
     * @returns {string} - The detected device type ("desktop", "tablet", "mobile").
     */
    static detectDeviceType() {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes("mobile") || userAgent.includes("android") || userAgent.includes("iphone")) {
        return "mobile";
      } else if (userAgent.includes("tablet") || userAgent.includes("ipad")) {
        return "tablet";
      } else {
        return "desktop";
      }
    }
    /**
     * Detect the user's preferred language.
     * @returns {string} - The detected language code (e.g., "en" for English).
     */
    static detectLanguage() {
      return navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || "";
    }
    /**
     * Detect the user's time zone.
     * @returns {string} - The detected time zone (e.g., "America/New_York").
     */
    static detectTimeZone() {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch (error) {
        console.error("Error detecting time zone:", error);
        return "";
      }
    }
  };

  // src/device/detection/envInfo.js
  var EnvInfo = class {
    /**
     * Get the browser window size.
     * @returns {Object} - An object with 'width' and 'height' properties representing the window size.
     */
    static getBrowserWindowSize() {
      return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      };
    }
    /**
     * Get the screen resolution.
     * @returns {Object} - An object with 'width' and 'height' properties representing the screen resolution.
     */
    static getScreenResolution() {
      return {
        width: screen.width,
        height: screen.height
      };
    }
    /**
     * Get the battery status asynchronously.
     * @param {Function} callback - The callback function to receive the battery status.
     */
    static getBatteryStatus(callback2) {
      if (DetectFeature.detectBatteryAPI()) {
        navigator.getBattery().then((battery) => {
          callback2({
            level: battery.level,
            charging: battery.charging,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime
          });
        });
      } else {
        callback2(null);
      }
    }
    /**
     * Get the network status asynchronously.
     * @param {Function} callback - The callback function to receive the network status.
     */
    static getNetworkStatus(callback2) {
      if ("onLine" in navigator) {
        callback2(navigator.onLine);
      } else {
        callback2(null);
      }
    }
    /**
     * Get the device orientation asynchronously.
     * @param {Function} callback - The callback function to receive the device orientation.
     */
    static getDeviceOrientation(callback2) {
      if (DetectFeature.detectOrientationAPI()) {
        window.addEventListener("deviceorientation", (event) => {
          callback2({
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma
          });
        });
      } else {
        callback2(null);
      }
    }
    /**
     * Get the device motion asynchronously.
     * @param {Function} callback - The callback function to receive the device motion.
     */
    static getDeviceMotion(callback2) {
      if ("DeviceMotionEvent" in window) {
        window.addEventListener("devicemotion", (event) => {
          callback2({
            acceleration: event.acceleration,
            accelerationIncludingGravity: event.accelerationIncludingGravity,
            rotationRate: event.rotationRate
          });
        });
      } else {
        callback2(null);
      }
    }
    /**
     * Get the available media devices asynchronously.
     * @param {Function} callback - The callback function to receive the media devices.
     */
    static getMediaDevices(callback2) {
      if ("navigator" in window && "mediaDevices" in navigator) {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          callback2(devices);
        }).catch(() => {
          callback2(null);
        });
      } else {
        callback2(null);
      }
    }
    /**
     * Get the location information based on IP address asynchronously using ipinfo.io.
     * @param {string} ip - The IP address.
     * @param {Function} callback - The callback function to receive the location information.
     */
    static getLocationByIP(ip, callback2) {
      const apiUrl = `https://ipinfo.io/${ip}/json`;
      fetch(apiUrl).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch geolocation information");
        }
        return response.json();
      }).then((data) => {
        const location = {
          latitude: parseFloat(data.loc.split(",")[0]),
          longitude: parseFloat(data.loc.split(",")[1])
        };
        callback2(location);
      }).catch((error) => {
        console.error("Error fetching geolocation information:", error);
        callback2(null);
      });
    }
    /**
     * Get the geolocation asynchronously.
     * @param {Function} callback - The callback function to receive the geolocation.
     */
    static getGeolocation(callback2) {
      if (DetectFeature.detectGeolocationAPI()) {
        navigator.geolocation.getCurrentPosition((position) => {
          callback2({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        }, () => {
          callback2(null);
        });
      } else {
        callback2(null);
      }
    }
  };

  // src/device/storage/browser-storage.js
  var BrowserStorage = class {
    /**
     * Sets a key-value pair in local storage.
     * @param {string} key - The key for the storage item.
     * @param {string} value - The value to be stored.
     */
    static setLocal(key, value) {
      localStorage.setItem(key, value);
    }
    /**
     * Gets the value associated with a key from local storage.
     * @param {string} key - The key for the storage item.
     * @returns {string|null} - The stored value or null if the key is not found.
     */
    static getLocal(key) {
      return localStorage.getItem(key);
    }
    /**
     * Removes a key-value pair from local storage.
     * @param {string} key - The key for the storage item to be removed.
     */
    static removeLocal(key) {
      localStorage.removeItem(key);
    }
    /**
     * Clears all key-value pairs from local storage.
     */
    static clearLocal() {
      localStorage.clear();
    }
    /**
     * Sets a key-value pair in session storage.
     * @param {string} key - The key for the storage item.
     * @param {string} value - The value to be stored.
     */
    static setSession(key, value) {
      sessionStorage.setItem(key, value);
    }
    /**
     * Gets the value associated with a key from session storage.
     * @param {string} key - The key for the storage item.
     * @returns {string|null} - The stored value or null if the key is not found.
     */
    static getSession(key) {
      return sessionStorage.getItem(key);
    }
    /**
     * Removes a key-value pair from session storage.
     * @param {string} key - The key for the storage item to be removed.
     */
    static removeSession(key) {
      sessionStorage.removeItem(key);
    }
    /**
     * Clears all key-value pairs from session storage.
     */
    static clearSession() {
      sessionStorage.clear();
    }
    /**
     * Retrieves the key at the specified index from local storage.
     * @param {number} index - The index of the key to retrieve.
     * @returns {string|null} - The key or null if the index is out of bounds.
     */
    static getLocalKeyByIndex(index) {
      return localStorage.key(index);
    }
    /**
     * Retrieves the key at the specified index from session storage.
     * @param {number} index - The index of the key to retrieve.
     * @returns {string|null} - The key or null if the index is out of bounds.
     */
    static getSessionKeyByIndex(index) {
      return sessionStorage.key(index);
    }
    /**
     * Retrieves the number of key-value pairs stored in local storage.
     * @returns {number} - The number of key-value pairs.
     */
    static getLocalLength() {
      return localStorage.length;
    }
    /**
     * Retrieves the number of key-value pairs stored in session storage.
     * @returns {number} - The number of key-value pairs.
     */
    static getSessionLength() {
      return sessionStorage.length;
    }
    /**
     * Checks if a key exists in local storage.
     * @param {string} key - The key to check for existence.
     * @returns {boolean} - True if the key exists, false otherwise.
     */
    static isLocalKeyExists(key) {
      return localStorage.getItem(key) !== null;
    }
    /**
     * Checks if a key exists in session storage.
     * @param {string} key - The key to check for existence.
     * @returns {boolean} - True if the key exists, false otherwise.
     */
    static isSessionKeyExists(key) {
      return sessionStorage.getItem(key) !== null;
    }
    /**
     * Retrieves all keys stored in local storage.
     * @returns {Array<string>} - An array containing all keys in local storage.
     */
    static getAllLocalKeys() {
      return Object.keys(localStorage);
    }
    /**
     * Retrieves all keys stored in session storage.
     * @returns {Array<string>} - An array containing all keys in session storage.
     */
    static getAllSessionKeys() {
      return Object.keys(sessionStorage);
    }
    /**
     * Retrieves all values stored in local storage.
     * @returns {Array<string>} - An array containing all values in local storage.
     */
    static getAllLocalValues() {
      return Object.values(localStorage);
    }
    /**
     * Retrieves all values stored in session storage.
     * @returns {Array<string>} - An array containing all values in session storage.
     */
    static getAllSessionValues() {
      return Object.values(sessionStorage);
    }
    /**
     * Retrieves all key-value pairs stored in local storage.
     * @returns {Object} - An object containing all key-value pairs in local storage.
     */
    static getAllLocalItems() {
      const items = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        items[key] = localStorage.getItem(key);
      }
      return items;
    }
    /**
     * Retrieves all key-value pairs stored in session storage.
     * @returns {Object} - An object containing all key-value pairs in session storage.
     */
    static getAllSessionItems() {
      const items = {};
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        items[key] = sessionStorage.getItem(key);
      }
      return items;
    }
  };

  // src/device/storage/device-storage.js
  var DeviceStorage = class {
    /**
     * Get the total storage capacity of the device.
     * @returns {Promise<number>} - A promise that resolves with the total storage capacity in bytes.
     */
    static async getTotalStorageCapacity() {
      const storageInfo = await navigator.storage.estimate();
      return storageInfo.quota;
    }
    /**
     * Get the used storage space on the device.
     * @returns {Promise<number>} - A promise that resolves with the used storage space in bytes.
     */
    static async getUsedStorageSpace() {
      const storageInfo = await navigator.storage.estimate();
      return storageInfo.usage;
    }
    /**
     * Get the available storage space on the device.
     * @returns {Promise<number>} - A promise that resolves with the available storage space in bytes.
     */
    static async getAvailableStorageSpace() {
      const storageInfo = await navigator.storage.estimate();
      return storageInfo.quota - storageInfo.usage;
    }
    /**
     * Check if there is enough free space on the device for a given amount.
     * @param {number} requiredSpace - The required space in bytes.
     * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating if there is enough free space.
     */
    static async hasEnoughFreeSpace(requiredSpace) {
      return this.getAvailableStorageSpace().then((availableSpace) => availableSpace >= requiredSpace);
    }
    /**
     * Get the storage type of the device (e.g., 'temporary', 'persistent').
     * @returns {Promise<string>} - A promise that resolves with the storage type.
     */
    static async getStorageType() {
      const persisted = await navigator.storage.persisted();
      return persisted ? "persistent" : "temporary";
    }
    /**
     * Request persistent storage on the device.
     * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating if the request was successful.
     */
    static async requestPersistentStorage() {
      if (navigator.storage && navigator.storage.persist) {
        const granted = await navigator.storage.persist();
        return granted === true;
      }
      return Promise.resolve(false);
    }
    /**
     * Get the default quota for persistent storage.
     * @returns {Promise<number>} - A promise that resolves with the default quota for persistent storage in bytes.
     */
    static async getDefaultPersistentStorageQuota() {
      const persisted = await navigator.storage.persisted();
      if (persisted) {
        return navigator.storage.persist().then((granted) => granted ? 0 : -1);
      }
      return -1;
    }
  };

  // src/index.js
  var Butility = {
    Element,
    Attribute,
    Obj,
    String: String2,
    Scroll,
    Utility,
    Ripple,
    RippleEffect,
    DragDrop,
    Style,
    Color,
    Modal,
    Tooltip,
    Validate,
    CreditCard,
    FormAction,
    SerializeForm,
    File,
    QRCode,
    Blob: Blob2,
    Image: Image2,
    Capture,
    FullScreen,
    IP,
    RequestServer,
    URLClass,
    WebWorker,
    DetectDevice,
    DetectFeature,
    EnvInfo,
    DeviceStorage,
    BrowserStorage
  };
  var src_default = Butility;
})();
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */
