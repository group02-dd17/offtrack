$(document).ready(function() {
  /*--------  Video Pop-up  ----------*/
  const videoSrc = $("#player-1").attr("src");
  $(".video-play-btn, .video-popup").on("click", function() {
    if ($(".video-popup").hasClass("open")) {
      $(".video-popup").removeClass("open");
      $("#player-1").attr("src", "");
    } else {
      $(".video-popup").addClass("open");
      if ($("#player-1").attr("src") == '') {
        $("#player-1").attr("src", videoSrc);
      }
    }
  });
});

/*--------  loader  ----------*/
$(window).on("load", function() {
  $("#loader").fadeOut(1700);
});

/*-------- navbar collapse ----------*/
$(".nav-link").on("click", function() {
  $(".navbar-collapse").collapse("hide")
})

/*-------- screenshot carousel ----------*/
$('.screenshot-carousel').owlCarousel({
  loop: true,
  margin: 0,
  autoplay: true,
  responsiveClass: true,
  lazyLoad: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    }
  }
})

/*--------  Smooth scroll  ----------*/
$(".navbar-collapse ul li a[href^='#']").on('click', function(e) {
  target = this.hash;
  e.preventDefault();

  $('html,body').animate({
    scrollTop: $(this.hash).offset().top
  }, 600, function() {
    window.location.hash = target;
  });
});

/*--------  aos  ----------*/
AOS.init({
  duration: 1200,
})

/*--------  butter.js  ----------*/
butter.init({
  wrapperId: 'butter',
  wrapperDamper: 0.03,
  cancelOnTouch: true
});