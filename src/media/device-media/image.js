
/**
 * @author - Ermiyas Arage
 * @license MIT
 */


/**
 * Utility class for working with images.
 * @class
 */
export class Image {
    /**
     * Resize an image to fit within specified dimensions while maintaining aspect ratio.
     * @param {File} file - The image file.
     * @param {number} maxWidth - The maximum width of the resized image.
     * @param {number} maxHeight - The maximum height of the resized image.
     * @returns {Promise<Blob>} - A Promise that resolves to the resized image as a Blob.
     */
    static resizeImage(file, maxWidth, maxHeight) {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }

                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => resolve(blob), file.type);
            };

            img.onerror = () => reject(new Error('Failed to load image'));

            img.src = URL.createObjectURL(file);
        });
    }

    /**
     * Rotate an image by a specified number of degrees.
     * @param {File} file - The image file.
     * @param {number} degrees - The number of degrees to rotate the image.
     * @returns {Promise<Blob>} - A Promise that resolves to the rotated image as a Blob.
     */
    static rotateImage(file, degrees) {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.height;
                canvas.height = img.width;

                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(degrees * (Math.PI / 180));
                ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);

                canvas.toBlob((blob) => resolve(blob), file.type);
            };

            img.onerror = () => reject(new Error('Failed to load image'));

            img.src = URL.createObjectURL(file);
        });
    }

    /**
     * Compress an image by adjusting its quality.
     * @param {File} file - The image file.
     * @param {number} quality - The quality of the compressed image (0 to 1).
     * @returns {Promise<Blob>} - A Promise that resolves to the compressed image as a Blob.
     */
    static compressImage(file, quality) {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0, img.width, img.height);

                canvas.toBlob((blob) => resolve(blob), file.type, quality);
            };

            img.onerror = () => reject(new Error('Failed to load image'));

            img.src = URL.createObjectURL(file);
        });
    }

    /**
     * Crop an image based on specified coordinates.
     * @param {File} file - The image file.
     * @param {Object} coordinates - The coordinates for cropping (e.g., { x: 10, y: 20, width: 100, height: 150 }).
     * @returns {Promise<Blob>} - A Promise that resolves to the cropped image as a Blob.
     */
    static cropImage(file, coordinates) {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = coordinates.width;
                canvas.height = coordinates.height;

                ctx.drawImage(img, -coordinates.x, -coordinates.y, img.width, img.height);

                canvas.toBlob((blob) => resolve(blob), file.type);
            };

            img.onerror = () => reject(new Error('Failed to load image'));

            img.src = URL.createObjectURL(file);
        });
    }

    /**
     * Flip an image along a specified axis.
     * @param {File} file - The image file.
     * @param {string} axis - The axis along which to flip the image ('horizontal' or 'vertical').
     * @returns {Promise<Blob>} - A Promise that resolves to the flipped image as a Blob.
     */
    static flipImage(file, axis) {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;

                if (axis === 'horizontal') {
                    ctx.scale(-1, 1);
                    ctx.drawImage(img, -img.width, 0, img.width, img.height);
                } else if (axis === 'vertical') {
                    ctx.scale(1, -1);
                    ctx.drawImage(img, 0, -img.height, img.width, img.height);
                } else {
                    reject(new Error('Invalid axis. Use "horizontal" or "vertical".'));
                    return;
                }

                canvas.toBlob((blob) => resolve(blob), file.type);
            };

            img.onerror = () => reject(new Error('Failed to load image'));

            img.src = URL.createObjectURL(file);
        });
    }

    /**
     * Convert an image to a base64-encoded string.
     * @param {File} file - The image file.
     * @returns {Promise<string>} - A Promise that resolves to the base64-encoded image string.
     */
    static convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result.split(',')[1]);
            };

            reader.onerror = () => {
                reject(new Error('Failed to read image as base64.'));
            };

            reader.readAsDataURL(file);
        });
    }

    /**
     * Preload a list of images and invoke a callback once all images are loaded.
     * @param {string[]} imageUrls - An array of image URLs to preload.
     * @param {function} callback - The callback function to invoke once all images are loaded.
     */
    static preloadImagesWithCallback(imageUrls, callback) {
        const images = [];

        let loadedImages = 0;

        function imageLoaded() {
            loadedImages++;

            if (loadedImages === imageUrls.length) {
                callback(images);
            }
        }

        imageUrls.forEach((url, index) => {
            const img = new Image();

            img.onload = () => {
                images[index] = img;
                imageLoaded();
            };

            img.onerror = () => {
                console.error(`Failed to load image: ${url}`);
                imageLoaded();
            };

            img.src = url;
        });
    }

    /**
     * Calculate the aspect ratio of an image based on its width and height.
     * @param {number} width - The width of the image.
     * @param {number} height - The height of the image.
     * @returns {number} - The aspect ratio of the image.
     */
    static calculateAspectRatio(width, height) {
        return width / height;
    }
}
