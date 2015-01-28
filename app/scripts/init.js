(function($){
  $(function(){
    //$(".callSlideout").sideNav({edge: 'right', menuWidth: 440, activationWidth: 70});

    $('.collapsible').collapsible();

   // $('#caseForm .collapse').collapse('show');
   // $('#caseCard').collapse('hide');
   // $('#toggleRepresentative').collapse('hide');

    //$(".button-collapse").sideNav();

  // $("#chooseID").joyride({
  //       autoStart : true,
  //         postStepCallback : function (index, tip) {
  //         if (index == 2) {
  //           $(this).joyride('set_li', false, 1);
  //         }
  //       },
  //       modal:true,
  //       expose: true
  // });

    // wow.js init
    new WOW().init();

    $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200
    });

    $('.fullcalendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
    right: 'month,agendaWeek,agendaDay'
      },
      isRTL: $.cookie('cis-language') === 'ku',
      defaultView: 'month',
      editable: true,
      events: [
        {
      title: 'All Day Event',
      start: '2015-01-01'
    },
    {
      title: 'Long Event',
      start: '2015-01-07',
      end: '2015-01-10'
    },
    {
      id: 999,
      title: 'Repeating Event',
          start: '2015-01-09T16:00:00'
    },
    {
      id: 999,
          title: 'Repeating Event',
          start: '2015-01-16T16:00:00'
        },
    {
          title: 'Meeting',
          start: '2015-01-12T10:30:00',
          end: '2015-01-12T12:30:00'
    },
    {
          title: 'Lunch',
          start: '2015-01-12T12:00:00'
        },
    {
      title: 'Birthday Party',
      start: '2015-01-13T07:00:00'
    },
    {
      title: 'Click for Google',
      url: 'http://google.com/',
      start: '2015-01-28'
    }
      ]
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
      // pickadate init with preset Today
      $('.datepicker.today').pickadate({
        onStart: function ()
        {
          var date = new Date();
          this.set('select', [date.getFullYear(), date.getMonth() + 1, date.getDate()]);
        }
      });

      $('.datepicker').pickadate();

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
