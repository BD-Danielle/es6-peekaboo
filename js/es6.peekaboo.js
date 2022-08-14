/*
 * ========================================================================
 * peekaboo 1.1
 * The target was hidden or shown when window scroll to the specified area
 * YILING CHEN
 * Copyright 2022, MIT License
 * How to use it:
 * see README.md
 * ========================================================================
 */
var peekSelf;

class Peekaboo{
  constructor(arrObjs){
    peekSelf = this;
    this.arrObjs = arrObjs;
  }
  
  get scrSize(){// Return the detailed size of user screen
    return {
      "width": screen.width || screen.availWidth, 
      "height": screen.height || screen.availHeight
    };
  }

  get winSize(){// Return the detailed size of user window
    return {
      "innerWidth": window.innerWidth,    // width without scrollbar-x
      "innerHeight": window.innerHeight,  // height without scrollbar-y
      "outerWidth": window.outerWidth,    // width with scrollbar-x
      "outerHeight": window.outerHeight   // height without scrollbar-y
    };
  }

  get docSize(){// Return the detailed size of user document
    return {
      "docHeight": document.body.scrollHeight || document.body.clientHeight || document.documentElement.scrollHeight || document.documentElement.offsetHeight,
      "docScrollTop": document.documentElement.scrollTop || document.scrollingElement.scrollTop,
      "docScrollBottom": (document.body.scrollHeight || document.body.clientHeight || document.documentElement.scrollHeight || document.documentElement.offsetHeight) - (document.documentElement.scrollTop || document.scrollingElement.scrollTop)
    };
  }
  
  objSize(node){
    let offsetLeft = 0, offsetTop = 0;
    var node = document.querySelector(node);
    let offsetHeight = node.offsetHeight, offsetWidth = node.offsetWidth;
    while(node){ // if null return
      offsetLeft += node.offsetLeft;
      offsetTop += node.offsetTop;
      node = node.offsetParent;
    }
    return {
      "offsetLeft": offsetLeft, 
      "offsetTop": offsetTop,
      "offsetHeight": offsetHeight,
      "offsetWidth": offsetWidth
    };
  }

  forEach(){
    this.arrObjs.forEach(c=>{
      c.areas.forEach(c1=>{
        c.visible = false;
        if(this.docSize.docScrollTop >= this.objSize(c1[0]).offsetTop && (this.docSize.docHeight - this.objSize(c1[1]).offsetTop - this.objSize(c1[1]).offsetHeight) <= this.docSize.docScrollBottom){
          c.visible = true;
        }
        c.cb && c.cb();
      })
    })
  }
  start(){
    ["DOMContentLoaded", "scroll"].forEach(c=>{
      window.addEventListener(c, ()=>{
        this.forEach();
      })
    });
  }
}