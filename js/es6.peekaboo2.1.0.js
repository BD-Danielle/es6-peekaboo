/*
 * ========================================================================
 * Peekaboo 2.1.0
 * Toggles visibility of a target element when scrolling to specified areas.
 * YILING CHEN
 * Copyright 2020, MIT License
 * Usage:
 * document.addEventListener('DOMContentLoaded', () => {
 *   const peekaboo = new Peekaboo();
 *   peekaboo.start('#target', [['#begin', '#end'], ['#begin1', '#end1']]);
 * });
 * ========================================================================
 */

class Peekaboo {
  static version = "2.1.0";
  constructor() {
    this.areas = [];
    this.visible = [];
    this.target = null;
  }

  // Query a single element from the DOM
  query(selector) {
    return document.querySelector(selector);
  }

  // Compute the size of an element
  getElementSize(selector) {
    const element = this.query(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element.getBoundingClientRect();
  }

  // Function to handle visibility toggle
  updateVisibility(ele, areas) {
    const target = this.query(ele);
    if (!target) {
      throw new Error(`Target element not found: ${ele}`);
    }

    let isVisible = areas.some(area => {
      const beginRect = this.getElementSize(area[0]);
      const endRect = this.getElementSize(area[1]);
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      return scrollY + viewportHeight >= beginRect.top + scrollY &&
        scrollY <= endRect.top + scrollY + endRect.height;
    });

    target.style.display = isVisible ? 'block' : 'none';
  }

  // Initialize the functionality
  start(ele, areas) {
    window.addEventListener('DOMContentLoaded', () => this.updateVisibility(ele, areas));
    window.addEventListener('scroll', () => this.updateVisibility(ele, areas));
  }
}

// export default Peekaboo;
window.Peekaboo = Peekaboo;
