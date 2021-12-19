for (i = 1; i <= 135; i++) {
    let newThumb = null;
    newThumb = document.createElement('div');
    newThumb.className = "filter";
    newThumb.setAttribute("id", "cover-item" + i);
    document.getElementById('cover').appendChild(newThumb);
}

$(window).on('load', function () {

    var _ending = $("#cover-btn");
    var enterX = _ending.offset().left + (_ending.width()) / 2;

    var enterY = _ending.offset().top + (_ending.height()) / 2;

    //collect all the divs that use .filter (so they will be the images ones)
    var items = $('.filter');

    let vertexArray = [];

    //shuffle the array
    shuffleArray(items);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Get sub-arrays of elements after shuffle

    let selected = [];
    let elems = 5;
    let groups = items.length / elems;

    for (i = 0; i < items.length - 1; i += elems) {
        selected.push(items.slice(i, i + elems));
    }

    //store the center coordinates of each div
    for (k in selected) {
        vertexArray[k] = [];
        selected[k].each(function (index, element) {
            var $this = $(element);
            var tempCoord = {
                x: $this.offset().left + $this.width() / 2,
                y: $this.offset().top + $this.height() / 2,
            };

            vertexArray[k][index] = tempCoord;
        });
    }

    console.log(vertexArray);

    let lines = function (l) {
        l.setup = function () {
            var canvasL = l.createCanvas(l.windowWidth, document.getElementById("container").offsetHeight);
            l.pixelDensity(1);
            l.frameRate(30);
            canvasL.parent("#canvasLines");
        };

        l.draw = function () {
            l.clear();
            const canvas = document.querySelector("#canvasLines");
            const ctx = this.canvas.getContext("2d");

            //set all the thumbnails grayscale
            for (k in selected) {
                selected[k].each(function (index, item) {
                    $(item).addClass("filter");
                });
            }

            for (k in selected) {
                selected[k].each(function (index, item) {
                    var $this = $(item);
                    var startX = $this.offset().left;
                    var widthThumb = $this.width();

                    var startY = $this.offset().top;
                    var heightThumb = $this.height();

                    // vertexArray[k].forEach(function (piece) {
                    //     l.ellipse(piece.x, piece.y, 10);
                    // });

                    if (l.mouseX > startX && l.mouseX < (startX + widthThumb) && (l.mouseY > startY && l.mouseY < (startY + heightThumb))) {
                        selected[k].each(function (i, thumb) {
                            $(thumb).removeClass("filter");
                        });

                        l.noFill();
                        l.stroke("red");
                        l.strokeWeight(2.5);

                        //draw the polyLine
                        l.beginShape();

                        vertexArray[k].forEach(function (piece) {
                            // l.ellipse(piece.x, piece.y, 10);
                            l.vertex(piece.x, piece.y);
                        });
                        l.vertex(enterX, enterY);
                        l.endShape();
                    }
                });
            }
        };
    };
    let canvasLines = new p5(lines);

});