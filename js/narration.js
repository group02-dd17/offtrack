let lines = function (l) {

    let xyVertex = []; //Array that will contain the vertexes of the polyLine
    let videoList = document.getElementsByClassName("wrapper"); //Array to obtain all the div.wrapper elements

    l.setup = function () {
        var canvasL = l.createCanvas(l.windowWidth, document.getElementById("container").offsetHeight, l.WEBGL);

        console.log(l.windowWidth);
        console.log(document.getElementById("container").offsetHeight);

        canvasL.parent("#canvasLines");

        xyVertex.push({
            x: document.getElementById("wrapper-vid1").getBoundingClientRect().left - document.getElementById("wrapper-vid1").offsetWidth / 2 - l.width/2,
            y: document.getElementById("wrapper-vid1").getBoundingClientRect().top - document.getElementById("wrapper-vid1").parentNode.getBoundingClientRect().top - document.getElementById("wrapper-vid1").lastElementChild.offsetHeight / 2 - l.height/2,
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

        videoList.forEach(function (item, index) {
            //when :hover the video
            videoList[index].lastElementChild.addEventListener("mouseover", function () {
                //add the center of the video as a new vertex
                xyVertex.push({
                    x: videoList[index].lastElementChild.getBoundingClientRect().left + videoList[index].offsetWidth / 2 - l.width/2,
                    y: videoList[index].lastElementChild.getBoundingClientRect().top - videoList[index].parentNode.getBoundingClientRect().top + videoList[index].lastElementChild.offsetHeight / 2 -l.height/2,
                });
                // console.log(videos[index].x,videos[index].y);
            });
        });

        //draw the polyLine
        l.beginShape();
        xyVertex.forEach(function (item, index) {
            l.vertex(xyVertex[index].x, xyVertex[index].y);
        });
        l.vertex(l.mouseX-l.width/2, l.mouseY-l.height/2);
        l.endShape();

    };
};



let canvasLines = new p5(lines);
