
/**
 * @author - Ermiyas Arage
 * @license MIT
 */

import { Utility } from '../DOM/main/utility.js';
import { Style } from '../DOM/styling/style.js';
import { Element } from '../DOM/element/element.js';


/**
 * Utility class for form related tasks
 * @class
 */
export class FormAction {
    /**
     * Generates a secure password with multiple customization options, including character sets,
     * entropy calculation, exclusion rules, and cryptographic security.
     * @param {number} length - The length of the password.
     * @param {Object} options - Options for generating the password.
     * @param {string[]} [options.customCharsets] - Array of custom character sets (strings) to use.
     * @param {boolean} [options.includeSymbols=true] - Whether to include symbols in the password.
     * @param {boolean} [options.includeNumbers=true] - Whether to include numbers in the password.
     * @param {boolean} [options.includeUppercase=true] - Whether to include uppercase letters.
     * @param {boolean} [options.includeLowercase=true] - Whether to include lowercase letters.
     * @param {boolean} [options.avoidRepeats=true] - Prevents consecutive repeating characters.
     * @param {boolean} [options.useCryptoRandom=true] - Whether to use a cryptographically secure random generator.
     * @param {number} [options.minEntropy=50] - Minimum entropy for the generated password (in bits).
     * @param {string[]} [options.exclude] - List of characters to exclude from the password.
     * @param {Function} [options.onCharacterSelected] - Custom callback after each character is selected.
     * @returns {string} The generated password.
     * @throws {Error} Throws an error if password criteria cannot be met.
     */
    static generatePassword(length, options = {}) {
        // Default options
        const {
            customCharsets = [],
            includeSymbols = true,
            includeNumbers = true,
            includeUppercase = true,
            includeLowercase = true,
            avoidRepeats = true,
            useCryptoRandom = true,
            minEntropy = 50,
            exclude = [],
            onCharacterSelected = null
        } = options;

        if (length <= 0 || typeof length !== 'number') {
            throw new Error("Password length must be a positive number.");
        }

        // Define character sets
        const lowercaseCharset = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberCharset = '0123456789';
        const symbolCharset = '!@#$%^&*()-_=+[]{}|;:<>,.?/~`';
        
        // Build the final charset based on options
        let charset = customCharsets.join('') ||
                    (includeLowercase ? lowercaseCharset : '') +
                    (includeUppercase ? uppercaseCharset : '') +
                    (includeNumbers ? numberCharset : '') +
                    (includeSymbols ? symbolCharset : '');

        // Remove excluded characters from charset
        charset = charset.split('').filter(char => !exclude.includes(char)).join('');

        if (!charset.length) {
            throw new Error("Charset is empty. Please provide valid options or customCharsets.");
        }

        // Calculate entropy: log2(charset length^password length)
        const calculateEntropy = (charLength, pwdLength) => {
            return Math.log2(Math.pow(charLength, pwdLength));
        };

        let entropy = calculateEntropy(charset.length, length);
        if (entropy < minEntropy) {
            throw new Error(`Password entropy (${entropy.toFixed(2)} bits) is below the required minimum (${minEntropy} bits). Increase password length or diversify the charset.`);
        }

        // Helper function for generating a secure random index
        const getRandomIndex = (max) => {
            if (useCryptoRandom && window.crypto && window.crypto.getRandomValues) {
                const randomArray = new Uint32Array(1);
                window.crypto.getRandomValues(randomArray);
                return randomArray[0] % max;
            } else {
                return Math.floor(Math.random() * max);
            }
        };

        let password = '';
        let lastChar = null;

        // Function to avoid repeating characters
        const pickCharacter = () => {
            let char;
            do {
                const randomIndex = getRandomIndex(charset.length);
                char = charset[randomIndex];
            } while (avoidRepeats && char === lastChar); // Avoid consecutive repeats
            return char;
        };

        // Generate the password
        for (let i = 0; i < length; i++) {
            const selectedChar = pickCharacter();
            password += selectedChar;
            lastChar = selectedChar;

            if (typeof onCharacterSelected === 'function') {
                onCharacterSelected(selectedChar, i);
            }
        }

        // entropy check to ensure security
        entropy = calculateEntropy(charset.length, password.length);
        console.log(`Password generated with entropy: ${entropy.toFixed(2)} bits.`);

        return password;
    }

