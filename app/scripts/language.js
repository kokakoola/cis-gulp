/* jshint strict: true */
;(function ($) {
  'use strict';
  $.fn.language = function (options) {

    options = $.extend({}, $.fn.language.defaults, options);

    return this.each(function () {
      var obj = $(this);
      var lang = $.cookie('cis-language');

      obj.changeLanguage = function(selected) {
        $.cookie(options.cookieName, selected);
      };

      obj.changeStylesheet = function() {
        var stylesheet;

        if(options.ltr.indexOf(lang) >= 0) {
          stylesheet = 'ltr';
        } else {
          stylesheet = 'rtl';
        }

        $('.main-style').attr({href : 'styles/app-' + stylesheet + '.css'});
      }

      obj.initLanguage = function() {
        if(lang === undefined)
          lang = options.defaultLang;

        $(options.template).each(function() {
          var element = $(this);
          var source  = element.html();
          var json = element.data('lang');

          $.getJSON('./languages/' + json + '_' + lang + '.json', function(response){
            var template = Handlebars.compile(source);
            var html = template(response);

            element.prev().html(html);

            options.complete.call(this);
          });
        });
      };

      obj.find('a').click(function () {
        var selected = $(this).attr('data-value');

        obj.changeLanguage(selected);

        location.reload();
      });

      $(window).load(function() {
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
