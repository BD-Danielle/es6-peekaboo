/*
 * ========================================================================
 * peekaboo 1.0
 * The target was hidden or shown when window scroll to the specified area
 * YILING CHEN
 * Copyright 2020, MIT License
 * How to use it:
 * window.addEventListener('DOMContentLoaded', function () {
 *  var peekaboo = new Peekaboo();
 *  peekaboo.start('#target', [['#begin', '#end']]);
 * })
 * ========================================================================
 */

(function($, window, document){
  // if(!$) throw newError('jQuery is not defined');
  function Peekaboo(){
    this.areas = [];
    this.visible = [];
    this.target = null;
    this.resetNo = null;
  }

  // Release module to window
  window.Peekaboo = Peekaboo;

  // Match the specified selector 
  Peekaboo.prototype.query = function(ele){
    return document.querySelectorAll(ele)[0];
  }

  // Return the detailed size of user screen
  Peekaboo.prototype.screenSize = function(){
    // if(!screen) throw newError('screen is not defined');
    return {
      'width': screen.width || screen.availWidth, 
      'height': screen.height || screen.availHeight
    };
  }
  // Return the detailed size of user window
  Peekaboo.prototype.windowSize = function(){
    // if(!window) throw newError('window is not defined');
    return {
      'innerWidth': window.innerWidth,    // width without scrollbar-x
      'innerHeight': window.innerHeight,  // height without scrollbar-y
      'outerWidth': window.outerWidth,    // width with scrollbar-x
      'outerHeight': window.outerHeight   // height without scrollbar-y
    };
  }
  // Return the detailed size of user document
  Peekaboo.prototype.documentSize = function(){
    // if(!document) throw newError('document is not defined');
    return {
      'selfHeight': document.body.scrollHeight || document.body.clientHeight || document.documentElement.scrollHeight || document.documentElement.offsetHeight,
      'loadedHeight': document.documentElement.scrollTop || document.scrollingElement.scrollTop,
    };
  }
  Peekaboo.prototype.objSize = function(ele){
    var getOffset = function(element, horizontal){
      if(!element) return 0;
      return getOffset(element.offsetParent, horizontal) + (horizontal ? element.offsetLeft : element.offsetTop);
    };
    return {
      'selfHeight': this.query(ele).offsetHeight,
      'selfWidth': this.query(ele).offsetWidth,
      'offsetTop': getOffset(this.query(ele), false),
      'offsetLeft': getOffset(this.query(ele), true)
    }
  }
  Peekaboo.prototype.forLoops = function(ele, areas){
    var _this = this;
    areas.forEach(function(e, i){
      var DocLoadedHeight = _this.documentSize().loadedHeight;
      var DocUnloadedHeight = _this.documentSize().selfHeight - DocLoadedHeight - _this.windowSize().innerHeight;
      var pointA = _this.objSize(e[0]).offsetTop;
      var pointB = _this.documentSize().selfHeight - (_this.objSize(e[1]).offsetTop + _this.objSize(e[1]).selfHeight);
      DocLoadedHeight >= pointA && pointB <= DocUnloadedHeight ? _this.visible.push(1): _this.visible.push(0);
      
      _this.resetNo = 0;
      _this.visible.forEach(function (bool) {_this.resetNo += bool;});
      _this.resetNo > 0 ? _this.query(ele).style.display = 'block': _this.query(ele).style.display = 'none';
      if(_this.visible.length >= areas.length) {_this.visible.shift();}
    })
  }
  Peekaboo.prototype.start = function(ele, areas){
    var _this = this;
    window.addEventListener("DOMContentLoaded", function(){_this.forLoops(ele, areas);})
    window.addEventListener("scroll", function(){_this.forLoops(ele, areas);})
  }
})(jQuery, window, document);
// window.addEventListener('DOMContentLoaded', function () {
//   var peekaboo = new Peekaboo();
//   peekaboo.start('#target', [['#begin', '#end'], ['#begin1', '#end1']]);
// })