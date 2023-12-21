
# Peekaboo 2.0

## Overview
`Peekaboo` is a JavaScript class that toggles the visibility of a target element based on the user's scroll position relative to specified areas. It is a useful tool for creating dynamic and interactive web pages.

### Author
YILING CHEN

### License
MIT License, 2020.

## Installation

Include the `Peekaboo` JavaScript file in your project to get started.

```html
<script src="es6.peekaboo.bundle.2.1.0.js"></script>
```

## Usage

To use `Peekaboo`, instantiate the class and call the `start` method with the target element and the begin and end areas.

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const peekaboo = new Peekaboo();
  peekaboo.start('#target', [['#begin', '#end'], ['#begin1', '#end1']]);
});
```

### Features

- **Dynamic Visibility:** Change the visibility of elements based on scroll position.
- **Multiple Triggers:** Supports multiple begin and end points for triggering visibility.
- **Easy Integration:** Simple to integrate with existing web pages.

## API Reference

### Constructor: `Peekaboo()`

Initializes a new `Peekaboo` instance.

### Methods

- `query(selector)`: Queries a single element from the DOM.
- `getElementSize(selector)`: Computes the size of an element.
- `updateVisibility(ele, areas)`: Toggles the visibility of an element.
- `start(ele, areas)`: Initializes the functionality with event listeners.

## Example

A practical example of how to implement `Peekaboo` in a webpage.

```html
<!-- Your example HTML -->
```

```javascript
// Your example JavaScript
```

## Contributing

Feel free to contribute to the project! Check out the [issues page](link-to-your-issues) for more information.

