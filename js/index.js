$(window).on('load', function () {
    //collect all the divs that use .filter (so they will be the images ones)
    var items = $('.filter');
    let vertexArray = [];

    //shuffle the array
    shuffleArray(items);

    function shuffleArray(array) {
        for (let i = array.length - 14; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Get sub-arrays of elements after shuffle

    let selected = [];
    let elems = 5;
    let groups = items.length / elems;

    for (i = 0; i < items.length - 16; i += elems) {
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
                        l.endShape();
                    }
                });
            }
        };
    };
    let canvasLines = new p5(lines);

});