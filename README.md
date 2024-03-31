# Browser Utility

## Description:
Browser Utility is a comprehensive set of utility classes designed to streamline common web development tasks. It serves as the successor to the deprecated Awedde package, offering improved functionality, reduced redundancy, and enhanced code quality. Browser Utility consists of four modules: DOM, Form, Network, and Media and Device, each providing a range of utilities to simplify web development processes.

## Modules:

1. **DOM Module:**
   - Provides utilities for DOM manipulation, such as adding and removing classes, handling events, and creating and modifying elements.

2. **Form Module:**
   - Offers utilities for form manipulation, including validation, serialization, and submission handling.

3. **Network Module:**
   - Includes utilities for making HTTP requests, handling responses, and managing network-related tasks.

4. **Media and Device Module:**
   - Provides utilities for working with media elements (such as images and videos) and accessing device-related information (such as screen size and orientation).

## Features:
- Streamlined set of utility classes for common web development tasks.
- Improved functionality compared to the deprecated Awedde package.
- Reduced redundancy and enhanced code quality.
- Four distinct modules covering DOM manipulation, form handling, network requests, and media/device interactions.

## Usage:
1. Install the Browser Utility package using npm package manager.
2. Import the desired modules or specific utility classes into your project.
3. Utilize the provided utility methods to simplify and optimize your web development workflow.


## Example:
1. Install the Browser Utility package using npm package manager:
   ```bash
   npm install butility
   ```

2. Import the desired modules or specific utility classes into your project:

   ```javascript
   import BrowserUtility from "./butility/dist/index.js";
   // or
   import { dom } from "./butility/dist/index.js";
   import { form } from "./butility/dist/index.js";
   ```

3. Utilize the provided utility methods to simplify and optimize your web development workflow.

## Example:
```javascript
import { dom } from "./butility/dist/index.js";
import { form } from "./butility/dist/index.js";

const emailInput = dom.Element.createElement({  // Using the dom Element method
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
        form.Validate.validateEmailAddress(e.value); // Using form Validate method
    });
});

dom.Element.appendElement(document.body, emailInput);
```

## Note:
Browser Utility aims to provide a modern and efficient solution for common web development tasks, offering improved functionality and code quality compared to previous solutions.

## Contribution:
Contributions to Browser Utility are welcome! If you'd like to contribute, please follow these guidelines:
- Fork the repository and create a new branch for your feature or bug fix.
- Make your changes, ensuring they adhere to the project's coding style and conventions.
- Write tests to cover your changes, if applicable.
- Submit a pull request detailing the changes you've made and any relevant information.

## Made By:
Browser Utility is developed and maintained by Ermiyas Arage.

## License:
Browser Utility is licensed under the MIT License. You are free to use, modify, and distribute this software under the terms of the MIT License. See the [LICENSE](https://opensource.org/license/mit) file for details.

If you have any questions, suggestions, or issues, feel free to reach out or open an issue on the project's GitHub repository. Thank you for your interest in Browser Utility!