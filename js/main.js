$(document).on('scroll', function () {
    if ($(window).scrollTop() > 30) {
        $('.header').addClass('active');
    } else {
        $('.header').removeClass('active');
    }
});

favicon.animate([
    "/assets/favico/frame_0.png", "/assets/favico/frame_1.png", "/assets/favico/frame_2.png", "/assets/favico/frame_3.png", "/assets/favico/frame_4.png", "/assets/favico/frame_5.png", "/assets/favico/frame_6.png", "/assets/favico/frame_7.png"], 50);