
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */

import { Utility } from "../main/utility.js";
import { Style } from "../styling/style.js";

/**
 * Utility functions for working with modals.
 * @class
 */
export class Modal {
    /**
     * Create a modal with the given options.
     *
     * @param {Object} options - Options for configuring the modal (Id, class).
     * @returns {HTMLElement} - The created modal element.
     */
    static createModal(options) {
        const modal = document.createElement('div');
        modal.id = options.id || 'modal';
        Utility.addClass(modal, options.class || 'modal');
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
            Style.addStyles(modal, {display: 'block'});
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
            Style.addStyles(modal, {display: 'none'});
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
        return modal ? modal.innerHTML : '';
    }

}
