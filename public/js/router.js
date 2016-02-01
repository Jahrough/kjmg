var loadContentArea = function(e) {
    var path = e ? e.currentTarget.hash.slice(1) : window.location.hash.slice(1),
        serverPath = '/' + path;

    path = path || 'main';
    path = '../' + path + '.html';

    $('#contentArea').load(path, function() {

        $.get(serverPath, function(htmlFragment) {
            $('#complexContact-lists').html(htmlFragment);
        });

        $('#complexContact').on('click', '.save, .edit, .remove', function(e) {
            e.preventDefault();
            app.mongodb($(e.currentTarget));
        });

        $('#contacts-lists').on('click', '.delete', deleteFunction);
        $('#contacts-lists').on('click', '.update', updateFunction);



        displayFromLocalStorage();

    });

};

//initilize the javascript when the page is fully loaded
$(document).ready(function() {

    loadContentArea();

    $(document).on('click', '.link', loadContentArea);

});
