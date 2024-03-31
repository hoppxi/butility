
/**
 * @author - Ermiyas Arage
 * @license Apache-2.0
 */


/**
 * Utility class for working with the camera.
 * @class 
 */
export default class Capture {
    /**
     * Opens the device camera and streams video to a specified element.
     * @param {Object} options - Options for opening the camera.
     * @param {string} options.targetElementId - The ID of the HTML element to display the camera stream.
     * @returns {Promise<MediaStream>} - A Promise that resolves to the camera stream.
     */
    static openCamera(options) {
        const { targetElementId } = options;

        return new Promise((resolve, reject) => {
            const videoElement = document.getElementById(targetElementId);

            if (!videoElement) {
                reject(new Error(`Element with ID ${targetElementId} not found.`));
                return;
            }

            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    videoElement.srcObject = stream;
                    resolve(stream);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Captures a photo from the camera stream.
     * @param {Object} options - Options for capturing a photo.
     * @param {string} options.targetElementId - The ID of the HTML element to display the camera stream.
     * @returns {Promise<Blob>} - A Promise that resolves to the captured photo as a Blob.
     */
    static capturePhoto(options) {
        const { targetElementId } = options;

        return new Promise((resolve, reject) => {
            const videoElement = document.getElementById(targetElementId);

            if (!videoElement || !videoElement.srcObject) {
                reject(new Error(`Element with ID ${targetElementId} not found or camera not opened.`));
                return;
            }

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            videoElement.addEventListener('loadedmetadata', () => {
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;

                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => resolve(blob), 'image/jpeg');
            });

            videoElement.onerror = () => {
                reject(new Error('Error capturing photo.'));
            };
        });
    }

    /**
     * Records video from the camera stream.
     * @param {Object} options - Options for recording video.
     * @param {string} options.targetElementId - The ID of the HTML element to display the camera stream.
     * @param {number} options.duration - The duration to record.
     * @returns {Promise<Blob>} - A Promise that resolves to the recorded video as a Blob.
     */
    static recordVideo(options) {
        const { targetElementId, duration } = options;
    
        return new Promise((resolve, reject) => {
            const videoElement = document.getElementById(targetElementId);
    
            if (!videoElement || !videoElement.srcObject) {
                reject(new Error(`Element with ID ${targetElementId} not found or camera not opened.`));
                return;
            }
    
            const mediaStream = videoElement.srcObject;
            const mediaRecorder = new MediaRecorder(mediaStream, {
                mimeType: 'video/webm',
            });
    
            const chunks = [];
    
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };
    
            mediaRecorder.onstop = () => {
                const videoBlob = new Blob(chunks, { type: 'video/webm' });
                resolve(videoBlob);
            };
    
            mediaRecorder.start();
    
            setTimeout(() => {
                mediaRecorder.stop();
            }, options.duration || 5000); // Default recording duration is 5 seconds
        });
    }
    
}