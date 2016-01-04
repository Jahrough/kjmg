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
//reload the address list using ajax
var saveId = 0;

function displayAddressList(name, phone) {
	//debugger;
	//empty the contacts lists
	var list = $('#contacts-lists');
	//save a client copy of the items array for validation whenever its refreshed from server
	//loop thru all the items and add to the list
	var lh = "";
	lh += "<li>" + name;
	lh += " [ " + phone + " ] ";
	lh += '<a href="#delete-id" class="deletebtn" contactid="' + saveId++ + '"> delete contact </a>'
	lh += "</li>";
	list.html(lh);
	//set the delete button event after every reload
	setDeleteButtonEvents()
}




function displayFromLocalStorage() {
	// get from localstorage
	var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
	var html = '';
	var $list = $('#contacts-lists');

	for (var i = 0; i < contacts.length; i++) {
		html += '<li>' + contacts[i].name + ' ' + contacts[i].phone + '</li>';
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
//function to set all delete button events
function setDeleteButtonEvents() {
	$('.deletebtn').each(function (i) {
		//set the delete event on each delete button
		$(this).click(function () {
			//confirm
			var answer = confirm("are you sure you want to delete ?");
			if (!answer) {
				return;
			}
			//hide the form if its there
			$('#add-contact-form').hide();
			//set the delete notice
			$('#notice').empty().html('deleting...').show();
			//get the contactid of the current delete btn
			var id = $(this).attr('contactid');

			//************************** DELETE FUNCTION ******************************************/
			//************************** DELETE FUNCTION ******************************************/

			// iterator contact id








		});
	});
}
//initilize the javascript when the page is fully loaded
$(document).ready(function () {
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
	//set all the delete button events
	setDeleteButtonEvents();
	//set the save button event
	setSaveButtonEvent();
	//load the address list now

	displayFromLocalStorage();
});
