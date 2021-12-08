let lines = function (l) {

    let xyVertex = []; //Array that will contain the vertexes of the polyLine
    let videoList = document.getElementsByClassName("wrapper"); //Array to obtain all the div.wrapper elements

    l.setup = function () {
        var canvasL = l.createCanvas(l.windowWidth, document.getElementById("container").offsetHeight, l.SVG);
        
        console.log(l.windowWidth);
        console.log(document.getElementById("container").offsetHeight);

        canvasL.parent("#canvasLines");
    };

    l.draw = function () {
        const canvas = document.querySelector("#canvasLines");
        const ctx = this.canvas.getContext("2d");

        l.background("black"); //to avoid trails

        l.noFill();
        l.stroke("red");
        l.strokeWeight(2);

        videoList.forEach(function (item, index) {
            //when :hover the video
            videoList[index].firstElementChild.addEventListener("mouseover", function () {
                //add the center of the video as a new vertex
                xyVertex.push({
                    x: videoList[index].firstElementChild.getBoundingClientRect().left + videoList[index].offsetWidth / 2,
                    y: videoList[index].firstElementChild.getBoundingClientRect().top - videoList[index].parentNode.getBoundingClientRect().top + videoList[index].firstElementChild.offsetHeight / 2,
                });
                // console.log(videos[index].x,videos[index].y);
            });
        });

        //draw the polyLine
        l.beginShape();
        xyVertex.forEach(function (item, index) {
            l.vertex(xyVertex[index].x, xyVertex[index].y);
        });
        l.vertex(l.mouseX, l.mouseY);
        l.endShape();
    };
    // l.windowResized=function() {
    //     const css = getComputedStyle(l.canvas.parentElement),
    //           marginWidth = round(float(css.marginLeft) + float(css.marginRight)),
    //           marginHeight = round(float(css.marginTop) + float(css.marginBottom)),
    //           w = l.windowWidth - marginWidth, h = l.windowHeight - marginHeight;
      
    //     resizeCanvas(w, h, true);
    //   }
};



let canvasLines = new p5(lines);

