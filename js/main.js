$(document).on("scroll", function () {
  if ($(window).scrollTop() > 30) {
    $(".header").addClass("active");
  } else {
    $(".header").removeClass("active");
  }
});

/* http://mit-license.org */ function e(){function f(a){var b=g.createElement("link");b.type="image/x-icon";b.rel="icon";b.href=a;a=h.getElementsByTagName("link");for(var c=0;c<a.length;c++)/\bicon\b/i.test(a[c].getAttribute("rel"))&&h.removeChild(a[c]);h.appendChild(b)}var g=document,h=g.getElementsByTagName("head")[0],d=null;return{defaultPause:2E3,change:function(a,b){clearTimeout(d);b&&(g.title=b);""!==a&&f(a)},animate:function(a,b){clearTimeout(d);a.forEach(function(a){(new Image).src=a});b=b||this.defaultPause;var c=0;
f(a[c]);d=setTimeout(function k(){c=(c+1)%a.length;f(a[c]);d=setTimeout(k,b)},b)},stopAnimate:function(){clearTimeout(d)}}}"function"===typeof define&&define.amd?define([],e):"object"===typeof module&&module.exports?module.exports=e():("undefined"!==typeof self?self:this).favicon=e();


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
