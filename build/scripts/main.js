(function($){
  $(function(){
    //$(".callSlideout").sideNav({edge: 'right', menuWidth: 440, activationWidth: 70});

    $(".dropdown-button").dropdown({
      hover: false
    });

    $(".dropdown-button-simplified").dropdown({
      constrain_width: false,
      hover: false
    });

    $('.collapsible').collapsible();

    $('#initiate-form .collapse').collapse('show');

    //$(".button-collapse").sideNav();

    // wow.js init
    new WOW().init();

    $(".js-addDataRow").addDataRow();

    $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200
    });

    function loadDataTable() {
      $('table.data').DataTable({
        searching: false,
        lengthChange: false,
        'iDisplayLength': 100,
        columnDefs: [
          { "orderable": false, "targets": 0 }
        ]
      });
    }

    loadDataTable();

    $('select').material_select();

    $('.collapsible').collapsible();

    // pickadate init with preset Today
    $('.datepicker.today').pickadate({
      onStart: function ()
      {
        var date = new Date();
        this.set('select', [date.getFullYear(), date.getMonth() + 1, date.getDate()]);
      }
    });

    $('.datepicker').pickadate();

    // wow.js init
    new WOW().init();

    $(".js-addDataRow").addDataRow();

    $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200
    });

    if ($('body').hasClass('login')) {
      $('.login').pagepiling({
        touchSensitivity: 5,
        sectionSelector: '.pagepiling',
        verticalCentered: true,
        menu: '#menu',
        anchors: ['Start', 'page2', 'page3'],
        navigation: false
      });
    }

    $('.language').language({
      complete: function () {
        loadDataTable();
      }
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
/* jshint strict: true */
;(function ($) {
  'use strict';
  $.fn.language = function (options) {

    options = $.extend({}, $.fn.language.defaults, options);

    return this.each(function () {
      var obj = $(this);
      var lang = $.cookie('cis-language');

      obj.changeLanguage = function() {
        var selected = obj.attr('data-value');

        $.cookie(options.cookieName, selected);
      };

      obj.changeStylesheet = function() {
        var stylesheet;

        if(options.ltr.indexOf(lang) >= 0) {
          stylesheet = 'ltr';
        } else {
          stylesheet = 'rtl';
        }

        $('link[rel=stylesheet]').attr({href : 'styles/app-' + stylesheet + '.css'});
      }

      obj.initLanguage = function() {
        if(lang === undefined)
          lang = options.defaultLang;

        $.getJSON('./languages/' + lang + '.json', function(response){
          var element = $(options.template);
          var source  = element.html();
          var template = Handlebars.compile(source);
          var html = template(response);

          element.prev().html(html);

          options.complete.call(this);
        });
      };

      obj.click(function () {
        obj.changeLanguage();

        location.reload();
      });

      $(document).ready(function() {
        if(lang === undefined)
          $.cookie(options.cookieName, options.defaultLang);

        obj.initLanguage();
        obj.changeStylesheet();
      });
    });
  };

  $.fn.language.defaults = {
    cookieName: 'cis-language',
    defaultLang: 'ku',
    placeholder: '.template-placeholder',
    template: '.template',
    ltr: ['en'],
    rtl: ['ku'],
    complete: function () {}
  };
})(jQuery);
// Animate css functions
// http://www.telegraphicsinc.com/2013/07/how-to-use-animate-css/
function animationHover(element, animation){
element = $(element);
element.hover(
  function() {
    element.addClass('animated ' + animation);        
  },
  function(){
    //wait for animation to finish before removing classes
    window.setTimeout( function(){
        element.removeClass('animated ' + animation);
    }, 2000);         
  });
}

function animationClick(element, animation){
  element = $(element);
  element.click(
    function() {
      element.addClass('animated ' + animation);        
      //wait for animation to finish before removing classes
      window.setTimeout( function(){
          element.removeClass('animated ' + animation);
      }, 2000);
        
    });
}


// animate.css
$(document).ready(function() {

  $('.mdi-content-add').each(function() {
      animationClick(this, 'rotateIn');
  });

  // $('#saveFor').click(function(){
  //   $('.mdi-content-add').toggleClass('rotate-45');
  // });

}); // end docready


function rearrangeIndexes($context, index) {
	$context.find("input").each(function (i, val) { changeInputIndex($(val), index); });
}

function changeInputIndex($input, index) {
	if ($input.attr("id")) {
		var newId = $input.attr("id").replace(new RegExp("_\\d+__"), "_" + index + "__");
		$input.attr("id", newId);
	}
	if ($input.attr("name")) {
		var newName = $input.attr("name").replace(new RegExp("\\[\\d+\\]"), "[" + index + "]");
		$input.attr("name", newName);
	}
}

(function ($) {
	'use strict';

	$.fn.fileUpload = function () {

		var options = {
			container: '.js-fileupload-plugin',
			previewContainer: '.js-fileupload-previews',
			onDrag: '.js-fileupload-drag',
			previewItem: '.js-fileupload-preview-item',
			previewDummy: 'js-fileupload-preview-dummy',
			removeButton: '.js-fileupload-remove-item',
			fileData: 'js-FileData',
			fileSize: 'js-Size',
			fileName: 'js-Name',
			fileIsDeleted: 'js-IsDeleted'
		};


		function readDataFromFiles(files) {
			files.each(function (index, value) {
				var reader = new FileReader();
				reader.onload = function (event) {
					addPreviewItem(value, event.target.result);
				}
				reader.readAsDataURL(value);
			});
		}

		function generateFilePreviews() {
			var $input = $(this);
			if ('files' in $input && $input.files.length!=0){
				readDataFromFiles($input.files);
			}
			$input.remove();
		}

		function openFileUploadDialog() {
			var fileSelector = $('<input type="file" />');
			fileSelector.setAttribute('multiple', 'multiple');
			fileSelector.click();
			fileSelector.on('change', function() {
				generateFilePreviews();
			});
		}

		function removeFile() {
			$(this).parent().hide();
			$(this).parent().find(fileIsDeleted).val(true);
		}

		function removeDragoverClass() {
			$(this).removeClass(options.onDrag);
		}

		function addPreviewItem(file, data) {
			var $dummy = $(options.previewDummy);
			var $previewItem = $dummy.clone();

			$previewItem.find(options.fileData).val(data);
			$previewItem.find(options.fileName).val(file.name);
			$previewItem.find(options.fileSize).val(file.size);

			$(options.previewContainer).prependTo($dummy);

			$(options.previewItem).each(function(i, val) {
				rearrangeIndexes($(val), i);
			});
		}

		var $container = $(options.container);
		

		$container.ondragover = function () { $(this).addClass(options.onDrag); }
		$container.ondragend = function () { removeDragoverClass(); }
		$container.ondrop = function(e) {
			removeDragoverClass();
			readDataFromFiles(e.dataTransfer.files);
		}

		$container.click(openFileUploadDialog);
		$(options.removeButton).on("click", removeFile);
		$(options.previewDummy).find('input').attr('disabled', 'disabled');
	};

}(jQuery));

//AddDataRow: Clones last (preferrably hidden and empty) row in a container
//Usage sample
//<div id="elems"><div>Addable element container with input fields<div><div>
//<a href="#" class="js-addDataRow" data-datacontainer="#elems">Add button</a>
//<script>$(".js-addDataRow").addDataRow();</script>
(function ($) {
	$.fn.addDataRow = function () {
		this.click(function () {
			var $addButton = $(this);
			var dataContainerSelector = $addButton.data("datacontainer");
			if (!dataContainerSelector)
				return true;

			var $dataContainer = $(dataContainerSelector);
			if ($dataContainer.length == 0)
				return true;

			var $lastDataElement = $dataContainer.children(":last");
			if ($lastDataElement.length == 0)
				return true;

			var $newDataElement = $lastDataElement.clone();
			$newDataElement.insertAfter($dataContainer.children(":visible:last")).show();
			return true;
		});

		return this;
	};
}(jQuery));


// Fullscreen
// http://www.script-tutorials.com/new-technology-fullscreen-mode/
// mozfullscreenerror event handler

function errorHandler() {
   alert('mozfullscreenerror');
}
document.documentElement.addEventListener('mozfullscreenerror', errorHandler, false);

// toggle full screen
function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

// keydown event handler
//document.addEventListener('keydown', function(e) {
//  if (e.keyCode == 13) { // F or Enter key  || e.keyCode == 70
//    toggleFullScreen();
//  }
//}, false);
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
//    loadLanguage();

    // front login
    $('.forgot-pass').click(function(event) {
      $(".pr-wrap").toggleClass("show-pass-reset");
    });

    $('.pass-reset-submit').click(function(event) {
      $(".pr-wrap").removeClass("show-pass-reset");
    });


  }); // END DOCREADY