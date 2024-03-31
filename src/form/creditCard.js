
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */

/**
 * Utility functions for credit card-related operations.
 * @class 
 */
export default class CreditCard {
    /**
     * Check if the provided credit card number is valid.
     *
     * @param {string} cardNumber - The credit card number to validate.
     * @returns {boolean} - True if the credit card number is valid, false otherwise.
     */
    static isValidCreditCardNumber(cardNumber) {
        // Basic check for a valid credit card number (16 digits)
        return /^\d{16}$/.test(cardNumber);
    }

    /**
     * Check if the provided credit card expiry date is valid.
     *
     * @param {string} expiryDate - The credit card expiry date to validate (format: MM/YY).
     * @returns {boolean} - True if the expiry date is valid, false otherwise.
     */
    static isValidCreditCardExpiry(expiryDate) {
        // Basic check for a valid expiry date (MM/YY format)
        const [month, year] = expiryDate.split('/');
        const currentYear = new Date().getFullYear() % 100; // Get last two digits of the current year

        return /^\d{2}$/.test(month) && /^\d{2}$/.test(year) && +month <= 12 && +year >= currentYear;
    }

    /**
     * Check if the provided credit card CVV is valid.
     *
     * @param {string} cvv - The credit card CVV to validate.
     * @returns {boolean} - True if the CVV is valid, false otherwise.
     */
    static isValidCreditCardCVV(cvv) {
        // Basic check for a valid CVV (3 digits)
        return /^\d{3}$/.test(cvv);
    }

    /**
     * Mask the provided credit card number, showing only the last four digits.
     *
     * @param {string} cardNumber - The credit card number to mask.
     * @returns {string} - The masked credit card number.
     */
    static maskCreditCardNumber(cardNumber) {
        // Mask all but the last four digits
        const maskedDigits = '*'.repeat(cardNumber.length - 4);
        const lastFourDigits = cardNumber.slice(-4);
        return maskedDigits + lastFourDigits;
    }

    /**
     * Format the provided credit card expiry date.
     *
     * @param {string} expiryDate - The credit card expiry date to format (MM/YY).
     * @returns {string} - The formatted expiry date.
     */
    static formatCreditCardExpiry(expiryDate) {
        // Format the expiry date (MM/YY format)
        const [month, year] = expiryDate.split('/');
        return `${month}/${year}`;
    }

    /**
     * Format the provided credit card CVV.
     *
     * @param {string} cvv - The credit card CVV to format.
     * @returns {string} - The formatted CVV.
     */
    static formatCreditCardCVV(cvv) {
        // Return the CVV as is (no specific formatting)
        return cvv;
    }
}
