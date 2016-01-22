function displayFromLocalStorage() {
    // get from localstorage
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    var html = '';
    var $list = $('#contacts-lists');

    contacts.reverse();
    if (contacts.length > 0) {
        for (var i = 0; i < contacts.length; i++) {
            html += '<li class="list-group-item">' +
                '<input type="text" value=' + contacts[i].name + ' readonly="readonly"/>' +
                '<input type="phone" value=' + contacts[i].phone + ' readonly="readonly"/>' +
                '<a href="#" class="update btn btn-default" data-id="' + contacts[i].id + '">Update</a>' +
                '<a href="#" class="delete btn btn-default" data-id="' + contacts[i].id + '">delete</a>' +
                '</li>';
        }
    }
    $list.empty().html(html);

}



//function to set the save contact button event
function setSaveButtonEvent() {

    $('#save-contact-btn').click(function(e) {
        e.preventDefault();
        
        var name = $('#name').val(),
                phone = $('#phone').val(),
                contacts = JSON.parse(localStorage.getItem('contacts')) || [];

            //empty the input fields
            $('#phone, #name').val('');

            contacts.push({
                id: contacts.length + 1,
                name: name,
                phone: phone
            });

            localStorage.setItem('contacts', JSON.stringify(contacts));

            //refresh the address list
            displayFromLocalStorage();


    });
}




var deleteFunction = function(e) {
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

var updateFunction = function(e) {
    e.preventDefault();
    var $currentTarget = $(e.currentTarget),
        $nameField = $currentTarget.siblings('input[type="text"]'),
        $phoneField = $currentTarget.siblings('input[type="phone"]'),
        i, contacts = JSON.parse(localStorage.getItem('contacts'));

    if ($currentTarget.text() === 'Update') {
        $currentTarget.text('save');
        $nameField.removeAttr('readonly');
        $phoneField.removeAttr('readonly');
    }
    else {
        for (i = 0; contacts.length; ++i) {
            if (contacts[i].id === $(e.currentTarget).data('id')) {
                contacts[i].name = $nameField.val();
                contacts[i].phone = $phoneField.val();
                break;
            }
        }

        localStorage.setItem('contacts', JSON.stringify(contacts));
        displayFromLocalStorage();
    }

};
