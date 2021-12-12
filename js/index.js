//collect all the divs that use .filter (so they will be the images ones)
var items = $('.filter');
var vertexArray = [];

//shuffle the array
shuffleArray(items);
function shuffleArray(array) {
    for (let i = array.length - 14; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Get sub-arrays of elements after shuffled
let selected1 = items.slice(0, 8);
let selected2 = items.slice(14, 26);

//store the center coordinates of each div
selected1.each(function () {
    var $this = $(this);
    vertexArray.push({
        x: $this.offset().left + $this.width() / 2,
        y: $this.offset().top + $this.height() / 2,
    });
});


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
        selected1.each(function (index, item) {
            $(item).addClass("filter");
        });

        selected1.each(function (index, item) {
            var startX = item.getBoundingClientRect().left;
            var widthThumb = item.offsetWidth;

            var startY = item.getBoundingClientRect().top;
            var heightThumb = item.offsetWidth;

            if (l.mouseX > startX && l.mouseX < (startX + widthThumb) && (l.mouseY > startY && l.mouseY < (startY + heightThumb))) {
                selected1.each(function (i, thumb) {
                    $(thumb).removeClass("filter");
                });
                l.noFill();
                l.stroke("red");
                l.strokeWeight(2.5);
                //draw the polyLine
                l.beginShape();
                vertexArray.forEach(function (item) {
                    l.vertex(item.x, item.y);
                });
                l.endShape();
            }
        });
    };
};
let canvasLines = new p5(lines);

