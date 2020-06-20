"use strict";

/*
 *
 *
 */
(function ($, window, document, undefined) {
  "use strict";

  $.jade = function (el, options) {
    var base = this;
    // Access to jQuery and DOM versions of element
    base.$el = $(el);

    // Cached objects
    base.$win = $(window);
    base.$doc = $(document);
    base.win = window;
    base.$body = $("html, body");
    base.scrollNo = 0;

    // Initialize
    base.init = function () {
      base.options = $.extend({}, $.jade.defaultOptions, options);
      base.gameon = $(base.options.gameon);
    };

    // Use jQuery fn to prevent JS loaded wrong message
    base.getMultiScripts = function (jsArray, path) {
      var _jsArray = $.map(jsArray, function (js) {
        // console.log(jsArray);
        return $.getScript((path || "") + js);
      });
      return $.when.apply($, _jsArray);
    };

    // Third party module import
    base.importJS = function (jsOptions, callback) {
      if (jsOptions.files.length > 0) {
        $.getScript(jsOptions.path + jsOptions.files[0]).done(function () {
          jsOptions.files = jsOptions.files.slice(1);
          base.importJS(jsOptions, callback);
        });
      } else {
        callback();
      }
    };
    // Detect obj's offsetTop
    base.offsetTop = function (obj) {
      if (obj.length) return obj.offset().top;
    };

    // Make objs keyframe
    base.keyframe = function () {
      return $.keyframe.define([{
        // left halo rotate (counterclockwise)
        name: "left-halo-rotate",
        '0%': {
          opacity: 0,
          transform: 'rotate(-35deg)',
          visibility: 'hidden'
        },
        '1%': {
          // left: '50%',
          opacity: 1,
          visibility: 'visible'
        },
        '95%': {
          // left: '15%',
          opacity: 1
        },
        '99.999%': {
          // left: '15%',
          opacity: 1,
          transform: 'rotate(-395deg)',
          visibility: 'visible'
        },
        '100%': {
          opacity: 1,
          visibility: 'hidden'
        }
      }, {
        name: "left-halo-op-rotate",
        '0%': {
          opacity: 0.5,
          transform: 'rotate(25deg)',
          visibility: 'hidden'
        },
        '7%': {
          // right: '50%',
          opacity: 1,
          visibility: 'visible'
        },
        '49.999%': {
          // right: '15%',
          opacity: 0.8
        },
        '88%': {
          // right: '15%',
          opacity: 0.3
        },
        '94%': {
          // right: '15%',
          opacity: 0.2
        },
        '99.999%': {
          // left: '15%',
          opacity: 0,
          transform: 'rotate(390deg)',
          visibility: 'visible'
        },
        '100%': {
          opacity: 0,
          visibility: 'hidden'
        }
      }, {
        // right halo rotate (clockwise)
        name: "right-halo-rotate",
        '0%': {
          opacity: 0,
          transform: 'rotate(30deg)',
          visibility: 'hidden'
        },
        '1%': {
          // right: '50%',
          opacity: 1,
          visibility: 'visible'
        },
        '95%': {
          // right: '15%',
          opacity: 1
          // transform: 'rotate(-325deg)',
          // visibility: 'visible'
        },
        '99.999%': {
          // right: '15%',
          opacity: 0.5,
          transform: 'rotate(-330deg)',
          visibility: 'visible'
        },

        '100': {
          opacity: 0,
          visibility: 'hidden'
        }
      }, {
        // right halo rotate (clockwise)
        name: "right-halo-op-rotate",
        '0%': {
          opacity: 0.5,
          transform: 'rotate(-395deg)',
          visibility: 'hidden'
        },
        '7%': {
          // right: '50%',
          opacity: 1,
          visibility: 'visible'
        },
        '49.999%': {
          // right: '15%',
          opacity: 0.8
        },
        '88%': {
          // right: '15%',
          opacity: 0.3
        },
        '94%': {
          // right: '15%',
          opacity: 0.2
        },
        '99.999%': {
          // right: '15%',
          opacity: 0,
          transform: 'rotate(-30deg)',
          visibility: 'visible'
        },
        '100': {
          opacity: 0,
          visibility: 'hidden'
        }
      }, {
        // obj fade in
        name: "fade-in",
        '0%': {
          opacity: 0,
          visibility: "hidden"
        },
        '100%': {
          opacity: 1,
          visibility: "visible"
        }
      }]);
    };
    base.fadeIn = function (selector, duration, timingFunction, delay) {
      selector.playKeyframe([
      // name: 'trapdoor-sequence', // name of the keyframe you want to bind to the selected element
      // duration: '1s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
      // timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
      // delay: '0s', //[optional, default: 0s]  how long you want to wait before the animation starts
      // iterationCount: 'infinite', //[optional, default:1]  how many times you want the animation to repeat
      // direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
      // fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
      // complete: function(){} //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.

      {
        name: "fade-in",
        duration: duration, // [optional, default: 0, in ms] how long you want it to last in milliseconds
        timingFunction: timingFunction, // [optional, default: ease] specifies the speed curve of the animation
        delay: delay, //[optional, default: 0s]  how long you want to wait before the animation starts
        iterationCount: 1 //[optional, default:1]  how many times you want the animation to repeat
      }]);
    };

    base.halo_rotate = function (selector, name, duration, timingFunction, delay, _complete) {
      selector.playKeyframe([{
        name: name,
        duration: duration, // [optional, default: 0, in ms] how long you want it to last in milliseconds
        timingFunction: timingFunction, // [optional, default: ease] specifies the speed curve of the animation
        delay: delay, //[optional, default: 0s]  how long you want to wait before the animation starts
        iterationCount: 1, //[optional, default:1]  how many times you want the animation to repeat
        complete: function complete() {
          _complete;
        } //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
      }]);
      // base.q1($('.q1'));
    };
    base.resetKeyframe = function (selector, cb) {
      Object.prototype.toString.call(cb).slice(8, -1) == 'Function' ? selector.resetKeyframe(cb) : selector.resetKeyframe();
      // selector.resetKeyframe(cb);
    };
    // Run initializer
    base.init();

    base.$win.on("load", function () {
      base.keyframe();
      // console.log(base.scrollNo);
    });
    base.$win.on("scroll", function () {
      var scrollTop = $(this).scrollTop();
      // if (scrollTop > base.offsetTop(base.gameon)) {
      if (scrollTop > base.offsetTop(base.gameon)) {
        base.scrollNo += 1;
        console.log(base.scrollNo);
        if (base.scrollNo == 1) {
          base.fadeIn($('.left .jade'), "2s", "cubic-bezier(0.28, 1.03, 1, 1)", "0s");
          base.fadeIn($('.right .jade'), "2s", "cubic-bezier(0.28, 1.03, 1, 1)", "0s");
          /**/
          base.halo_rotate($('.left .circle'), "left-halo-rotate", "1.5s", "linear", ".3s", function () {
            //   base.resetKeyframe($('.left .circle'));
            // }());
            base.halo_rotate($('.left .circle-opposite'), "right-halo-op-rotate", "1.5s", "linear", "1.8s", function () {
              // base.halo_rotate($('.left .circle'), "left-halo-rotate-again", ".5s", "linear", ".3s", function(){
              base.fadeIn($('.left .halo'), "1.75s", "cubic-bezier(0.28, 1.03, 1, 1)", "1s");
              base.fadeIn($('.left .name'), "1.75s", "cubic-bezier(0.28, 1.03, 1, 1)", "1.75s");
              // }());
            }());
          }());

          base.halo_rotate($('.right .circle'), "right-halo-rotate", "1.5s", "linear", ".3s", function () {
            base.halo_rotate($('.right .circle-opposite'), "left-halo-op-rotate", "1.5s", "linear", "1.8s", function () {
              base.fadeIn($('.right .halo'), "1.75s", "cubic-bezier(0.28, 1.03, 1, 1)", "1s");
              base.fadeIn($('.right .name'), "1.75s", "cubic-bezier(0.28, 1.03, 1, 1)", "1.75s");
            }());
          }());
          /**/
          base.fadeIn($('.middle'), "3s", "ease-in-out", "0s");
        }
      }
    });
  };
  $.jade.defaultOptions = {
    gameon: "#game-on"
  };
  $.fn.jade = function (options) {
    return this.each(function () {
      new $.jade(this, options);
    });
  };
})(jQuery, window, document);
