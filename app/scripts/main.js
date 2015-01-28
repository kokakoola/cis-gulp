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

});

$.fn.material_select_override = function (callback) {
  $(this).each(function(){
    $select = $(this);
    if ( $select.hasClass('browser-default') || $select.hasClass('initialized')) {
      return; // Continue to next (return false breaks out of entire loop)
      
    }
    var uniqueID = guid();
    var wrapper = $('<div class="select-wrapper"></div>');

    var options = $('<ul id="select-options-' + uniqueID+'" class="dropdown-content select-dropdown"></ul>');
    var selectOptions = $select.children('option');

    if ($select.find('option:selected') !== undefined) {
      var label = $select.find('option:selected');
    }
    else {
      var label = options.first();
    }

    // Create Dropdown structure        
    if ( $select.hasClass('status-select')){

      selectOptions.each(function () {
        options.append($('<li class="' + (($(this).is(':disabled')) ? 'disabled' : '') + '"><span>'  +$(this).html() +'<i class="'+$(this).attr("class")+'"></i></span></li>'));
      });
    }
    else{
      selectOptions.each(function () {
        options.append($('<li class="' + (($(this).is(':disabled')) ? 'disabled' : '') + '"><span>'  + $(this).html() + '</span></li>'));
      });
    }

    options.find('li').each(function (i) {
      var $curr_select = $select;
      $(this).click(function () {
        // Check if option element is disabled
        if (!$(this).hasClass('disabled')) {
          $curr_select.find('option').eq(i).prop('selected', true);
          // Trigger onchange() event
          $curr_select.trigger('change');
          $curr_select.prev('span.select-dropdown').html($(this).text());
          if (typeof callback !== 'undefined') callback();
        }
      });

    });

    // Wrap Elements
    $select.wrap(wrapper);
    // Add Select Display Element
    var $newSelect = $('<span class="select-dropdown ' + (($select.is(':disabled')) ? 'disabled' : '')
                     + '" data-activates="select-options-' + uniqueID +'">' + label.html() + '</span>');
    $select.before($newSelect);
    $('body').append(options);
    // Check if section element is disabled
    if (!$select.is(':disabled')) {
      $newSelect.dropdown({"hover": false});
    }
    $select.addClass('initialized');

  });
}

var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

       

 // END DOCREADY

// Usersnap
(function() {
var s = document.createElement("script");
s.type = "text/javascript";
s.async = true;
s.src = '//api.usersnap.com/load/'+
        '1ea495c4-875c-43d6-a897-82e131526bbc.js';
var x = document.getElementsByTagName('script')[0];
x.parentNode.insertBefore(s, x);
})();
