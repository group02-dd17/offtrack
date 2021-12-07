let lines = function(l) {

// let videos = []; // Array that contains the videos
// let vidPos = [];
let xyVertex = [];
let videoList = document.getElementsByClassName("wrapper");
// for(let j = 0; j < videoList.length; j++) {
//     vidPos.push(
//         videoList[j].getBoundingClientRect()
//     );
// }

// for (let j = 0; j < videoList.length; j++) {
//     videos.push({
//     x: vidPos[j].right - (videoList[j].offsetWidth/2),
//     y: vidPos[j].top + (videoList[j].offsetHeight/2)
//     });
// }

l.setup = function() {
    var canvasL = l.createCanvas(l.windowWidth, l.windowHeight);
    canvasL.parent('#canvasLines');
};

l.draw = function() {
    const canvas = document.querySelector('#canvasLines');
    const ctx = this.canvas.getContext('2d');

    // var linesarray = [];
    l.background("black");

    l.noFill();
    l.stroke("red");
    l.strokeWeight(2);

    videoList.forEach(function(item, index) {
        videoList[index].firstElementChild.addEventListener("mouseover", function(){
            // console.log(videos[index].x,videos[index].y);
            xyVertex.push({
                x: videoList[index].firstElementChild.getBoundingClientRect().left+((videoList[index].offsetHeight)/4),
                y: videoList[index].firstElementChild.getBoundingClientRect().top-videoList[index].parentNode.getBoundingClientRect().top+(videoList[index].firstElementChild.offsetHeight/2)
            });
        });
    });

    l.beginShape();
    xyVertex.forEach(function(item, index) {
        l.vertex(xyVertex[index].x, xyVertex[index].y);
    });
    l.vertex(l.mouseX, l.mouseY);
    l.endShape();


};

}

let canvasLines = new p5(lines);
