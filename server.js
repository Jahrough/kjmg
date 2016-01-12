// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://" + process.env.IP + ":27017/kjmg", function(err, db) {
	if (!err) {

		var http = require('http');
		const PORT = process.env.PORT;

var express = require("express");
var app     = express();
var path    = require("path");


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
	

		app.listen(PORT, function() {
			console.log('Example app listening on port 3000!');
		});


		console.log("We are connected MongDB");


	}

});
