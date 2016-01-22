var loadContentArea = function(e) {
    var path = e ? e.currentTarget.hash.slice(1) : window.location.hash.slice(1),
        serverPath = '/' + path;

    path = path || 'main';
    path = '../' + path + '.html';

    $('#contentArea').load(path, function() {

        $.get(serverPath, function(htmlFragment) {
            $('#complexContact-lists').html(htmlFragment);
        });

        $('#add').on('submit', app.mongodb.add);
        $('#complexContact-lists').on('click', '.delete', app.mongodb.remove);
        $('#complexContact-lists').on('click', '.update', app.mongodb.update);





        $('#contacts-lists').on('click', '.delete', deleteFunction);
        $('#contacts-lists').on('click', '.update', updateFunction);

        //hide the notice 
        $('#notice').hide();

        //set the save button event
        //setSaveButtonEvent();
        //load the address list now


        displayFromLocalStorage();

    });

};

//initilize the javascript when the page is fully loaded
$(document).ready(function() {

    loadContentArea();

    $(document).on('click', '.link', loadContentArea);


});
