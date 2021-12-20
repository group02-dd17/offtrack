$(document).on("scroll", function () {
  if ($(window).scrollTop() > 30) {
    $(".header").addClass("active");
  } else {
    $(".header").removeClass("active");
  }
});

// TOOLTIP
function isInViewport() {
  $(".tooltiptext").each(function () {
      var $this = $(this),
          wWidth = $(window).width(),
          offsets = this.getBoundingClientRect();

  if(offsets.x < 0) {
    this.style.transform = "translate(" + ((offsets.x * -1) + 100) + "px, 0)";
  }

  else if(offsets.x + offsets.width > wWidth) {
    this.style.transform = "translate(" + (((offsets.left + offsets.width - wWidth) * -1) - 100) + "px, 0)";
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


//easter egg
(() => {
	// constants
	const COLOR = {
		WINDOW: '#f8f9fa',
		BAR: '#868e96',
		DOT: '#f8f9fa',
		HEADER: '#868e96',
		TEXT: '#ced4da',
		SOCIAL: '#f06595',
		IMAGE: '#22b8cf'
	};

	// variables
	let canvas, elements;

	function init() {
		// engine
		let engine = Matter.Engine.create();
		engine.world.gravity.y = 0.5;

		// render
		let render = Matter.Render.create({
			element: document.getElementById('container'),
			engine: engine,
			options: {
				width: 800,
				height: 600,
				wireframes: false, // need this or various render styles won't take
				background: COLOR.WINDOW
			}
		});
		Matter.Render.run(render);

		// runner
		let runner = Matter.Runner.create();
		Matter.Runner.run(runner, engine);

		// fixed bodies
		Matter.World.add(engine.world, [
			// boundaries (top, bottom, left, right)
			wall(400, -10, 800, 20),
			wall(400, 610, 800, 20),
			wall(-10, 300, 20, 600),
			wall(810, 300, 20, 600),

			// top bar with 3 dots (left, mid, right)
			rect(400, 20, 800, 40, COLOR.BAR),
			circ(25, 20, 7, COLOR.DOT),
			circ(50, 20, 7, COLOR.DOT),
			circ(75, 20, 7, COLOR.DOT)
		]);

		// bodies to toss around
		elements = [
			// header icon
			circ(80, 120, 40, COLOR.IMAGE),

			// header main text
			rect(230, 105, 180, 30, COLOR.HEADER),
			rect(420, 105, 180, 30, COLOR.HEADER),

			// header sub text
			rect(170, 140, 60, 20, COLOR.HEADER),
			rect(280, 140, 140, 20, COLOR.HEADER),

			// social media icons
			circ(740, 100, 20, COLOR.SOCIAL),
			circ(740, 150, 20, COLOR.SOCIAL),
			circ(740, 200, 20, COLOR.SOCIAL),

			// top paragraph, first row
			rect(100, 230, 120, 20, COLOR.TEXT),
			rect(210, 230, 80, 20, COLOR.TEXT),
			rect(340, 230, 160, 20, COLOR.TEXT),
			rect(450, 230, 40, 20, COLOR.TEXT),
			rect(520, 230, 80, 20, COLOR.TEXT),

			// top paragraph, second row
			rect(60, 260, 40, 20, COLOR.TEXT),
			rect(150, 260, 120, 20, COLOR.TEXT),
			rect(300, 260, 160, 20, COLOR.TEXT),
			rect(450, 260, 120, 20, COLOR.TEXT),
			rect(560, 260, 80, 20, COLOR.TEXT),

			// top paragraph, third row
			rect(80, 290, 80, 20, COLOR.TEXT),
			rect(180, 290, 100, 20, COLOR.TEXT),
			rect(270, 290, 60, 20, COLOR.TEXT),
			rect(370, 290, 120, 20, COLOR.TEXT),
			rect(510, 290, 140, 20, COLOR.TEXT),

			// thumbnails
			rect(100, 400, 120, 80, COLOR.IMAGE),
			rect(250, 400, 120, 80, COLOR.IMAGE),
			rect(400, 400, 120, 80, COLOR.IMAGE),
			rect(550, 400, 120, 80, COLOR.IMAGE),

			// bottom paragraph, first row
			rect(100, 500, 120, 20, COLOR.TEXT),
			rect(190, 500, 40, 20, COLOR.TEXT),
			rect(300, 500, 160, 20, COLOR.TEXT),
			rect(450, 500, 120, 20, COLOR.TEXT),
			rect(560, 500, 80, 20, COLOR.TEXT),

			// bottom paragraph, second row
			rect(80, 530, 80, 20, COLOR.TEXT),
			rect(180, 530, 100, 20, COLOR.TEXT),
			rect(270, 530, 60, 20, COLOR.TEXT),
			rect(370, 530, 120, 20, COLOR.TEXT)
		];
		Matter.World.add(engine.world, elements);

		canvas = document.querySelector('#container canvas');
		run();
	}

	function run() {
		canvas.classList.add('slam');
		setTimeout(slam, 2000);
	}

	function slam() {
		// let the bodies hit the floor
		elements.forEach((body) => {
			Matter.Body.setStatic(body, false);
			Matter.Body.setVelocity(body, {
				x: rand(-4, 4),
				y: rand(-6, -4)
			});
			Matter.Body.setAngularVelocity(body, rand(-0.05, 0.05));
		});

		// repeat
		canvas.classList.remove('slam');
		setTimeout(run, 5000);
	}

	// matter.js has a built in random range function, but it is deterministic
	function rand(min, max) {
		return Math.random() * (max - min) + min;
	}

	function wall(x, y, width, height) {
		return Matter.Bodies.rectangle(x, y, width, height,  {
			isStatic: true,
			render: { visible: false }
		});
	}

	function rect(x, y, width, height, color) {
		return Matter.Bodies.rectangle(x, y, width, height, {
			isStatic: true,
			restitution: 1,
			render: { fillStyle: color }
		});
	}

	function circ(x, y, radius, color) {
		return Matter.Bodies.circle(x, y, radius, {
			isStatic: true,
			restitution: 1,
			render: { fillStyle: color }
		});
	}

	window.addEventListener('load', init, false);
})();

