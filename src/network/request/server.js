
/**
 * @author - Ermiyas Arage
 * @license MIT
 */


/**
 * Utility class for making AJAX requests and handling JSONP and Fetch API.
 * @class
 */
export class RequestServer {
    /**
     * Makes an AJAX request with the provided options.
     * @param {Object} options - The options for the AJAX request.
     * @param {string} options.method - The HTTP method for the request (e.g., 'GET', 'POST').
     * @param {string} options.url - The URL to make the request to.
     * @param {Object} [options.headers] - Additional headers to include in the request.
     * @param {string|FormData} [options.data] - The data to include in the request body.
     * @param {function} [options.success] - Callback function to handle a successful response.
     * @param {function} [options.error] - Callback function to handle an error response.
     */
    static ajax(options) {
        const xhr = new XMLHttpRequest();
    
        xhr.open(options.method, options.url, true);
    
        // Set custom headers if provided
        if (options.headers) {
            for (const [key, value] of Object.entries(options.headers)) {
                xhr.setRequestHeader(key, value);
            }
        }
  
        // Set up callback for successful response
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                if (options.success) {
                    options.success(xhr.responseText);
                }
            } else {
                if (options.error) {
                    options.error(`Request failed with status ${xhr.status}`);
                }
            }
        };
  
        // Set up callback for error response
        xhr.onerror = function () {
            if (options.error) {
                options.error('Request failed');
            }
        };
  
        // Send the request with the provided data
        xhr.send(options.data);
    }

    /**
     * Makes a GET request.
     * @param {string} url - The URL for the GET request.
     * @param {Object} data - The data to be sent with the request.
     * @param {function} callback - The callback function to handle the response.
     */
    static get(url, data, callback) {
        const xhr = new XMLHttpRequest();

        // Constructing the query string from the data object
        const queryString = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    
        // Appending the query string to the URL if data is provided
        const fullUrl = data ? `${url}?${queryString}` : url;
    
        xhr.open('GET', fullUrl, true);
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Successful response, invoke the callback with the parsed response
                    callback(JSON.parse(xhr.responseText));
                } else {
                    // Error response, invoke the callback with null
                    callback(null);
                }
            }
        };
    
        xhr.send();
    
    }

    /**
     * Makes a POST request.
     * @param {string} url - The URL for the POST request.
     * @param {Object} data - The data to be sent with the request.
     * @param {function} callback - The callback function to handle the response.
     */
    static post(url, data, callback) {
        const xhr = new XMLHttpRequest();

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Successful response, invoke the callback with the parsed response
                    callback(JSON.parse(xhr.responseText));
                } else {
                    // Error response, invoke the callback with null
                    callback(null);
                }
            }
        };

        // Convert the data object to a JSON string and send it
        xhr.send(JSON.stringify(data));
    }

    /**
     * Makes a PUT request.
     * @param {string} url - The URL for the PUT request.
     * @param {Object} data - The data to be sent with the request.
     * @param {function} callback - The callback function to handle the response.
     */
    static put(url, data, callback) {
        const xhr = new XMLHttpRequest();

        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Successful response, invoke the callback with the parsed response
                    callback(JSON.parse(xhr.responseText));
                } else {
                    // Error response, invoke the callback with null
                    callback(null);
                }
            }
        };

        // Convert the data object to a JSON string and send it
        xhr.send(JSON.stringify(data));
    }

    /**
     * Makes a PATCH request.
     * @param {string} url - The URL for the PATCH request.
     * @param {Object} data - The data to be sent with the request.
     * @param {function} callback - The callback function to handle the response.
     */
    static patch(url, data, callback) {
        const xhr = new XMLHttpRequest();

        xhr.open('PATCH', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Successful response, invoke the callback with the parsed response
                    callback(JSON.parse(xhr.responseText));
                } else {
                    // Error response, invoke the callback with null
                    callback(null);
                }
            }
        };

        // Convert the data object to a JSON string and send it
        xhr.send(JSON.stringify(data));
    }

    /**
     * Makes a DELETE request.
     * @param {string} url - The URL for the DELETE request.
     * @param {Object} data - The data to be sent with the request.
     * @param {function} callback - The callback function to handle the response.
     */
    static deleteRequest(url, data, callback) {
        const xhr = new XMLHttpRequest();

        // Constructing the query string from the data object
        const queryString = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

        // Appending the query string to the URL if data is provided
        const fullUrl = data ? `${url}?${queryString}` : url;

        xhr.open('DELETE', fullUrl, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    callback(JSON.parse(xhr.responseText));
                } else {
                    callback(null);
                }
            }
        };

        xhr.send();
    }

    /**
     * Makes a JSONP request.
     * @param {string} url - The URL for the JSONP request.
     * @param {function} callback - The callback function to handle the response.
     */
    static jsonp(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);

        window.jsonpCallback = function (data) {
            callback(data);
            document.head.removeChild(script);
            delete window.jsonpCallback;
        };
    }

    /**
     * Makes a Fetch API request for JSON.
     * @param {string} url - The URL for the Fetch request.
     * @param {Object} options - Additional options for the Fetch request.
     */
    static fetchJson(url, options) {
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Invoke the provided callback with the parsed response
                callback(data);
            })
            .catch(error => {
                // Invoke the callback with an error if the request fails
                callback(null, error);
            });
    }
}
