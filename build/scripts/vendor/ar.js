// Arabic

jQuery.extend( jQuery.fn.pickadate.defaults, {
    monthsFull: [ 'يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر' ],
    monthsShort: [ 'يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر' ],
    weekdaysFull: [ 'الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة', 'السبت' ],
    weekdaysShort: [ 'الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة', 'السبت' ],
    today: 'اليوم',
    clear: 'مسح',
    format: 'yyyy mmmm dd',
    formatSubmit: 'yyyy/mm/dd'
});

jQuery.extend( jQuery.fn.pickatime.defaults, {
    clear: 'مسح'
});

/*!
 * Styling for RTL (right-to-left) languages using pickadate.js
 */
/**
 * Switch the direction - only really necessary if
 * it hasn’t already been applied higher up in the DOM.
 */
.picker {
  direction: rtl;
}
/**
 * Flip around the “next” and “previous” buttons.
 */
.picker__nav--next {
  right: auto;
  left: -1em;
}
.picker__nav--prev {
  left: auto;
  right: -1em;
}
.picker__nav--next:before {
  border-left: 0;
  border-right: 0.75em solid #000000;
}
.picker__nav--prev:before {
  border-right: 0;
  border-left: 0.75em solid #000000;
}
