class Peekaboo {
  static version = "2.2.0";
  constructor(options = {}) {
    this.options = {
      throttleDelay: options.throttleDelay || 100,
      displayStyle: options.displayStyle || 'block',
      fadeEffect: options.fadeEffect || false,
      ...options
    };
    this.cache = new Map();
  }

  // Query a single element from the DOM
  query(selector) {
    if (this.cache.has(selector)) {
      return this.cache.get(selector);
    }
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element ${selector} not found`);
    }
    this.cache.set(selector, element);
    return element;
  }

  // Get document size
  documentSize() {
    return {
      fullHeight: document.documentElement.scrollHeight,
      scrollTop: window.scrollY || document.documentElement.scrollTop
    };
  }

  // Get size and position of an element
  objSize(ele) {
    const element = this.query(ele);
    let getOffset = function(element, horizontal){
      if(!element) return 0;
      return getOffset(element.offsetParent, horizontal) + (horizontal ? element.offsetLeft : element.offsetTop);
    };
    return {
      height: element.offsetHeight,
      width: element.offsetWidth,
      top: getOffset(element, false),
      left: getOffset(element, true)
    };
  }

  // Check if an element is visible within the viewport
  isElementVisible(area) {
    try {
      const docSize = this.documentSize();
      const viewportHeight = window.innerHeight;

      const elementTop = this.objSize(area[0]).top;
      const elementBottom = docSize.fullHeight - (this.objSize(area[1]).top + this.objSize(area[1]).height);

      return docSize.scrollTop >= elementTop && elementBottom <= (docSize.fullHeight - docSize.scrollTop - viewportHeight);
    } catch (error) {
      console.error('Error checking element visibility:', error);
      return false;
    }
  }

  // Update the visibility of an element based on its position
  updateVisibility(ele, areas) {
    const element = this.query(ele);
    const isVisible = areas.some(area => this.isElementVisible(area));
    
    if (this.options.fadeEffect) {
      element.style.transition = 'opacity 0.3s';
      element.style.opacity = isVisible ? '1' : '0';
      setTimeout(() => {
        element.style.display = isVisible ? this.options.displayStyle : 'none';
      }, isVisible ? 0 : 300);
    } else {
      element.style.display = isVisible ? this.options.displayStyle : 'none';
    }
  }

  // 添加節流函數
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  // 修改 start 方法
  start(ele, areas) {
    if (!ele || !areas) throw new Error('Invalid arguments for Peekaboo.start');
    
    const updateFunc = this.throttle(() => this.updateVisibility(ele, areas), 100);
    document.addEventListener("DOMContentLoaded", updateFunc);
    window.addEventListener("scroll", updateFunc);
  }

  // 添加銷毀方法
  destroy() {
    const updateFunc = () => this.updateVisibility(ele, areas);
    document.removeEventListener("DOMContentLoaded", updateFunc);
    window.removeEventListener("scroll", updateFunc);
    this.cache.clear();
  }
}
window.Peekaboo = Peekaboo;
// Usage example
// window.addEventListener('DOMContentLoaded', () => {
//   const peekaboo = new Peekaboo();
//   peekaboo.start('#target', [['#begin', '#end'], ['#begin1', '#end1']]);
// });
