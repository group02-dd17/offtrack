let pointY = 0,
  offsetPoint = 0;

onmousemove = function (e) {
  pointY = e.clientY;
};

$(document).scroll(function () {
  offsetPoint = window.scrollY;
});

if (window.innerHeight > window.innerWidth) {
  document.getElementById("disclaimer").style.display = "grid";
  document.documentElement.setAttribute("style", "touch-action: none;");
}

function doOnOrientationChange() {
  switch (window.orientation) {
    case 90:
    case -90:
      document.getElementById("disclaimer").style.display = "none";
      document.documentElement.setAttribute("style", "touch-action: auto;");
      break;
    case 0:
    case 180:
      document.getElementById("disclaimer").style.display = "grid";
      document.documentElement.setAttribute("style", "touch-action: none;");
      break;
    default:
      break;
  }
}

window.addEventListener("orientationchange", doOnOrientationChange);

// Initial execution if needed
doOnOrientationChange();

jQuery(window).on("load", function () {
  console.log("AOOOO");
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");
  document.getElementsByTagName("video").forEach((itemVid) => {
    itemVid.play();
    itemVid.muted = null;
  });
  volumeVideos(0.01);
});

let videoList = document.getElementsByClassName("wrapper"); //Array to obtain all the div.wrapper elements
let flagMute = false; //check volume video

let xyVertex = []; //Array that will contain the vertexes of the polyLine

var firstNode = document.getElementById("wrapper-" + checkPage + "1");
let _x0 =
  firstNode.lastElementChild.getBoundingClientRect().left +
  firstNode.offsetWidth / 2;
let _y0 =
  firstNode.lastElementChild.getBoundingClientRect().top -
  document.getElementById("title").getBoundingClientRect().top +
  firstNode.lastElementChild.offsetHeight / 2;

let lines = function (l) {
  l.setup = function () {
    const canvas = document.querySelector("#canvasLines");
    const ctx = this.canvas.getContext("2d");

    p5.disableFriendlyErrors = true; // disables FES

    var canvasL = l.createCanvas(
      l.windowWidth,
      document.getElementById("container").offsetHeight
    );

    l.pixelDensity(1);
    l.frameRate(30);

    canvasL.parent("#canvasLines");
  };

  l.draw = function () {
    let mouseVertical = offsetPoint + pointY;

    let redLine = function (_delta) {
      l.beginShape();
      l.vertex(_x0, _y0);

      $(xyVertex).each(function () {
        l.vertex(this[0], this[1]);
      });

      l.vertex(l.mouseX, mouseVertical);
      l.endShape();
    };

    l.clear();

    // mousePos Helper
    // l.ellipse(l.mouseX, offsetPoint+pointY, 20);
    for (g in hashArray) {
      l.drawLines(hashArray[g], "hashtag-" + checkPage + (+g + +1));
    }

    l.noFill();
    l.stroke("red");
    l.strokeWeight(2);

    redLine(0);

    // $(document).scroll( function(_event) {
    //   l.print(_event.deltaY);
    //   l.print("scroll");
    // });
  };

  l.drawLines = function (className, idHash) {
    var vidArray = document.getElementsByClassName(className);
    var x0 =
      $("#" + idHash).offset().left +
      document.getElementById(idHash).offsetWidth / 2;
    var y0 =
      $("#" + idHash).offset().top +
      document.getElementById(idHash).offsetHeight / 2;
    vidArray.forEach(function (item) {
      l.beginShape(l.LINES);
      l.strokeWeight(2);
      l.noFill();
      l.stroke("#D8D8D8");
      l.vertex(x0, y0);
      l.vertex(
        $(item).offset().left + item.offsetWidth / 2,
        $(item).offset().top + item.offsetHeight / 2
      );
      l.endShape();
    });
  };
};

let canvasLines = new p5(lines);

document.getElementById("toggleVolume").addEventListener("click", function () {
  $(this).find("svg").toggleClass("hide");

  if (flagMute) {
    volumeVideos(0.01);
    flagMute = false;
  } else {
    volumeVideos(0);
    flagMute = true;
  }
});

$("video").hover(
  function () {
    if (!flagMute) this.volume = 1;
  },
  function () {
    if (!flagMute) this.volume = 0.01;
  }
);

// videoList.forEach(function (item, index) {
//   item.lastElementChild.addEventListener("mouseover", function () {
//     if (!flagMute) item.lastElementChild.volume = 1;
//   });

//   item.addEventListener("mouseout", function () {
//     if (!flagMute) item.lastElementChild.volume = 0.01;
//   });
// });

let volumeVideos = function (vol) {
  $("video").each(function () {
    this.volume = vol;
  });

  //OLD METHOD
  // videoList.forEach(function (item) {
  //   item.lastElementChild.volume = vol;
  // });
};

$(".hash").click(function (_hash) {
  let index = $(".hash").index(this);
  let url = new URL("https://group02-dd17.github.io/offtrack/archive.html");
  let content = _hash.target.innerText.toLowerCase().substring(1);
  console.log(content);
  url.searchParams.set("selection", content);
  window.open(url);
});

let tempCoord = [];

$(".wrapper").each(function (index) {
  $(this).mouseenter(function () {
    let x = Math.floor($(this).offset().left + this.offsetWidth / 2);
    let y = Math.floor($(this).offset().top + this.offsetHeight / 2);
    tempCoord = [x, y];
    if (xyVertex.length > 1) {
      let a = xyVertex[xyVertex.length - 1];
      if (a.toString() !== tempCoord.toString()) {
        xyVertex.push(tempCoord);
      }
    } else xyVertex.push(tempCoord);
  });
});
