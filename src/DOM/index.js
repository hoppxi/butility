import Element  from "./element/element.js";
import Attribute  from "./element/attribute.js";
import Obj  from "./composite/object.js";
import String  from "./composite/string.js";
import Color  from "./styling/color.js";
import Style  from "./styling/style.js";
import Utility  from "./main/utility.js";
import DragDrop  from "./general/drag-drop.js";
import Scroll  from "./general/scroll.js";
import Modal  from "./modal/modal.js";
import Ripple, { RippleEffect } from "./general/ripple.js";
import Tooltip from "./general/tooltip.js";


/**
 * DOM module containing utility classes for handling DOM elements, attributes, composite objects, strings,
 * styling (color and inline styles), CSS class utilities, drag and drop, scrolling, and modals.
 * @namespace
 * @property {Element} Element - Utility class for handling DOM elements.
 * @property {Attribute} Attribute - Utility class for handling element attributes.
 * @property {Obj} Obj - Utility class for composite objects.
 * @property {String} String - Utility class for string manipulation.
 * @property {Color} Color - Utility class for handling colors.
 * @property {Style} Style - Utility class for managing inline styles.
 * @property {Utility} Utility - Utility class for working with CSS classes.
 * @property {DragDrop} DragDrop - Utility class for drag and drop functionality.
 * @property {Scroll} Scroll - Utility class for handling scrolling.
 * @property {Modal} Modal - Utility class for modal dialogs.
 * @property {Ripple} Ripple - Utility class for Ripple effect.
 * @property {RippleEffect} RippleEffect - Utility class for Ripple effect with extended configuration.
 * @property {Tooltip} Tooltip - Utility function to add tooltip on mouseover event.
 */
const dom = {
    /**
     * Utility class for handling DOM elements.
     * @class
     */
    Element,

    /**
     * Utility class for handling element attributes.
     * @class
     */
    Attribute,

    /**
     * Utility class for composite objects.
     * @class
     */
    Obj,

    /**
     * Utility class for string manipulation.
     * @class
     */
    String,

    /**
     * Utility class for handling colors.
     * @class
     */
    Color,

    /**
     * Utility class for managing inline styles.
     * @class
     */
    Style,

    /**
     * Utility class for working with CSS classes.
     * @class
     */
    Utility,

    /**
     * Utility class for handling scrolling.
     * @class
     */
    Scroll,

    /**
     * Utility class for drag and drop functionality.
     * @class
     */
    DragDrop,

    /**
     * Utility class for modal dialogs.
     * @class
     */
    Modal,

    /**
     * Utility class for Ripple effect.
     * @class
     */
    Ripple,

    /**
     * Utility class for Ripple effect with extended configuration.
     * @class
     */
    RippleEffect,

    /**
     * Utility class t add tooltip on mouseover event.
     * @class
     */
    Tooltip
}

export default dom;