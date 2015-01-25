(function($){
  $(function(){
    //$(".callSlideout").sideNav({edge: 'right', menuWidth: 440, activationWidth: 70});

    $('.collapsible').collapsible();

    $('#caseForm .collapse').collapse('show');
    $('#caseCard').collapse('hide');
    $('#toggleRepresentative').collapse('hide');


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

      $('select').material_select();
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

    $('#languageDropdown').language({
      complete: function () {
        bindDataTable();
        bindFormsUi();
      }
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
