
# Peekaboo 2.1.1

## Overview
`Peekaboo` is an advanced JavaScript class designed to manage the visibility of elements on a webpage based on their position relative to the viewport during scrolling. This version introduces performance improvements and additional functionality.

### Author
YILING CHEN

### License
MIT License.

## Installation

Include the `Peekaboo` class in your project to enhance element visibility control.

```html
<script src="es6.peekaboo.bundle.2.1.1.js"></script>
```

## Usage

Instantiate `Peekaboo` and use the `start` method to define the target element and the areas that control its visibility.

```javascript
window.addEventListener('DOMContentLoaded', () => {
  const peekaboo = new Peekaboo();
  peekaboo.start('#target', [['#begin', '#end'], ['#begin1', '#end1']]);
});
```

### Features

- **Improved Performance:** Includes a debounce function to optimize scroll event handling.
- **Enhanced Visibility Checks:** More accurate detection of element visibility within the viewport.
- **Dynamic Content Control:** Manage the display of content dynamically as the user scrolls.

## API Reference

### Properties

- `version`: Indicates the current version of the class.

### Methods

- `query(selector)`: Queries a single element from the DOM.
- `documentSize()`: Returns the full height of the document and the current scroll position.
- `objSize(ele)`: Computes the size and position of an element.
- `isElementVisible(area)`: Checks if an element is visible within the viewport.
- `updateVisibility(ele, areas)`: Updates the visibility of an element based on its position.
- `start(ele, areas)`: Initializes the functionality with event listeners.
- `debounce(func, wait)`: Debounces a function to limit the rate at which it fires.

## Example

An example implementation of `Peekaboo` is provided to demonstrate its usage.

```html
<!-- Example HTML code -->
```

```javascript
// Example JavaScript code
```

## Contributing

Contributions are welcome. Please refer to the [issues page](link-to-your-issues) for more details.

