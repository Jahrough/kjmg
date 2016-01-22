var app = {};

app.mongodb = (function() {
	
	var display = function(data) {
			var $list = $('#complexContact-lists'),
				html = '';

			data.reverse();

			if (data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					html += '<li class="list-group-item" data-id="' + data[i]._id + '">' +
						'<input type="text" value=' + data[i].name + ' readonly="readonly"/>' +
						'<input type="phone" value=' + data[i].phone + ' readonly="readonly"/>' +
						'<span>' + data[i].gender + '</span>' +
						'<a href="#" class="update btn btn-default hide">Update</a>' +
						'<a href="#" class="delete btn btn-default hide">delete</a>' +
						'</li>';
				}
			}

			$list.empty().html(html);

		},





		//function to set the save contact button event
		add = function(e) {
			e.preventDefault();
			var $form = $(e.currentTarget);

			$.ajax({
				method: 'POST',
				url: $form.prop('action'),
				data: $form.serialize(),
				success: function(response) {
					display(response);
					$('#name, #phone').val('');
				},
				error: function(err) {
					console.log("this is an error block" + err);
				}

			});

		},



		remove = function(e) {
			e.preventDefault();
			
			$.ajax({
				method: 'POST',
				url: '/delete',
				data: {
					'id': $(e.currentTarget).closest('li').data('id')
				},
				success: function(response) {
					display(response);

				},
				error: function(err) {
					console.log("this is an error block" + err);
				}
			});
		},


		update = function(e) {
			e.preventDefault();
			var $currentTarget = $(e.currentTarget),
				$nameField = $currentTarget.siblings('input[type="text"]'),
				$phoneField = $currentTarget.siblings('input[type="phone"]'),
				$genderField = $currentTarget.siblings('span');

			if ($currentTarget.text() === 'Update') {
				$currentTarget.text('save');
				$nameField.removeAttr('readonly');
				$phoneField.removeAttr('readonly');
			} else {
				e.preventDefault();
				
				$.ajax({
					method: 'POST',
					url: '/update',
					data: {
						'id': $(e.currentTarget).closest('li').data('id'),
						'name': $nameField.val(),
						'phone': $phoneField.val(),
						'gender': $genderField.text()
					},
					success: function(response) {
						display(response);

					},
					error: function(err) {
						console.log("this is an error block" + err);
					}

				});
			}

		};


	return {
		add: add,
		remove: remove,
		update: update
	};

}());
