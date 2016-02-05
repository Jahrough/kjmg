var app = {};

app.mongodb = (function() {
	'use strict';

	var module = {

		display: function(data) {
			var $list = $('#complexContact-lists'),
				html = '';

			//data.reverse();

			for (var i = 0; i < data.length; i++) {
				html += '<li class="list-group-item" data-id="' + data[i]._id + '">' +
					'<input type="text" value=' + data[i].name + ' readonly="readonly"/>' +
					'<input type="phone" value=' + data[i].phone + ' readonly="readonly"/>' +
					'<span>' + data[i].gender + '</span>' +
					'<a href="#" class="edit btn btn-default hide">edit</a>' +
					'<a href="#" class="remove btn btn-default hide">remove</a>' +
					'</li>';
			}

			$list.html(html);

		},



		//function to set the save contact button event
		save: function($element, self) {
			debugger;
			var data = $element.closest('form').serialize();
			$.ajax({
				method: 'POST',
				url: '/save',
				data: data,
				success: function(response) {
					self.display(response);
					$('#name, #phone').val('');
				},
				error: function(err) {
					console.log("this is an error block" + err);
				}

			});
		},



		edit: function($element, self) {
			var $nameField = $element.siblings('input[type="text"]'),
				$phoneField = $element.siblings('input[type="phone"]'),
				$genderField = $element.siblings('span');

			if ($element.text() === 'edit') {
				$element.text('save');
				$nameField.removeAttr('readonly');
				$phoneField.removeAttr('readonly');
			}
			else {

				$.ajax({
					method: 'POST',
					url: '/edit',
					data: {
						'id': $element.closest('li').data('id'),
						'name': $nameField.val(),
						'phone': $phoneField.val(),
						'gender': $genderField.text()
					},
					success: function(response) {
						self.display(response);
					},
					error: function(err) {
						console.log("this is an error block" + err);
					}
				});
			}
		},


		remove: function($element, self) {
			$.ajax({
				method: 'POST',
				url: '/remove',
				data: {
					'id': $element.closest('li').data('id')
				},
				success: function(response) {
					self.display(response);
				},
				error: function(err) {
					console.log("this is an error block" + err);
				}
			});
		},



		init: function($element) {
			var classList = $element.prop('class'),
				methods = ['save', 'edit', 'remove'],
				count = methods.length,
				i, method;

			for (i = 0; i < count; i++) {
				method = methods[i];
				if (classList.indexOf(method) > -1) {
					this[method]($element, this);
					break;
				}
			}
		}
	};


	return function($element) {
		module.init($element);
	};



}());
