# Butility

## Announcements

**Butility** is being restructured into multiple modular, type-safe packages under a dedicated [GitHub organization](https://github.com/butility). This update brings improved efficiency and cleaner code, thanks to the use of TypeScript. The packages are organized by functionality, such as media, forms, styles, network, and more. 

If you're interested in contributing, check out the [Butility GitHub organization](https://github.com/butility).

Please note that support for the current Butility version will end on September 30, 2034.

## Overview

**Butility** is a handy JavaScript package designed to simplify common tasks in web apps. It’s packed with useful methods for dealing with the DOM, devices, media, networks, and forms. **Butility** is made for the browser, so it’s all about making your web development easier and more efficient.

## Installation

Just add Butility to your project:

```bash
npm install butility
```

Or include it directly in your HTML:

```html
<script src="path/to/butility.js" type="module"></script>
```

### CDN

You can include **Butility** directly in your HTML using various CDNs:

```html
<!-- JSDelivr -->
<script src="https://cdn.jsdelivr.net/npm/butility@latest/butility.min.js" type="module"></script>

<!-- UNPKG -->
<script src="https://unpkg.com/butility@latest/butility.js" type="module"></script>
```

### ZIP file download
To download the files directly, [Click here](https://github.com/ermi111/butility/archive/refs/heads/master.zip) and get the zip file with the source code.

## Usage

Using **Butility** is straightforward. Here’s a quick example with esm:

```javascript
import { Element, Validate } from "./butility.js";

const emailInput = Element.create({  // Using the dom Element method
    name: 'input',
    class: ['input', 'input-form'],
    attr: {
        id: 'email',
        type: 'email',
        name: 'email',
        required: true,
        placeholder: 'Email',
    },
    style: "color: blue", // inline css
    draggable: true,
    trackMutation: true // See for any changes on the element
}, e => {
    e.addEventListener('change', () => {
        if (Validate.validateEmailAddress(e.value)) {
            console.log("Email: pass!");
        } else {
            console.log("Enter correct email pls!");
        } // Using form Validate method
    });
});

document.body.appendElement(emailInput);
```
and in html:

```html
<script src="./butility.js" type="module"></script>
<script>
    import { Utility, DeviceAPIs } from "./butility.js"
    const button = document.querySelector('button');
    const input = document.querySelector('input');
    Utility.toggleClassOnGeolocationChange(button, "changed-location", {
        // Optional
        enableThrottling: true,
        throttleInterval: 6000,
        onClassToggle: function() {
            // Change UI
            console.log("changing UI")
        },
        onError: function() {
            // Do something
        }
    });

    // Device APIs
    DeviceAPIs.writeToClipboard(input.value)
    DeviceAPIs.readFromClipboard().then(res => console.log(res)); // Read data from the clipboard
</script>
```

Each module is packed with helpful methods that make your web development life easier.

## API Documentation

Check out the [API documentation on the GitHub Wiki](https://github.com/ermi111/butility/wiki).

## License

[MIT License](https://github.com/ermi111/butility?tab=MIT-1-ov-file) . [Ermiyas](https://github.com/ermi111)