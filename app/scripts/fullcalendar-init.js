  $(document).ready(function() {
      var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    /*  className colors
    
    className: default(transparent), important(red), chill(pink), success(green), info(blue)
    
    */    
    
      
    /* initialize the external events
    -----------------------------------------------------------------*/
  
    $('#external-events div.external-event').each(function() {
    
      // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
      // it doesn't need to have a start or end
      var eventObject = {
        title: $.trim($(this).text()) // use the element's text as the event title
      };
      
      // store the Event Object in the DOM element so we can get to it later
      $(this).data('eventObject', eventObject);
      
      // make the event draggable using jQuery UI
      $(this).draggable({
        zIndex: 999,
        revert: true,      // will cause the event to go back to its
        revertDuration: 0  //  original position after the drag
      });
      
    });
  
  
    /* initialize the calendar
    -----------------------------------------------------------------*/
    
    var calendar =  $('#daily-register-calendar').fullCalendar({
      header: {
        left: 'title',
        center: 'agendaDay,agendaWeek,month',
        right: 'prev,next today'
      },
      isRTL: $.cookie('cis-language') === 'ku' ? true : false,
      editable: true,
      firstDay: 1, //  1(Monday) this can be changed to 0(Sunday) for the USA system
      selectable: true,
      defaultView: 'month',
      axisFormat: 'HH:mm',
      timeFormat: 'HH:mm',
      // columnFormat: {
      //   month: 'ddd',    // Mon
      //   week: 'ddd d', // Mon 7
      //   day: 'dddd M/d',  // Monday 9/7
      //   agendaDay: 'dddd d'
      // },
      // titleFormat: {
      //   month: 'MMMM YYYY', // September 2009
      //   week: "MMMM YYYY", // September 2009
      //   day: 'MMMM YYYY'                  // Tuesday, Sep 8, 2009
      // },
      allDaySlot: false,
      // selectHelper: true,
      businessHours: {
        start: '8:00', // a start time (10am in this example)
        end: '12:00' // an end time (6pm in this example)
      },

      hiddenDays: [ 0, 6 ],
      minTime: '06:00:00',
      maxTime: '22:00:00',
      slotEventOverlap: false,
    // days of week. an array of zero-based day of week integers (0=Sunday)
    // (Monday-Thursday in this example)
      select: function(start, end, jsEvent, view) {
        // var title = prompt('Event Title:');
        // if (title) {
        //   calendar.fullCalendar('renderEvent',
        //     {
        //       title: title,
        //       start: start,
        //       end: end,
        //       allDay: allDay
        //     },
        //     true // make the event "stick"
        //   );
        // }
        // calendar.fullCalendar('unselect');
        if(view.name == 'month')
          return;
        
        window.location.href = "daily-new.html?start=" + start;
      },

      eventClick: function(event, jsEvent, view) {
        window.location.href = "daily-new.html?start=" + event.start;
      },

      dayClick: function(date, jsEvent, view) {
        if(view.name != 'month')
          return;

        $('#daily-register-calendar').fullCalendar('changeView', 'agendaDay');
        $('#daily-register-calendar').fullCalendar('gotoDate', date);
      },

      droppable: true, // this allows things to be dropped onto the calendar !!!
      drop: function(date, allDay) { // this function is called when something is dropped
      
        // retrieve the dropped element's stored Event Object
        var originalEventObject = $(this).data('eventObject');
        
        // we need to copy it, so that multiple events don't have a reference to the same object
        var copiedEventObject = $.extend({}, originalEventObject);
        
        // assign it the date that was reported
        copiedEventObject.start = date;
        copiedEventObject.allDay = allDay;
        
        // render the event on the calendar
        // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
        $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
        
        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
          // if so, remove the element from the "Draggable Events" list
          $(this).remove();
        }
        
      },
      
      events: [
        {
          title: 'All Day Event',
          start: new Date(y, m, 1)
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: new Date(y, m, d-3, 16, 0),
          allDay: false,
          className: 'info'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: new Date(y, m, d+4, 16, 0),
          allDay: false,
          className: 'info'
        },
        {
          title: 'Meeting',
          start: new Date(y, m, d, 08, 30),
          allDay: false,
          className: 'important'
        },
        {
          title: 'Lunch',
          start: new Date(y, m, d, 09, 0),
          end: new Date(y, m, d, 10, 0),
          allDay: false,
          className: 'important'
        },
        {
          title: 'Birthday Party',
          start: new Date(y, m, d+1, 19, 0),
          end: new Date(y, m, d+1, 22, 30),
          allDay: false,
        },
        {
          title: 'Click for Google',
          start: new Date(y, m, 28),
          end: new Date(y, m, 29),
          url: 'http://google.com/',
          className: 'success'
        }
      ],      
    });
    
    
  });
