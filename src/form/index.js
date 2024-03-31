import FormAction, { SerializeForm } from "./main.js";
import Validate from "./validate.js";
import CreditCard from "./creditCard.js";


/**
 * Form module containing utility classes for form actions, form serialization, form validation, and credit card handling.
 * @namespace
 * @property {FormAction} FormAction - Utility class for handling form actions.
 * @property {SerializeForm} SerializeForm - Utility class for serializing form data.
 * @property {Validate} Validate - Utility class for form validation.
 * @property {CreditCard} CreditCard - Utility class for credit card handling.
 */
const form = {
    /**
     * Utility class for form related tasks
     * @class
     */
    FormAction,

    /**
     * Utility class to serialize a form data or deserialize
     * @class
     */
    SerializeForm,

    /**
     * Utility class for form validation.
     * @class
     */
    Validate,

    /**
     * Utility functions for credit card-related operations.
     * @class 
     */
    CreditCard
}

export default form;