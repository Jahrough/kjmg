// JavaScript Document
//global variable to hold client copy of the addresses in the database
addresslist = "";
//function to ensure there are no duplicate entries
function isDuplicate(names, phone) {
	var isduplicate = false;
	for (var i = 0; i < addresslist.length; i++) {
		if (addresslist[i].names.toLowerCase() == names.toLowerCase() && addresslist[i].phone.toLowerCase() == phone.toLowerCase()) {
			isduplicate = true;
		}
	}
	return isduplicate;
}



function displayFromLocalStorage() {
	// get from localstorage
	var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
	var html = '';
	var $list = $('#contacts-lists');
	if (contacts.length > 0) {
		for (var i = 0; i < contacts.length; i++) {
			html += '<li>' + contacts[i].name + ' ' + contacts[i].phone +
				'<a href="#" class="delete" data-id="' + contacts[i].id + '">delete</a>' +
				'<a href="#" class="update" data-id="' + contacts[i].id + '">Update</a></li>';
		}
	}
	$list.empty().html(html);

}

//function to set the save contact button event
function setSaveButtonEvent() {

	$('#save-contact-btn').click(function () {
		//hide notice
		$('#notice').hide();
		//get the name and phone data
		var name = $('#names').val();
		var phone = $('#phone').val();
		//validate: ensure the name of phone is not empty, the name and phone not in dbase and
		//the name has only text and number has only numbers
		if (name == "" || phone == "") {
			$('#notice').empty().html('the phone number or name field cannot be empty').show('slow');
		} else if (isDuplicate(name, phone)) {
			$('#notice').empty().html('the contact info you specified is already in the database').show('slow');
		} else if (isNaN(new Number(phone))) {
			$('#notice').empty().html('the phone field must contain valid numeric data').show('slow');
		} else if (name.match(/\d/)) {
			$('#notice').empty().html('the name field must not contain numeric input').show('slow');
		} else {
			//************************** ADD FUNCTION ******************************************/
			//************************** ADD FUNCTION ******************************************/

			//call the ajax save function
			$('#notice').empty().html('saving....').show();


			function saveRecord(name, phone) {
				//empty the input fields
				$('#names').val('');
				$('#phone').val('');


				var contacts = JSON.parse(localStorage.getItem('contacts')) || [];

				contacts.push({
					id: contacts.length + 1,
					name: name,
					phone: phone
				});

				localStorage.setItem('contacts', JSON.stringify(contacts));

				//refresh the address list
				displayFromLocalStorage();
			}

			saveRecord(name, phone);
		}
	});
}



var deleteFunction = function (e) {
	e.preventDefault();
	var i, contacts = JSON.parse(localStorage.getItem('contacts'));

	for (i = 0; contacts.length; ++i) {
		if (contacts[i].id === $(e.currentTarget).data('id')) {
			contacts.splice(i, 1);
			break;
		}
	}

	console.log(contacts);
	localStorage.setItem('contacts', JSON.stringify(contacts));

	displayFromLocalStorage();


};

var updateFunction = function (e) {
	e.preventDefault();
	var i, contacts = JSON.parse(localStorage.getItem('contacts'));

	for (i = 0; contacts.length; ++i) {
		if (contacts[i].id === $(e.currentTarget).data('id')) {
			contacts.splice(i, 1);
			break;
		}
	}

	localStorage.setItem('contacts', JSON.stringify(contacts));
	displayFromLocalStorage();


};


//initilize the javascript when the page is fully loaded
$(document).ready(function () {

	$('#contacts-lists').on('click', '.delete', deleteFunction);
	$('#contacts-lists').on('click', '.update', updateFunction);

	//hide the add contact form 	
	$('#add-contact-form').hide();
	//hide the notice 
	$('#notice').hide();
	//set the add contact form button event
	$('#add-contact-btn').click(function () {
		//hide the notice if its still there
		$('#notice').hide();
		//show the add contact form slowly when button is clicked
		$('#add-contact-form').show('slow');
	});
	//set the cancel button event
	$('#cancel-btn').click(function () {
		$('#add-contact-form').hide('slow');
		$('#notice').hide();
		//empty the input fields
		$('#names').val('');
		$('#phone').val('');
	});

	//set the save button event
	setSaveButtonEvent();
	//load the address list now

	displayFromLocalStorage();
});
