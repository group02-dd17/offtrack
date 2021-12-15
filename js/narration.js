let videoList = document.getElementsByClassName("wrapper"); //Array to obtain all the div.wrapper elements
let flagMute = false; //check volume video
let hashArray = [
  "hoax",
  "covid",
  "pcr",
  "genocide",
  "injection",
  "covidiots",
  "bullshit",
  "scam",
  "communist",
  "freedom",
  "illuminati",
  "pcr1",
  "covidiots1",
];

volumeVideos(0.01);

let lines = function (l) {
  let xyVertex = []; //Array that will contain the vertexes of the polyLine

  l.setup = function () {
    p5.disableFriendlyErrors = true; // disables FES
    // var canvasL = l.createCanvas(l.windowWidth, document.getElementById("container").offsetHeight, l.WEBGL);
    var canvasL = l.createCanvas(
      l.windowWidth,
      document.getElementById("container").offsetHeight
    );

    l.pixelDensity(1);
    l.frameRate(25);

    canvasL.parent("#canvasLines");

    var firstNode = document.getElementById("wrapper-mask-1");
    xyVertex.push({
      // x: firstNode.lastElementChild.getBoundingClientRect().left + firstNode.offsetWidth / 2 - l.width/2,
      // y: firstNode.lastElementChild.getBoundingClientRect().top - firstNode.parentNode.getBoundingClientRect().top + firstNode.lastElementChild.offsetHeight / 2 -l.height/2,

      x:
        firstNode.lastElementChild.getBoundingClientRect().left +
        firstNode.offsetWidth / 2,
      y:
        firstNode.lastElementChild.getBoundingClientRect().top -
        document.getElementById("title").getBoundingClientRect().top +
        firstNode.lastElementChild.offsetHeight / 2,
    });
  };

  l.draw = function () {
    const canvas = document.querySelector("#canvasLines");
    const ctx = this.canvas.getContext("2d");

    // l.background("black"); //to avoid trails
    l.clear();

    for (g in hashArray) {
      l.drawLines(hashArray[g], "hashtag-mask-" + (+g + +1));
    }

    l.noFill();
    l.stroke("red");
    l.strokeWeight(2);

    $(videoList).ready(function () {
      videoList.forEach(function (item, index) {
        //when :hover the video
        videoList[index].lastElementChild.addEventListener(
          "mouseover",
          function () {
            //add the center of the video as a new vertex
            xyVertex.push({
              x:
                videoList[index].lastElementChild.getBoundingClientRect().left +
                videoList[index].offsetWidth / 2,
              y:
                videoList[index].lastElementChild.getBoundingClientRect().top -
                document.getElementById("title").getBoundingClientRect().top +
                videoList[index].lastElementChild.offsetHeight / 2,
            });
          }
        );
      });
    });

    //draw the polyLine
    l.beginShape();
    xyVertex.forEach(function (item, index) {
      l.vertex(xyVertex[index].x, xyVertex[index].y);
    });
    l.vertex(l.mouseX, l.mouseY);
    l.endShape();
    l.mouseWheel = function (event) {
      //move the square according to the vertical scroll amount
      l.mouseY += event.delta;
      //uncomment to block page scrolling
      //return false;
    };
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
      l.stroke("#d8d8d8");
      l.vertex(x0, y0);
      l.vertex(
        $(item).offset().left + item.offsetWidth / 2,
        $(item).offset().top + item.offsetHeight / 2
      );
      // l.line(
      //   x0,
      //   y0,
      //   $(item).offset().left + this.offsetWidth / 2,
      //   $(item).offset().top + this.offsetHeight / 2
      // );
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

videoList.forEach(function (item, index) {
  item.lastElementChild.addEventListener("mouseover", function () {
    if (!flagMute) item.lastElementChild.volume = 1;
  });

  item.addEventListener("mouseout", function () {
    if (!flagMute) item.lastElementChild.volume = 0.01;
  });
});

function volumeVideos(vol) {
  videoList.forEach(function (item) {
    item.lastElementChild.volume = vol;
  });
}
