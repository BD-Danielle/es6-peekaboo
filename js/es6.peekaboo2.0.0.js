/*
 * ========================================================================
 * Peekaboo 2.0.0
 * Toggles visibility of a target element when scrolling to specified areas.
 * YILING CHEN
 * Copyright 2020, MIT License
 * Usage:
 * document.addEventListener('DOMContentLoaded', function () {
 *   var peekaboo = new Peekaboo();
 *   peekaboo.start('#target', [['#begin', '#end'], ['#begin1', '#end1']]);
 * });
 * ========================================================================
 */

(function (window, document) {
    function Peekaboo() {
        this.areas = [];
        this.visible = [];
        this.target = null;
    }

    // Make the Peekaboo class globally accessible
    window.Peekaboo = Peekaboo;

    // Query a single element from the DOM
    Peekaboo.prototype.query = function (selector) {
        return document.querySelector(selector);
    };

    // Compute the size of an element
    Peekaboo.prototype.getElementSize = function (selector) {
        const element = this.query(selector);
        if (!element) {
            throw new Error('Element not found: ' + selector);
        }
        return element.getBoundingClientRect();
    };

    // Function to handle visibility toggle
    Peekaboo.prototype.updateVisibility = function (ele, areas) {
        const target = this.query(ele);
        if (!target) {
            throw new Error('Target element not found: ' + ele);
        }

        let isVisible = false;
        areas.forEach(area => {
            const beginRect = this.getElementSize(area[0]);
            const endRect = this.getElementSize(area[1]);
            const viewportHeight = window.innerHeight;
            const scrollY = window.scrollY;

            if (scrollY + viewportHeight >= beginRect.top + scrollY &&
                scrollY <= endRect.top + scrollY + endRect.height) {
                isVisible = true;
            }
        });

        target.style.display = isVisible ? 'block' : 'none';
    };

    // Initialize the functionality
    Peekaboo.prototype.start = function (ele, areas) {
        const _this = this;
        window.addEventListener('DOMContentLoaded', function () {
            _this.updateVisibility(ele, areas);
        });
        window.addEventListener('scroll', function () {
            _this.updateVisibility(ele, areas);
        });
    };

})(window, document);
