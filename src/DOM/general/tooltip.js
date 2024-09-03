
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */

import { Element } from "../element/element.js";
import { Style } from "../styling/style.js";

/**
 * Tooltip function gives a button a tooltip when hovered.
 * @param {HTMLElement} targetElement - The HTML element to attach the tooltip to.
 * @param {string} tooltipContent - The content to display in the tooltip.
 */
export function Tooltip(targetElement, tooltipContent, callback) {
    let tooltipElement = null;

    function showTooltip() {
        tooltipElement = Element.createElement({
            name: 'div',
            class: ['tooltip'],
            innerText: tooltipContent
        });

        const rect = targetElement.getBoundingClientRect();
        const y = rect.top + window.scrollY - tooltipElement.offsetHeight - 5;
        const targetCenterX = rect.left + window.scrollX + rect.width / 2;
        
        // Add tooltip to the DOM to calculate its width
        Element.appendElement(document.body, tooltipElement);
        const tooltipWidth = tooltipElement.offsetWidth;
        Element.removeElement(tooltipElement); // Remove the tooltip from the DOM after getting its width
        
        // Calculate the left position based on the target and tooltip widths
        const x = targetCenterX - tooltipWidth / 2;
        Style.addStyles(tooltipElement, { top: `${y}px`, left: `${x}px`, marginLeft: '0' });
        Element.appendElement(document.body, tooltipElement);

        // Invoke the callback after the tooltip is created
        if (callback && typeof callback === 'function') {
            callback(tooltipElement);
        }
    }

    function hideTooltip() {
        if (tooltipElement) {
            Element.removeElement(tooltipElement);
            tooltipElement = null;
        }
    }

    function isTouchScreen() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // Initialize the tooltip only if the "tooltip" key in local storage is not false
    const tooltipEnabled = localStorage.getItem('tooltip') !== 'false';
    if (!isTouchScreen() && tooltipEnabled) {
        targetElement.addEventListener('mouseenter', showTooltip);
        targetElement.addEventListener('mouseout', hideTooltip);
    } 
}