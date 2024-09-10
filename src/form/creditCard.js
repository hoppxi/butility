
/**
 * @author - Ermiyas Arage
 * @license MIT
 */

/**
 * Utility functions for credit card-related operations.
 * @class 
 */
export class CreditCard {
    /**
     * Check if the provided credit card number is valid.
     * Using Luhn's algorithm for better validation.
     *
     * @param {string} cardNumber - The credit card number to validate.
     * @returns {boolean} - True if the credit card number is valid, false otherwise.
     */
    static isValidCreditCardNumber(cardNumber) {
        if (!/^\d{16}$/.test(cardNumber)) return false;

        // Luhn's Algorithm for credit card validation
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

        const [month, year] = expiryDate.split('/').map(Number);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear() % 100;

        if (month < 1 || month > 12) return false;

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
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
        // Supports both 3-digit and 4-digit CVVs (some cards use 4-digit CVVs)
        return /^\d{3,4}$/.test(cvv);
    }

    /**
     * Mask the provided credit card number, showing only the last four digits.
     *
     * @param {string} cardNumber - The credit card number to mask.
     * @returns {string} - The masked credit card number.
     */
    static maskCreditCardNumber(cardNumber) {
        return cardNumber.slice(-4).padStart(cardNumber.length, '*');
    }
}
