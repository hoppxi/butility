import DetectFeature from "./detection/features.js";
import DetectDevice from "./detection/device.js";
import EnvInfo from "./detection/envInfo.js";
import BrowserStorage from "./storage/browser-storage.js";
import DeviceStorage from "./storage/device-storage.js";

/**
 * Device module containing utility classes for detecting features, devices, environment information, and storage.
 * @namespace
 * @property {DetectFeature} DetectFeature - Utility class for detecting browser features.
 * @property {DetectDevice} DetectDevice - Utility class for detecting device information.
 * @property {EnvInfo} EnvInfo - Utility class for retrieving environment information.
 * @property {BrowserStorage} BrowserStorage - Utility class for handling browser storage operations.
 * @property {DetectDevice} DeviceStorage - Utility class for handling device storage.
 */
const device = {
    /**
     * Utility class for detecting browser features.
     * @class
     */
    DetectFeature,

    /**
     * Utility class for detecting device information.
     * @class
     */
    DetectDevice,

    /**
     * Utility class for retrieving environment information.
     * @class
     */
    EnvInfo,

    /**
     * Utility class for handling Browser storage operations.
     * @class
     */
    BrowserStorage,

    /**
     * Utility class for handling Device storage.
     * @class
     */
    DeviceStorage
}

export default device;