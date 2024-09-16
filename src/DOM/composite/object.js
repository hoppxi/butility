
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
        if (obj1 === obj2) return true;

        if (obj1 === null || obj2 === null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
            return false;
        }

        if (obj1.constructor !== obj2.constructor) return false;

        if (Array.isArray(obj1)) {
            if (obj1.length !== obj2.length) return false;
            return obj1.every((item, index) => this.compareObjects(item, obj2[index]));
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) return false;

        // Check for differences in keys and values recursively
        for (let key of keys1) {
            if (!keys2.includes(key)) return false;
            if (!this.compareObjects(obj1[key], obj2[key])) return false;
        }

        return true;
    }

    /**
     * Deep clone an object.
     * @param {Object} obj - The object to clone.
     * @param {WeakMap} cache
     * @returns {Object} - The cloned object.
     */
    static deepCloneObject(obj, cache = new WeakMap()) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (cache.has(obj)) return cache.get(obj);
    
        let clone;
        if (obj instanceof Date) {
            clone = new Date(obj);
        } else if (obj instanceof RegExp) {
            clone = new RegExp(obj);
        } else if (obj instanceof Map) {
            clone = new Map(Array.from(obj.entries(), ([key, value]) => [this.deepCloneObject(key, cache), this.deepCloneObject(value, cache)]));
        } else if (obj instanceof Set) {
            clone = new Set(Array.from(obj, value => this.deepCloneObject(value, cache)));
        } else if (Array.isArray(obj)) {
            clone = obj.map(item => this.deepCloneObject(item, cache));
        } else {
            clone = {};
            cache.set(obj, clone); // Handle circular references
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clone[key] = this.deepCloneObject(obj[key], cache);
                }
            }
        }
        return clone;
    }
    

    /**
     * Deep merge two objects.
     * @param {Object} target - The target object.
     * @param {Object} source - The source object.
     * @returns {Object} - The merged object.
     */
    static deepMergeObjects(target, source) {
        if (!this.isPlainObject(target) && !Array.isArray(target)) return source;
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                const targetValue = target[key];
                const sourceValue = source[key];
    
                if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
                    target[key] = [...new Set([...targetValue, ...sourceValue])];
                } else if (targetValue instanceof Map && sourceValue instanceof Map) {
                    sourceValue.forEach((value, key) => targetValue.set(key, this.deepMergeObjects(targetValue.get(key), value)));
                } else if (targetValue instanceof Set && sourceValue instanceof Set) {
                    sourceValue.forEach(value => targetValue.add(value));
                } else if (this.isPlainObject(targetValue) && this.isPlainObject(sourceValue)) {
                    target[key] = this.deepMergeObjects({ ...targetValue }, sourceValue);
                } else {
                    target[key] = sourceValue;
                }
            }
        }
        return target;
    }
    

    /**
     * Deep freeze an object.
     * @param {Object} obj - The object to freeze.
     * @returns {Object} - The frozen object.
     */
    static deepFreezeObject(obj) {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
    
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (typeof value === 'object' && value !== null) {
                this.deepFreezeObject(value);
            }
        });
    
        if (obj instanceof Map) {
            obj.forEach((value, key) => this.deepFreezeObject(value));
        } else if (obj instanceof Set) {
            obj.forEach(value => this.deepFreezeObject(value));
        }
    
        return Object.freeze(obj);
    }
    

    /**
     * Check if an object is a plain object.
     * @param {Object} obj - The object to check.
     * @returns {boolean} - True if the object is a plain object, false otherwise.
     */
    static isPlainObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]' && (obj.constructor === Object || typeof obj.constructor === 'undefined');
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
        if (subset === superset) return true;
    
        for (const key in subset) {
            if (!superset.hasOwnProperty(key)) return false;
    
            if (typeof subset[key] === 'object' && subset[key] !== null) {
                if (!this.isObjectSubset(subset[key], superset[key])) return false;
            } else if (subset[key] !== superset[key]) {
                return false;
            }
        }
    
        return true;
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
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    mappedObj[key] = this.objectMap(obj[key], callback);
                } else {
                    mappedObj[key] = callback(obj[key], key, obj);
                }
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
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                if (typeof value === 'object' && value !== null) {
                    const filteredChild = this.objectFilter(value, predicate);
                    if (Object.keys(filteredChild).length > 0) filteredObj[key] = filteredChild;
                } else if (predicate(value, key, obj)) {
                    filteredObj[key] = value;
                }
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
                const value = obj[key];
                if (typeof value === 'object' && value !== null) {
                    accumulator = this.objectReduce(value, callback, accumulator);
                } else {
                    accumulator = callback(accumulator, value, key, obj);
                }
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
        const length = Math.min(keys.length, values.length);
        for (let i = 0; i < length; i++) {
            zippedObj[keys[i]] = values[i];
        }
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
}