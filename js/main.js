$(document).on("scroll", function () {
  if ($(window).scrollTop() > 30) {
    $(".header").addClass("active");
  } else {
    $(".header").removeClass("active");
  }
});

// TOOLTIP
const tooltip = document.querySelector("#tooltip");

// $(".tooltip-content").click(function () {
//   tooltip.classList.add("clicked");

//   switch ($(this).text()) {
//     case "dark platforms":
//       tooltip.textContent =
//         "Digital platforms that are less regulated and moderated hence can be used for hosting content and content creators that may not be tolerated by their more mainstream counterparts.";
//         break;
//     case "Bitchute":
//       tooltip.textContent = "BitChute is a video hosting service launched by Ray Vahey in January 2017. It is known for accommodating far-right individuals and conspiracy theorists, and for hosting hate speech.";
//       break;
//     case "misinformation":
//       tooltip.textContent = "Misinformation is false, inaccurate, or misleading information.";
//       break;
//   }
//   // Pass the button, the tooltip, and some options, and Popper will do the
//   // magic positioning for you:
//   Popper.createPopper(this, tooltip, {
//     placement: "bottom",
//   });
// });
// console.log(document.querySelectorAll('a u'));
// const instance = tippy(document.querySelectorAll('a u'));
// console.log(instance);

// instance.setProps ({
//     placement: 'bottom',
//     arrow: false,
//     animation: 'fade',
//     duration: 500,
//     trigger: 'click'
//   });

// $(".tooltip-content").click(function () {
//   instance.each(function(index, item){
//     item.setContent(checkTooltip($(this)));
//   });
// });

// function checkTooltip(content) {
//   var text;
//   switch (content.text()) {
//     case "dark platforms":
//       text = "Digital platforms that are less regulated and moderated hence can be used for hosting content and content creators that may not be tolerated by their more mainstream counterparts.";
//       return text;
//     case "Bitchute":
//       text = "BitChute is a video hosting service launched by Ray Vahey in January 2017. It is known for accommodating far-right individuals and conspiracy theorists, and for hosting hate speech.";
//       return text;
//     case "misinformation":
//       text = "Misinformation is false, inaccurate, or misleading information.";
//       return text;
//   };
// }

/* http://mit-license.org */ function e() {
  function f(a) {
    var b = g.createElement("link");
    b.type = "image/x-icon";
    b.rel = "icon";
    b.href = a;
    a = h.getElementsByTagName("link");
    for (var c = 0; c < a.length; c++)
      /\bicon\b/i.test(a[c].getAttribute("rel")) && h.removeChild(a[c]);
    h.appendChild(b);
  }
  var g = document,
    h = g.getElementsByTagName("head")[0],
    d = null;
  return {
    defaultPause: 2e3,
    change: function (a, b) {
      clearTimeout(d);
      b && (g.title = b);
      "" !== a && f(a);
    },
    animate: function (a, b) {
      clearTimeout(d);
      a.forEach(function (a) {
        new Image().src = a;
      });
      b = b || this.defaultPause;
      var c = 0;
      f(a[c]);
      d = setTimeout(function k() {
        c = (c + 1) % a.length;
        f(a[c]);
        d = setTimeout(k, b);
      }, b);
    },
    stopAnimate: function () {
      clearTimeout(d);
    },
  };
}
"function" === typeof define && define.amd
  ? define([], e)
  : "object" === typeof module && module.exports
  ? (module.exports = e())
  : (("undefined" !== typeof self ? self : this).favicon = e());

favicon.animate(
  [
    "assets/favico/frame_0.png",
    "assets/favico/frame_1.png",
    "assets/favico/frame_2.png",
    "assets/favico/frame_3.png",
    "assets/favico/frame_4.png",
    "assets/favico/frame_5.png",
    "assets/favico/frame_6.png",
    "assets/favico/frame_7.png",
  ],
  500
);
