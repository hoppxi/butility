# Butility

**Butility** is a handy JavaScript package designed to simplify common tasks in web apps. It’s packed with useful methods for dealing with the DOM, devices, media, networks, and forms. **Butility** is made for the browser, so it’s all about making your web development easier and more efficient.

## Features

- **DOM**: Easily manipulate and interact with the Document Object Model.
- **Device**: Get useful information about the user’s device.
- **Media**: Manage media files and streams effortlessly.
- **Network**: Handle network-related tasks with ease.
- **Form**: Simplify form validation and handling.

## Installation

Just add Butility to your project:

```bash
npm install butility
```

Or include it directly in your HTML:

```html
<script src="path/to/butility.js"></script> <!-- Without import -->
<script src="path/to/butility.esm.js" type="module"></script> <!-- With import (esm) -->
```

### CDN

You can include **Butility** directly in your HTML using various CDNs:

#### jsDelivr

```html
<!-- Standard version -->
<script src="https://cdn.jsdelivr.net/npm/butility@latest/butility.min.js"></script>
<!-- ESM version -->
<script src="https://cdn.jsdelivr.net/npm/butility@latest/butility.esm.min.js" type="module"></script>
```

#### UNPKG

```html
<!-- Standard version -->
<script src="https://unpkg.com/butility@latest/butility.min.js"></script>
<!-- ESM version -->
<script src="https://unpkg.com/butility@latest/butility.esm.min.js" type="module"></script>
```

### ZIP file download
To download the files directly, [Click here](https://github.com/ermi111/butility/archive/refs/heads/master.zip) and get the zip file.

## Usage

Using **Butility** is straightforward. Here’s a quick example with esm:

```javascript
// Use ESM version
import { Element, Validate } from "./butility.esm.js";

const emailInput = Element.createElement({  // Using the dom Element method
    name: 'input',
    class: ['input', 'input-form'],
    attr: {
        id: 'email',
        type: 'email',
        name: 'email',
        required: true,
        placeholder: 'Email',
    },
}, e => {
    e.addEventListener('change', () => {
        Validate.validateEmailAddress(e.value); // Using form Validate method
    });
});

Element.appendElement(document.body, emailInput);
```
and with direct access in html:

```html
<!-- Use standard version -->
<script src="./butility.js"></script>
<script>
    // Without import, use the classes (eg. ClassUtility)
    const button = document.querySelector('button');
    ClassUtility.addClasses(button, 'you-first-class','second-class' /* continue as your need!*/);
</script>
```

Each module is packed with helpful methods that make your web development life easier.

## API Documentation

For detailed information on how to use each method in Butility, check out the [API documentation on the GitHub Wiki](https://github.com/ermi111/butility/wiki).

## Modules Overview

- **DOM**: Tools to interact with the DOM like adding/removing classes, event handling, etc.
- **Device**: Methods to detect the user’s browser, OS, and more.
- **Media**: Manage and manipulate media files or streams.
- **Network**: Check network status, handle requests, etc.
- **Form**: Easily validate and manage form inputs.

## License

This project is open-source under the [MIT License](https://github.com/ermi111/butility?tab=MIT-1-ov-file).

## Contributing

contribution is welcome! If you find any bugs or have ideas for improvements, please open an issue or submit a pull request.