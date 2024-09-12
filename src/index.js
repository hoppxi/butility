// DOM modules
import {Element} from "./DOM/element/element.js";
import {Attribute} from "./DOM/element/attribute.js";
import {Obj} from "./DOM/composite/object.js";
import {String} from "./DOM/composite/string.js";
import {Color} from "./DOM/styling/color.js";
import {Style} from "./DOM/styling/style.js";
import {Utility} from "./DOM/main/utility.js";
import {DragDrop} from "./DOM/general/drag-drop.js";
import {Scroll} from "./DOM/general/scroll.js";
import {Modal} from "./DOM/modal/modal.js";
import {Ripple, RippleEffect} from "./DOM/general/ripple.js";
import {Tooltip} from "./DOM/general/tooltip.js";
// form modules
import {FormAction, SerializeForm } from "./form/main.js";
import {Validate} from "./form/validate.js";
import {CreditCard} from "./form/creditCard.js";
// media modules
import {Image} from "./media/device-media/image.js";
import {Capture} from "./media/device-media/capture.js";
import {FullScreen} from "./media/device-media/fullScreen.js";
import {File} from "./media/file/file.js";
import {Blob} from "./media/file/blob.js";
// network modules
import {URLClass} from "./network/URL/url.js";
import {RequestServer} from "./network/request/server.js";
import {IP} from "./network/ip/ip.js";
// device modules
import {DetectFeature} from "./device/detection/features.js";
import {DetectDevice} from "./device/detection/device.js";
import {EnvInfo} from "./device/detection/envInfo.js";
import {BrowserStorage} from "./device/storage/browser-storage.js";
import {DeviceStorage} from "./device/storage/device-storage.js";

const Butility = {
    Element, Attribute, Obj, String, Scroll, Utility, Ripple, RippleEffect, DragDrop, Style, Color, Modal, Tooltip,
    Validate, CreditCard, FormAction, SerializeForm,
    File, Blob, Image, Capture, FullScreen,
    IP, RequestServer, URLClass,
    DetectDevice, DetectFeature, EnvInfo, DeviceStorage, BrowserStorage,
};

export default Butility;
export { Element, Attribute, Obj, String, Scroll, Utility, Ripple, RippleEffect, DragDrop, Style, Color, Modal, Tooltip };
export { Validate, CreditCard, FormAction, SerializeForm };
export { File, Blob, Image, Capture, FullScreen };
export { IP, RequestServer, URLClass };
export { DetectDevice, DetectFeature, EnvInfo, DeviceStorage, BrowserStorage };

