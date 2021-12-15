let videoList = document.getElementsByClassName("wrapper"); //Array to obtain all the div.wrapper elements
let flagMute = false; //check volume video

volumeVideos(0.01);

let lines = function (l) {
  let xyVertex = []; //Array that will contain the vertexes of the polyLine

  l.setup = function () {
    const canvas = document.querySelector("#canvasLines");
    const ctx = this.canvas.getContext("2d");
    p5.disableFriendlyErrors = true; // disables FES
    var canvasL = l.createCanvas(
      l.windowWidth,
      document.getElementById("container").offsetHeight
    );

    l.pixelDensity(1);
    l.frameRate(25);

    canvasL.parent("#canvasLines");

    var firstNode = document.getElementById("wrapper-" + checkPage + "1");
    xyVertex.push({
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
    l.clear();

    for (g in hashArray) {
      l.drawLines(hashArray[g], "hashtag-" + checkPage + (+g + +1));
    }

    l.noFill();
    l.stroke("red");
    l.strokeWeight(2);

    $(videoList).ready(function () {
      videoList.forEach(function (item) {
        //when :hover the video
        item.lastElementChild.addEventListener("mouseover", function () {
          //add the center of the video as a new vertex
          xyVertex.push({
            x:
              item.lastElementChild.getBoundingClientRect().left +
              item.offsetWidth / 2,
            y:
              item.lastElementChild.getBoundingClientRect().top -
              document.getElementById("title").getBoundingClientRect().top +
              item.lastElementChild.offsetHeight / 2,
          });
        });
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

$(".hash").click(function (_hash) {
  let url = new URL('https://group02-density.github.io//Website/archive.html');
  let content = _hash.target.innerText.toLowerCase().substring(1);
  console.log(content);
  url.searchParams.set('selection', content);
  window.open(url);
});
