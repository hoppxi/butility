
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */

/**
 * Utility functions for drag-and-drop interactions.
 * @class
 */
export default class DragDrop {
    /**
     * Make an element draggable.
     *
     * @param {HTMLElement} draggableElement - The element to make draggable.
     * @param {Object} options - Additional options for configuring drag behavior.
     */
    static setDraggable(draggableElement, options = {}) {
        draggableElement.draggable = true;

        draggableElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', ''); // Required for some browsers to initiate drag
            if (options && typeof options.dragStart === 'function') {
                options.dragStart(event);
            }
        });

        draggableElement.addEventListener('dragend', (event) => {
            if (options && typeof options.dragEnd === 'function') {
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
        draggableElement.removeEventListener('dragstart', null);
        draggableElement.removeEventListener('dragend', null);
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
        droppableElement.addEventListener('dragover', (event) => {
            event.preventDefault(); // Allow dropping
            if (options && typeof options.dragOver === 'function') {
                options.dragOver(event);
            }
        });

        droppableElement.addEventListener('drop', (event) => {
            event.preventDefault();
            if (options && typeof options.drop === 'function') {
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
        droppableElement.removeEventListener('dragover', null);
        droppableElement.removeEventListener('drop', null);
    }

    /**
     * Disable droppable behavior on an element.
     *
     * @param {HTMLElement} droppableElement - The element to disable droppable behavior on.
     */
    static disableDroppable(droppableElement) {
        droppableElement.removeEventListener('dragover', null);
        droppableElement.removeEventListener('drop', null);
    }

    /**
     * Enable droppable behavior on an element.
     *
     * @param {HTMLElement} droppableElement - The element to enable droppable behavior on.
     */
    static enableDroppable(droppableElement) {
        droppableElement.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        droppableElement.addEventListener('drop', (event) => {
            event.preventDefault();
        });
    }
}
