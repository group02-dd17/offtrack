function openNav() {
  document.getElementById("info").style.display = "grid";
}

function closeNav() {
  document.getElementById("info").style.display = "none";
}

$(document).on('scroll', function(){
    if ( $(window).scrollTop() > 50) {
        $('.header').addClass('active');
    } else {
        $('.header').removeClass('active');
    }
});
