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




var personTypeahead = ['Person 1', 'Person 2', 'Person 3', 'Person 4'];
var casenrTypeahead = ['2014 / B / 23', '2014 / B / 24', '2014 / B / 25', '2014 / B / 26'];
var aadressTypeahead = ['Akadeemia tee 2', 'Akadeemia tee 5', 'Puu 4', ' Puu 5'];



var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;
 
    // an array that will be populated with substring matches
    matches = [];
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });
 
    cb(matches);
  };
};


// START DOCREADY
$(document).ready(function() {

  // front login
  $('.forgot-pass').click(function(event) {
    $(".pr-wrap").toggleClass("show-pass-reset");
  });

  $('.pass-reset-submit').click(function(event) {
    $(".pr-wrap").removeClass("show-pass-reset");
  });




  setTimeout(function (){

      $('.typeahead-input.persons').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        displayKey: 'value',
        source: substringMatcher(personTypeahead)
      });

      $('.typeahead-input.casenrs').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        displayKey: 'value',
        source: substringMatcher(casenrTypeahead)
      });

      $('.typeahead-input.aadresses').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        displayKey: 'value',
        source: substringMatcher(aadressTypeahead)
      });


    $( ".typeahead-container" ).each(function(event) {
        // alert('ss');
        // alert($(this).find("span").css("width","100%"));
        $(this).find("span").css("width","100%")
        // alert($(this).id.css("background-color","yellow"));
        // $(this.find(span).css("background-color","yellow"));      
    });


    $('.typeahead-container').click(function(event){
      $(this).find('label').addClass(' active');
      $(this).find('label').removeClass(' filled');
      // $('.typeahead-container label').addClass(' active');
      // $('.typeahead-container label').removeClass(' filled');
    });

    $('.typeahead-container').focusout(function(event){

      if(!($('#'+event.target.id).val())){
        $('.typeahead-container label').removeClass(' active');
      }
      else{
        // alert('ne');        
        $('.typeahead-container label').addClass(' filled');
      }
    });
  }, 800);




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
