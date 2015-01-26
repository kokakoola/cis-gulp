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

