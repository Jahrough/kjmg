// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://" + process.env.IP + ":27017/kjmg", function(err, db) {
	if (!err) {

		var path = require("path"),
			express = require("express"),
			app = express();

		app.use(express.static(__dirname + '/'));
		app.listen(process.env.PORT);

		app.get('/', function(request, response) {
			//
		});


	}

});
