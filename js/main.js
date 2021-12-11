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

function toggleMute(el) {
  el.muted = !(el.muted);
}
window.onload = function() {
  document.getElementById("sos").onmouseover = function() {
    toggleMute(this);
  };
  document.getElementById("sos").onmouseout = function() {
    toggleMute(this)
  };
}
