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
  horizontal(c1){
    return this.winSize.innerWidth <= (this.winSize.innerWidth - this.objSize(c1[0]).offsetLeft + this.objSize(c1[1]).offsetWidth);
  }
  vertical(c1, offsetTop = 0){
    let pointA = this.objSize(c1[0]).offsetTop - offsetTop;
    let pointB = this.docSize.docHeight - this.objSize(c1[1]).offsetTop - this.objSize(c1[1]).offsetHeight + offsetTop;
    return this.docSize.docScrollTop >= pointA && pointB <= this.docSize.docScrollBottom;
  }
  forEach(){
    this.arrObjs.forEach(c=>{
      c.arrVisible = [];
      c.areas.forEach((c1, i1)=>{
        c.horzVisible = c.horizontal && this.horizontal(c1) ? false: true; // if horizontal
        if(this.vertical(c1, c.offsetTop)){
          c.arrVisible[i1] = true;
          c.visible = true;
        }else{
          c.arrVisible[i1] = false;
          c.visible = false;
        }
      })
      if (c.areas.length >= c.arrVisible.length && c.arrVisible.some(c2=>c2==true)) c.visible = true;
      if (c.areas.length >= c.arrVisible.length && c.arrVisible.every(c2=>c2==false)) c.visible = false;
      c.cb && c.cb();
    })
  }
  start(){
    ["DOMContentLoaded", "scroll", "resize"].forEach(c=>window.addEventListener(c, ()=>this.forEach()));
  }
}