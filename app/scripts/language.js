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