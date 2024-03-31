import Image from "./device-media/image.js";
import Capture from "./device-media/capture.js";
import FullScreen from "./device-media/fullScreen.js";
import QRCode from "./device-media/qrcode.js";
import File from "./file/file.js";
import Blob from "./file/blob.js";


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
const media = {

    /**
     * Utility class for working with images.
     * @class
     */
    Image,

    /**
     * Utility class for working with files.
     * @class
     */
    File,

    /**
     * Utility class for working with the camera.
     * @class 
     */
    Capture,

    /**
     * Utility class for working with Blobs.
     * @class
     */
    Blob,

    /**
     * Utility class for working with fullscreen functionality.
     * @class
     */
    FullScreen,

    /**
     * Utility class for working with QR codes.
     * @class 
     */
    QRCode
}

export default media;