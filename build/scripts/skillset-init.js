var object = [
  {
    'headline':'HTML & CSS',
    'value':8,
    'length':9,
    'description':'Significant experience and knowlage of HTML(5) and CSS functionality and use.'
  },
  {
    'headline':'JavaScript & jQuery',
    'value':6,
    'length':5,
    'description':'Experience with object-oriented JavaScript. </br> Extended knowlage of DOM manipulation in aiding and extending the UI.'
  },
  {
    'headline':'Ruby & Python',
    'value':3,
    'length':5,
    'description':'Experience with object-oriented JavaScript. </br> Extended knowlage of DOM manipulation in aiding and extending the UI.'
  }
];

// NOTYFICATION
$(".notificationLink").click(function(){
  $("#notification_count").fadeOut("slow");
  return false;
});

$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 40) {
        $("nav").addClass("scrolled");
    } else {
        $("nav").removeClass("scrolled");
    }
});