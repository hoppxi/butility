# Butility

**Butility** is a handy JavaScript package designed to simplify common tasks in web apps. It’s packed with useful methods for dealing with the DOM, devices, media, networks, and forms. **Butility** is made for the browser, so it’s all about making your web development easier and more efficient.

**Changes**: 
- Removing WebWorker class
- [Add more methods in the IP Class](https://github.com/ermi111/butility/wiki/api#ip-class)
- Using `this` to access c class' methods

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
To download the files directly, [Click here](https://github.com/ermi111/butility/archive/refs/heads/master.zip) and get the zip file.

## Usage

Using **Butility** is straightforward. Here’s a quick example with esm:

```javascript
// Use ESM version
import { Element, Validate } from "./butility.js";

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
        if (Validate.validateEmailAddress(e.value)) {
            console.log("Email: pass!");
        } else {
            console.log("Enter correct email pls!");
        } // Using form Validate method
    });
});

Element.appendElement(document.body, emailInput);
```
and in html:

```html
<!-- Use standard version -->
<script src="./butility.js" type="module"></script>
<script>
    import { Utility } from "./butility.js"
    const button = document.querySelector('button');
    Utility.addClasses(button, 'you-first-class','second-class' /* continue as your need!*/);
</script>
```

Each module is packed with helpful methods that make your web development life easier.

## API Documentation

Check out the [API documentation on the GitHub Wiki](https://github.com/ermi111/butility/wiki).

## License

[MIT License](https://github.com/ermi111/butility?tab=MIT-1-ov-file). [Ermiyas](https://github.com/ermi111)