/* jshint devel:true */

// NOTiFICATION
$(".notificationLink").click(function(){
  $("#notification_count").fadeOut("slow");
  return false;
});

//nav
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 40) {
        $("nav").addClass("scrolled");
    } else {
        $("nav").removeClass("scrolled");
    }
});

// START DOCREADY
$(document).ready(function() {

  // front login
  $('.forgot-pass').click(function(event) {
    $(".pr-wrap").toggleClass("show-pass-reset");
  });

  $('.pass-reset-submit').click(function(event) {
    $(".pr-wrap").removeClass("show-pass-reset");
  });
}); // END DOCREADY