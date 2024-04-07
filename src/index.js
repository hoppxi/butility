// index.js
import dom from './DOM/index.js';
import form from './form/index.js';
import media from './media/index.js';
import network from './network/index.js';
import device from './device/index.js';

// DOM modules
import Element  from "./DOM/element/element.js";
import Attribute  from "./DOM/element/attribute.js";
import Obj  from "./DOM/composite/object.js";
import String  from "./DOM/composite/string.js";
import Color  from "./DOM/styling/color.js";
import Style  from "./DOM/styling/style.js";
import Utility  from "./DOM/main/utility.js";
import DragDrop  from "./DOM/general/drag-drop.js";
import Scroll  from "./DOM/general/scroll.js";
import Modal  from "./DOM/modal/modal.js";
import Ripple, { RippleEffect } from "./DOM/general/ripple.js";
import Tooltip from "./DOM/general/tooltip.js";

// form modules
import FormAction, { SerializeForm } from "./form/main.js";
import Validate from "./form/validate.js";
import CreditCard from "./form/creditCard.js";

// media modules
import Image from "./media/device-media/image.js";
import Capture from "./media/device-media/capture.js";
import FullScreen from "./media/device-media/fullScreen.js";
import QRCode from "./media/device-media/qrcode.js";
import File from "./media/file/file.js";
import Blob from "./media/file/blob.js";

// network modules
import URLClass from "./network/URL/url.js";
import RequestServer from "./network/request/server.js";
import IP from "./network/ip/ip.js";
import WebWorker from "./network/web-worker/webWorker.js";

// device modules
import DetectFeature from "./device/detection/features.js";
import DetectDevice from "./device/detection/device.js";
import EnvInfo from "./device/detection/envInfo.js";
import BrowserStorage from "./device/storage/browser-storage.js";
import DeviceStorage from "./device/storage/device-storage.js";


/**
 * Main module for the 'BrowserUtility' library, containing submodules for DOM, form, media, network, and device utilities.
 * @namespace
 * @property {DomModule} dom - DOM utilities submodule.
 * @property {FormModule} form - Form utilities submodule.
 * @property {MediaModule} media - Media utilities submodule.
 * @property {NetworkModule} network - Network utilities submodule.
 * @property {DeviceModule} device - Device utilities submodule.
 */
const BrowserUtility = {
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
     * @property {Tooltip} Tooltip - Utility class t add tooltip on mouseover event.
     */
    dom,

    /**
     * Form module containing utility classes for form actions, form serialization, form validation, and credit card handling.
     * @namespace
     * @property {FormAction} FormAction - Utility class for handling form actions.
     * @property {SerializeForm} SerializeForm - Utility class for serializing form data.
     * @property {Validate} Validate - Utility class for form validation.
     * @property {CreditCard} CreditCard - Utility class for credit card handling.
     */
    form,

    /**
     * Media module containing utility classes for handling device media and files.
     * @namespace
     * @property {Image} Image - Utility class for handling images.
     * @property {Capture} Capture - Utility class for capturing media.
     * @property {FullScreen} FullScreen - Utility class for full-screen media.
     * @property {QRCode} QRCode - Utility class for working with QR codes.
     * @property {File} File - Utility class for handling files.
     * @property {Blob} Blob - Utility class for working with blobs.
     */
    media,

    /**
     * Network module containing utility classes for URLs, server requests, and IP addresses.
     * @namespace
     * @property {URClassL} URLClass - URL utility class.
     * @property {RequestServer} RequestServer - Class for making server requests.
     * @property {IP} IP - Utility class for handling IP addresses.
     */
    network,

    /**
     * Device module containing utility classes for detecting features, devices, environment information, and storage.
     * @namespace
     * @property {DetectFeature} DetectFeature - Utility class for detecting browser features.
     * @property {DetectDevice} DetectDevice - Utility class for detecting device information.
     * @property {EnvInfo} EnvInfo - Utility class for retrieving environment information.
     * @property {Storage} Storage - Utility class for handling storage operations.
     */
    device
}

export default BrowserUtility;

export { dom };
export { form };
export { media };
export { network };
export { device };

export { Element, Attribute, Obj, String, Scroll, Utility, Ripple, RippleEffect, DragDrop, Style, Color, Modal, Tooltip };
export { Validate, CreditCard, FormAction, SerializeForm };
export { File, QRCode, Blob, Image, Capture, FullScreen };
export { IP, RequestServer, URLClass, WebWorker };
export { DetectDevice, DetectFeature, EnvInfo, DeviceStorage, BrowserStorage };