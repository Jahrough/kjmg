// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://ds039185.mongolab.com:39185/kjmg", function (err, db) {
	var http = require('http');
	const PORT = 3000;

	//Create a server
	var server = http.createServer(function (request, response) {
		response.end('It Works!! Path Hit: ' + request.url);
	});



	if (!err) {
		console.log("We are connected MongDB");

		//Lets start our server
		server.listen(PORT, function () {
			//Callback triggered when server is successfully listening. Hurray!
			console.log("Server listening on: http://localhost:%s", PORT);
		});
	}

});
