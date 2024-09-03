
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */

/**
 * Utility class for form validation.
 * @class
 */
export class Validate {

    /**
     * Validates an email address.
     *
     * @param {string} email - The email address to validate.
     * @returns {boolean} - Returns true if the email is valid, otherwise false.
     */
    static validateEmailAddress(email) {
        // Regular expression to validate the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Check if the email format is valid
        if (!emailRegex.test(email)) {
            return false;
        }
    
        // Split the email address into local and domain parts
        const [localPart, domainPart] = email.split('@');
    
        // Validate the length of the local and domain parts
        if (localPart.length > 64 || domainPart.length > 255) {
            return false;
        }
    
        // Validate the length of the combined local and domain parts
        if (email.length > 320) {
            return false;
        }
    
        // Validate the characters in the local part
        const localPartRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
        if (!localPartRegex.test(localPart)) {
            return false;
        }
    
        // Validate the characters in the domain part
        const domainPartRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
        if (!domainPartRegex.test(domainPart)) {
            return false;
        }
    
        // Validate the top-level domain (TLD)
        const tldRegex = /^[a-zA-Z]{2,}$/;
        const topLevelDomain = domainPart.split('.').pop();
        if (!tldRegex.test(topLevelDomain)) {
            return false;
        }
    
        // All validation checks passed, the email is valid
        return true;
    }

    /**
     * Validates a phone number.
     * @param {string} phoneNumber - The phone number to validate.
     * @returns {boolean} - True if the phone number is valid, false otherwise.
     */
    static validatePhoneNumber(phoneNumber) {
        // Regular expression to validate the phone number format
        const phoneRegex = /^[0-9+\(\)#\.\s\-]+$/;

        // Check if the phone number format is valid
        if (!phoneRegex.test(phoneNumber)) {
            return false;
        }

        // Remove non-digit characters for length validation
        const digitsOnly = phoneNumber.replace(/\D/g, '');

        // Validate the minimum and maximum length of the phone number
        if (digitsOnly.length < 8 || digitsOnly.length > 15) {
            return false;
        }

        // Validate the country code (assuming country code starts with '+')
        const countryCodeRegex = /^\+(\d{1,4})$/;
        const countryCodeMatch = phoneNumber.match(countryCodeRegex);
        if (countryCodeMatch && countryCodeMatch[1].length > 4) {
            return false;
        }
        // All validation checks passed, the phone number is valid
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
        const now = new Date().getTime();
        const storedOTPDetails = JSON.parse(localStorage.getItem('otpDetails')) || {};
      
        // Check if the user has exceeded the maximum attempts
        if (storedOTPDetails.attempts >= maxAttempts) {
            return {
                success: false,
                message: 'Maximum attempts exceeded. Please try again later.',
            };
        }
      
        // Check if the OTP has expired
        if (storedOTPDetails.timestamp && now - storedOTPDetails.timestamp > expirationTime * 60 * 1000) {
            return {
                success: false,
                message: 'OTP has expired. Please request a new one.',
            };
        }
      
        // Check if the entered OTP matches the stored OTP
        if (userOTP === storedOTP) {
            // Reset attempts and timestamp on successful validation
            localStorage.setItem('otpDetails', JSON.stringify({ attempts: 0, timestamp: null }));
            return {
                success: true,
                message: 'OTP validated successfully!',
            };
        } else {
            // Increment attempts on unsuccessful validation
            storedOTPDetails.attempts = (storedOTPDetails.attempts || 0) + 1;
            storedOTPDetails.timestamp = now;
            localStorage.setItem('otpDetails', JSON.stringify(storedOTPDetails));
        
            return {
                success: false,
                message: 'Invalid OTP. Please try again.',
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
        const tokenParts = userToken.split('.');
        if (tokenParts.length !== 3) {
            return {
                success: false,
                payload: null,
                message: 'Invalid JWT format. Please try again.',
            };
        }
    
        const [headerBase64, payloadBase64, signature] = tokenParts;
    
        try {
            // Decode the payload without verification
            const decodedPayload = JSON.parse(atob(payloadBase64));
        
            // Manually verify the signature (this is a simplified example)
            const calculatedSignature = btoa(JSON.stringify(decodedPayload) + secretKey);
            if (calculatedSignature !== signature) {
                throw new Error('Invalid signature');
            }
    
            return {
                success: true,
                payload: decodedPayload,
                message: 'JWT validated successfully!',
            };
        } catch (error) {
            return {
                success: false,
                payload: null,
                message: 'Invalid JWT. Please try again.',
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
        // Minimum and maximum length requirements
        const minLength = 8;
        const maxLength = 100;
    
        // Regular expressions for character class checks
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /\d/;
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    
        // Check for minimum length
        if (password.length < minLength) {
            return "Weak - Too short";
        }
    
        // Check for maximum length
        if (password.length > maxLength) {
            return "Moderate - Too long";
        }
    
        // Check for the presence of different character classes
        const hasUppercase = uppercaseRegex.test(password);
        const hasLowercase = lowercaseRegex.test(password);
        const hasDigit = digitRegex.test(password);
        const hasSpecialChar = specialCharRegex.test(password);
    
        // Count the number of fulfilled conditions
        const conditionsFulfilled = [hasUppercase, hasLowercase, hasDigit, hasSpecialChar].filter(Boolean).length;
    
        // Strength determination based on fulfilled conditions
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
    
}