    /**
     * Encrypt text with a key.
     * @param {string} text - The text to encrypt.
     * @param {string} key - The encryption key.
     * @returns {string} - The encrypted text.
     */
    static encryptText(text, key) {
        const cipher = crypto.createCipheriv('aes-256-cbc', key);
        let encryptedText = cipher.update(text, 'utf-8', 'hex');
        encryptedText += cipher.final('hex');
        return encryptedText;
    }

    /**
     * Decrypt encrypted text with a key.
     * @param {string} encryptedText - The encrypted text to decrypt.
     * @param {string} key - The decryption key.
     * @returns {string} - The decrypted text.
     */
    static decryptText(encryptedText, key) {
        const decipher = crypto.createDecipheriv('aes-256-cbc', key);
        let decryptedText = decipher.update(encryptedText, 'hex', 'utf-8');
        decryptedText += decipher.final('utf-8');
        return decryptedText;
    }

    /**
     * Disable all input elements in a form.
     * @param {HTMLFormElement} formElement - The form element to disable.
     */
    static disableForm(formElement) {
        const inputs = formElement.querySelectorAll('input, textarea, select');
        inputs.forEach(input => (input.disabled = true));
    }

    /**
     * Enable all input elements in a form.
     * @param {HTMLFormElement} formElement - The form element to enable.
     */
    static enableForm(formElement) {
        const inputs = formElement.querySelectorAll('input, textarea, select');
        inputs.forEach(input => (input.disabled = false));
    }

    /**
     * Scroll to the first error in a form.
     * @param {HTMLFormElement} formElement - The form element to scroll within.
     */
    static scrollToError(formElement) {
        const firstError = formElement.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Show an error message associated with an element.
     * @param {HTMLElement} element - The element to show the error message for.
     * @param {string} message - The error message to display.
     */
    static showErrorMessage(element, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.text = message;
        errorElement.prependElement(element.nextSibling);
    }

    /**
     * Hide the error message associated with an element.
     * @param {HTMLElement} element - The element to hide the error message for.
     */
    static hideErrorMessage(element) {
        const errorElement = element.parentNode.querySelector('.error');
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
        inputElement.value = '';
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
        inputElement.setCustomValidity(isValid ? '' : 'Invalid input');
    }

    /**
     * Highlight an input element as invalid.
     * @param {HTMLInputElement} inputElement - The input element to highlight.
     */
    static highlightInvalidInput(inputElement) {
        Utility.addClass(inputElement, 'invalid');

        if (Utility.hasClass(inputElement, 'invalid')) {
            Style.addStyles(inputElement, {borderColor: 'red'});
        }
    }
}



/**
 * Utility class to serialize a form data or deserialize
 * @class
 */
export class SerializeForm {
    /**
     * Serialize form data into a URL-encoded string.
     * @param {HTMLFormElement} formElement - The HTML form element to serialize.
     * @returns {string} URL-encoded form data string.
     */
    static serializeFormData(formElement) {
        /**
         * @type {Array<string>}
         */
        const formDataArray = [];
        
        for (const field of new FormData(formElement)) {
            formDataArray.push(`${encodeURIComponent(field[0])}=${encodeURIComponent(field[1])}`);
        }

        return formDataArray.join('&');
    }

    /**
     * Deserialize URL-encoded form data string and populate the form fields.
     * @param {HTMLFormElement} formElement - The HTML form element to populate.
     * @param {string} data - URL-encoded form data string.
     */
    static deserializeFormData(formElement, data) {
        const formDataPairs = data.split('&');
        
        for (const pair of formDataPairs) {
            const [name, value] = pair.split('=');
            const decodedName = decodeURIComponent(name);
            const decodedValue = decodeURIComponent(value);

            const inputElement = formElement.elements.namedItem(decodedName);

            if (inputElement) {
                if (inputElement.type === 'checkbox' || inputElement.type === 'radio') {
                    inputElement.checked = inputElement.value === decodedValue;
                } else {
                    inputElement.value = decodedValue;
                }
            }
        }
    }

}