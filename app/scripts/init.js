(function($){
  $(function(){
    $(".callSlideout").sideNav({
      edge: 'left', 


      closeOnClick: true
      }
    );

    $('.collapsible').collapsible();

    $('.tooltipped').tooltip({delay: 50});

    // wow.js init 
    new WOW().init();

    $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200
    });

    $('ul.tabs').tabs();

    function bindDataTable() {
      if ($.fn.dataTable.isDataTable('table.data')) {
        $('table.data').DataTable();
      }
      else {
        $('table.data').DataTable({
          searching: false,
          lengthChange: false,
          'iDisplayLength': 100,
          columnDefs: [
            { "orderable": false, "targets": 0 }
          ]
        });
      }
    }

    function bindFormsUi() {

    	$('ul.tabs').tabs();
      // pickadate init with preset Today
      $('.datepicker.today').pickadate({
        onStart: function ()
        {
          var date = new Date();
          this.set('select', [date.getFullYear(), date.getMonth() + 1, date.getDate()]);
        },
        disable: [
          6, 7
        ]
      });

      $('.datepicker').pickadate({
         disable: [
          6, 7
        ]
      });

      $('.timepicker').pickatime();

      $('select').material_select_override();
    
      // sample text change
      $('button[data-toggle="collapse"]').click(function () {
        var expanded = $(this).hasClass('collapsed');

        if (expanded) {
          $(this).button('less');
        } else {
          $(this).button('reset');
        }
      });
    }

    $(".dropdown-button").dropdown({
      constrain_width: false,
      hover: false
    });

    $(".dropdown-button-simplified").dropdown({
      constrain_width: false,
      hover: false
    });

    bindDataTable();
    bindFormsUi();

    $('.collapsible').collapsible();

    // wow.js init
    new WOW().init();

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

    $('#languageDropdown').language({
      complete: function () {
        bindDataTable();
        bindFormsUi();
      }
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
