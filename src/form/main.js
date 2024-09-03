
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
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
     * Generate a random password.
     * @param {number} length - The length of the password.
     * @param {object} options - Additional options for password generation (eg. charset).
     * @returns {string} - The generated password.
     */
    static generatePassword(length, options) {
        const charset = options.charset || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';
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
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashedPassword = Array.from(new Uint8Array(hashBuffer)).map(byte => String.fromCharCode(byte)).join('');
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
     * Generate a secure token of the specified length using the Web Crypto API.
     * @param {number} length - The length of the token.
     * @returns {Promise<string>} - A promise that resolves to the generated secure token.
     */
    static async generateToken(length) {
        const tokenArray = new Uint8Array(length);
        crypto.getRandomValues(tokenArray);
        const token = Array.from(tokenArray).map(byte => byte.toString(16).padStart(2, '0')).join('');
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
        const otp = Array.from(otpArray).map(byte => byte.toString(10)).join('').slice(0, length);
        return otp;
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
        Element.setElementText(errorElement, message);
        Element.prependElement(errorElement, element.nextSibling);
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