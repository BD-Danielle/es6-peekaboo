class Peekaboo {
  static version = "2.1.1";
  constructor() {}

  // Query a single element from the DOM
  query(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element ${selector} not found`);
    }
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
    const docSize = this.documentSize();
    const viewportHeight = window.innerHeight;

    const elementTop = this.objSize(area[0]).top;
    const elementBottom = docSize.fullHeight - (this.objSize(area[1]).top + this.objSize(area[1]).height);

    return docSize.scrollTop >= elementTop && elementBottom <= (docSize.fullHeight - docSize.scrollTop - viewportHeight);
  }

  // Update the visibility of an element based on its position
  updateVisibility(ele, areas) {
    const isVisible = areas.some(area => this.isElementVisible(area));
    this.query(ele).style.display = isVisible ? 'block' : 'none';
  }

  // Initialize the functionality to automatically update element visibility
  start(ele, areas) {
    if (!ele || !areas) throw new Error('Invalid arguments for Peekaboo.start');
    
    const updateFunc = () => this.updateVisibility(ele, areas);
    document.addEventListener("DOMContentLoaded", updateFunc);
    window.addEventListener("scroll", updateFunc);
  }
}
window.Peekaboo = Peekaboo;
// Usage example
// window.addEventListener('DOMContentLoaded', () => {
//   const peekaboo = new Peekaboo();
//   peekaboo.start('#target', [['#begin', '#end'], ['#begin1', '#end1']]);
// });
