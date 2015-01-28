/* jshint strict: true */

$(function () {
  if ($('[data-datacol-group]').length)
    $('[data-datacol-group]').dataCol();
});

;(function ($) {
  'use strict';
  $.fn.dataCol = function (options) {

    var selector = {
      'show': 'datacol-models-show',
      'index': 'datacol-models-count',
      'model': 'datacol-model',
      'trigger': 'datacol-trigger',
      'clone': 'datacol-clone',
      'cloned': 'datacol-cloned',
      'delete': 'datacol-delete'
    };

    return this.each(function () {
      var obj = $(this);
      var index = obj.data(selector.index);
      var trigger = obj.find('[data-' + selector.trigger + ']');

      obj.find('[data-' + selector.clone + ']').click(function () {
        var model = $(this).data(selector.clone);
        var clone = cloneModel(model);

        scrollTo(clone);
      });

      obj.on('click', '[data-' + selector.delete + ']', function () {
        var model = $(this).closest('[data-' + selector.cloned + ']');

        deleteModel(model);
      });

      function init() {
        var count = obj.data(selector.show);

        var models = obj.find('[data-' + selector.model + ']:lt(' + count + ')');

        $.each(models, function() {
          cloneModel($(this).data(selector.model));
        });
      }

      function cloneModel(model) {
        var model = $('[data-' + selector.model + '="' + model + '"]');
        var clone = model.clone(true, true)
                         .addClass('trigger-wrapper')
                         .removeAttr('data-' + selector.model)
                         .attr('data-' + selector.cloned, '')
                         .show();

        obj.append(clone);

        moveTrigger();
        reIndex();
        initUIMethods(clone);

        return clone;
      }

      function deleteModel(model) {
        // we can reinsert it if needed
        model.detach();

        var text = model.find('[data-' + selector.delete + ']').data(selector.delete);
        var toastElem = jQuery('<span>').text(text);
        var link = jQuery('<a>').addClass('btn-flat yellow-text undo').attr('href', '#!').text('Undo');

        toastElem.append(link);

        toast(toastElem, 5000);

        moveTrigger();
        reIndex();
      }

      // this method needs to be rewritten. Right now it reindex all elements inside group.
      function reIndex() {
        var count = index;

        obj.find('[data-' + selector.cloned + ']').each(function () {
          $(this).find('input, textarea, label, select, hidden, div.collapse, [data-toggle="collapse"]').each(function () {
            var children = $(this);

		    var inputFor = children.attr('for');
		    var inputLabel = children.attr('label');
		    var inputId = children.attr('id');
		    var inputName = children.attr('name');
		    var href = children.attr('href');

		    if (inputFor !== undefined && inputFor != null)
		      children.attr('for', inputFor.replace(/\d+/, count));
		    if (inputLabel !== undefined && inputLabel != null)
		      children.attr('label', inputLabel.replace(/\d+/, count));
            if (inputId !== undefined && inputId != null)
		      children.attr('id', inputId.replace(/\d+/, count));
            if (inputName !== undefined && inputName != null)
		      children.attr('name', inputName.replace(/\d+/, count));
            if (href !== undefined && href != null)
		      children.attr('href', href.replace(/\d+/, count));
		  });

          count++;
        });
      }

      function initUIMethods(model) {
        // todo: callback method as parameter
        model.find('select').material_select();
      }

      function moveTrigger() {
        var last = obj.find('[data-' + selector.cloned + ']:visible').last();

        trigger.detach().prependTo(last);
      }

      function scrollTo(elem) {
        $('body').animate({
          scrollTop: elem.offset().top - 200
        }, 800);
      }

      $(document).ready(function () {
        init();
      });
    });
  };
})(jQuery);