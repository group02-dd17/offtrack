$(document).on("scroll", function () {
  if ($(window).scrollTop() > 30) {
    $(".header").addClass("active");
  } else {
    $(".header").removeClass("active");
  }
});

//COOKIES

function rC(nam) {
  var tC = document.cookie.split("; ");
  for (var i = tC.length - 1; i >= 0; i--) {
    var x = tC[i].split("=");
    if (nam == x[0]) return unescape(x[1]);
  }
  return "~";
}

function writeCookie(nam, val) {
  document.cookie = nam + "=" + escape(val);
}

function lookupCookie(nam, pg) {
  var val = rC(nam);
  if (val.indexOf("~" + pg + "~") != -1) return false;
  val += pg + "~";
  writeCookie(nam, val);
  return true;
}

function firstTime(cookieName) {
  return lookupCookie("qneiEnow", cookieName);
}

function thisPage() {
  var page = location.href.substring(location.href.lastIndexOf("/") + 1);
  pos = page.indexOf(".");
  if (pos > -1) {
    page = page.substr(0, pos);
  }

  return page;
}

if (firstTime(thisPage()) && thisPage() == "home") {
  // this code only runs for first visit
  window.cookieconsent.initialise({
    cookie: {
       domain : "/",
       name: "cookie_consent",
     },
     palette:{
       popup:  { background: "#FFF"  },
       button: { background: "#000"},
     },
     content:{
       message: "We use cookies to offer you a better browsing experience. If you continue to use this site, you consent to our use of cookies",
     },
   });
} 



// TOOLTIP
function isInViewport() {
  $(".tooltiptext").each(function () {
    var $this = $(this),
      wWidth = $(window).width(),
      offsets = this.getBoundingClientRect();

    if (offsets.x < 0) {
      this.style.transform = "translate(" + (offsets.x * -1 + 100) + "px, 0)";
    } else if (offsets.x + offsets.width > wWidth) {
      this.style.transform =
        "translate(" +
        ((offsets.left + offsets.width - wWidth) * -1 - 100) +
        "px, 0)";
    }
  });
}

isInViewport();

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
    "assets/favico/frame_1.png",
    "assets/favico/frame_2.png",
    "assets/favico/frame_3.png",
    "assets/favico/frame_4.png",
    "assets/favico/frame_5.png",
    "assets/favico/frame_6.png",
    "assets/favico/frame_7.png",
    "assets/favico/frame_8.png",
    "assets/favico/frame_9.png",
    "assets/favico/frame_10.png",
    "assets/favico/frame_11.png",
    "assets/favico/frame_12.png",
    "assets/favico/frame_13.png",
    "assets/favico/frame_14.png",
    "assets/favico/frame_15.png",
    "assets/favico/frame_16.png",
    "assets/favico/frame_17.png",
    "assets/favico/frame_18.png",
  ],
  100
);

document.getElementById("easter-egg").addEventListener("click", function() {
  //easter egg
const world = document.querySelector(".faces");
const { Engine, Render, Runner, World, Bodies } = Matter;

let engine = Engine.create();

const textures = ["https://i.ibb.co/PDFjr65/IL-PECORA.png"];
function init() {
  let width = $(document).width();
  let height = $(document).height();
  let vmin = Math.min(width, height);

  engine.events = {};
  World.clear(engine.world);
  Engine.clear(engine);
  engine = Engine.create();

  let render = Render.create({
    canvas: world,
    engine: engine,
    options: {
      wireframes: false,
      background: "transparent",
      width: width,
      height: height,
    },
  });

  World.add(engine.world, [
    Bodies.rectangle(width / 2, height, width, 100, {
      isStatic: true,
      render: {
        fillStyle: 'none'
      }
    }),

    Bodies.rectangle(-50, height / 2, 100, height, {
      isStatic: true,
    }),
    Bodies.rectangle(width + 50, height / 2, 100, height, {
      isStatic: true,
    })
  ]);

  function createBall() {
    const ORIGINAL_SIZE = 70;
    const SIZE = Math.floor(Math.random() * 76) + 30;
    const ball = Bodies.circle(Math.round(Math.random() * width), -30, 29, {
      angle: Math.PI * (Math.random() * 2 - 1),
      friction: 0.001,
      frictionAir: 0.01,
      restitution: 0.8,
      render: {
        sprite: {
          texture: textures[Math.floor(Math.random() * textures.length)],
          xScale: SIZE / ORIGINAL_SIZE,
          yScale: SIZE / ORIGINAL_SIZE,
        },
      },
    });

    setTimeout(() => {
      World.remove(engine.world, ball);
    }, 6000);

    return ball;
  }

  Engine.run(engine);

  Render.run(render);
  const handleClick = () => {
    const ball2 = createBall();
    World.add(engine.world, [ball2]);
  };
  setInterval(handleClick, 50);
}

init();

$(window).resize(function () {
  init();
});
});
