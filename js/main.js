$(document).on('scroll', function () {
    if ($(window).scrollTop() > 30) {
        $('.header').addClass('active');
    } else {
        $('.header').removeClass('active');
    }
});