let lines = function (l) {

    let xyVertex = []; //Array that will contain the vertexes of the polyLine
    let videoList = document.getElementsByClassName("wrapper"); //Array to obtain all the div.wrapper elements

    l.setup = function () {
        var canvasL = l.createCanvas(l.windowWidth, document.getElementById("container").offsetHeight);
        // let pg = l.createGraphics(l.windowWidth, document.getElementById("container").offsetHeight);

        console.log(l.windowWidth);
        console.log(document.getElementById("container").offsetHeight);

        canvasL.parent("#canvasLines");
        // pg.parent("#canvasLines");
        xyVertex.push({
            x: videoList[0].lastElementChild.getBoundingClientRect().left + videoList[0].offsetWidth / 2,
            y: videoList[0].lastElementChild.getBoundingClientRect().top -videoList[0].parentNode.getBoundingClientRect().top + videoList[0].lastElementChild.offsetHeight / 2,
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
                    x: videoList[index].lastElementChild.getBoundingClientRect().left + videoList[index].offsetWidth / 2,
                    y: videoList[index].lastElementChild.getBoundingClientRect().top -videoList[index].parentNode.getBoundingClientRect().top + videoList[index].lastElementChild.offsetHeight / 2,
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

// (function() {
//     var mousePos;

//     document.onmousemove = handleMouseMove;
//     setInterval(getMousePosition, 100); // setInterval repeats every X ms

//     function handleMouseMove(event) {
//         var dot, eventDoc, doc, body, pageX, pageY;

//         event = event || window.event; // IE-ism

//         // If pageX/Y aren't available and clientX/Y are,
//         // calculate pageX/Y - logic taken from jQuery.
//         // (This is to support old IE)
//         if (event.pageX == null && event.clientX != null) {
//             eventDoc = (event.target && event.target.ownerDocument) || document;
//             doc = eventDoc.documentElement;
//             body = eventDoc.body;

//             event.pageX = event.clientX +
//               (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
//               (doc && doc.clientLeft || body && body.clientLeft || 0);
//             event.pageY = event.clientY +
//               (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
//               (doc && doc.clientTop  || body && body.clientTop  || 0 );
//         }

//         mousePos = {
//             x: event.pageX,
//             y: event.pageY
//         };
//     }
//     function getMousePosition() {
//         var pos = mousePos;
//         if (!pos) {
//             // We haven't seen any movement yet
//         }
//         else {
//             console.log(pos.x,pos.y);
//             // Use pos.x and pos.y
//         }
//     }
// })();
