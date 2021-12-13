let videoList = document.getElementsByClassName("wrapper"); //Array to obtain all the div.wrapper elements

$(videoList).ready(function () {

  videoList.forEach(function (item, index) {
    videoList[index].lastElementChild.volume = 0.01;
  });

  let lines = function (l) {
    let xyVertex = []; //Array that will contain the vertexes of the polyLine

    l.setup = function () {
      // var canvasL = l.createCanvas(l.windowWidth, document.getElementById("container").offsetHeight, l.WEBGL);
      var canvasL = l.createCanvas(
        l.windowWidth,
        document.getElementById("container").offsetHeight
      );
      l.pixelDensity(1);
      console.log("canva fr 1");

      console.log(l.windowWidth);
      console.log(document.getElementById("container").offsetHeight);

      canvasL.parent("#canvasLines");

      var firstNode = document.getElementById("wrapper-vid1");
      xyVertex.push({
        // x: firstNode.lastElementChild.getBoundingClientRect().left + firstNode.offsetWidth / 2 - l.width/2,
        // y: firstNode.lastElementChild.getBoundingClientRect().top - firstNode.parentNode.getBoundingClientRect().top + firstNode.lastElementChild.offsetHeight / 2 -l.height/2,

        x:
          firstNode.lastElementChild.getBoundingClientRect().left +
          firstNode.offsetWidth / 2,
        y:
          firstNode.lastElementChild.getBoundingClientRect().top -
          firstNode.parentNode.getBoundingClientRect().top +
          firstNode.lastElementChild.offsetHeight / 2,
      });
    };

    l.draw = function () {
      const canvas = document.querySelector("#canvasLines");
      const ctx = this.canvas.getContext("2d");

      // l.background("black"); //to avoid trails
      l.clear();

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
                  videoList[index].parentNode.getBoundingClientRect().top +
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
  };
  let canvasLines = new p5(lines);

  videoList.forEach(function (item, index) {
    //when :hover the video
    videoList[index].lastElementChild.addEventListener(
      "mouseover",
      function () {
        for (k in videoList) {
          if (k != index) {
            videoList[k].lastElementChild.volume = 0.01;
          } else {
            videoList[k].lastElementChild.volume = 1;
          }
        }
      }
    );

    item.addEventListener("mouseout", function () {
      for (k in videoList) {
        videoList[k].lastElementChild.volume = 0.01;
      }
    });
  });
});