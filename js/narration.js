let lines = function (l) {
    
    let xyVertex = []; //Array that will contain the vertexes of the polyLine
    let videoList = document.getElementsByClassName("wrapper"); //Array to obtain all the div.wrapper elements
    
    l.setup = function () {
        var canvasL = l.createCanvas(l.windowWidth, l.windowHeight);
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
};

let canvasLines = new p5(lines);