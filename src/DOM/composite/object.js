
/**
 * @author - Ermiyas Arage
 * @license MIT
 */

/**
 * Utility functions for working with objects.
 * @class
 */
export class Obj {

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
                if (merged.hasOwnProperty(key) && typeof merged[key] === 'object' && typeof source[key] === 'object') {
                    merged[key] = Obj.deepMergeObjects(merged[key], source[key]);
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
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                Obj.deepFreezeObject(obj[key]);
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
        return typeof obj === 'object' && obj !== null && obj.constructor === Object;
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
                if (typeof subset[key] === 'object' && typeof superset[key] === 'object') {
                    if (!Obj.isObjectSubset(subset[key], superset[key])) {
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
    static objectMap(obj, callback) {
        const mappedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                mappedObj[key] = callback(obj[key], key, obj);
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
    static objectReduce(obj, callback, initialValue) {
        let accumulator = initialValue;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                accumulator = callback(accumulator, obj[key], key, obj);
            }
        }
        return accumulator;
    }

    /**
     * Iterate over the values of an object and apply a function.
     * @param {Object} obj - The object.
     * @param {Function} callback - The function to apply to each value.
     */
    static objectForEach(obj, callback) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                callback(obj[key], key, obj);
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
        keys.forEach(key => {
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
        keys.forEach(key => {
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
        const queryString = Object.entries(obj)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
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
}