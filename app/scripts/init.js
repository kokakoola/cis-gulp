(function($){
  $(function(){
    $(".callSlideout").sideNav({edge: 'right', menuWidth: 440, activationWidth: 70});

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
              title: '186/ 2015/ EE6',
              start: '2015-01-29T113:30:00',
              end: '2015-01-29T14:30:00'
        },
        {
              title: '145/ 2015/ EE6',
              start: '2015-01-28T10:30:00',
              end: '2015-01-28T12:30:00'
        },
        {
              title: '199/ 2015/ EE6',
              start: '2015-01-30T10:30:00',
              end: '2015-01-30T12:30:00'
        },
        {
              title: '195/ 2015/ EE6',
              start: '2015-02-02T10:30:00',
              end: '2015-02-03T12:30:00'
        },
        {
              title: '123/ 2015/ EE6',
              start: '2015-02-05T10:30:00',
              end: '2015-02-05T12:30:00'
        }
      ]
    });

    $('.dailycalendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      isRTL: $.cookie('cis-language') === 'ku',
      defaultView: 'agendaWeek',
      editable: true,
      events: [
        {
              title: '186/ 2015/ EE6',
              start: '2015-01-29T113:30:00',
              end: '2015-01-29T14:30:00'
        },
        {
              title: '145/ 2015/ EE6',
              start: '2015-01-28T10:30:00',
              end: '2015-01-28T12:30:00'
        },
        {
              title: '199/ 2015/ EE6',
              start: '2015-01-30T10:30:00',
              end: '2015-01-30T12:30:00'
        },
        {
              title: '195/ 2015/ EE6',
              start: '2015-02-02T10:30:00',
              end: '2015-02-03T12:30:00'
        },
        {
              title: '123/ 2015/ EE6',
              start: '2015-02-05T10:30:00',
              end: '2015-02-05T12:30:00'
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
