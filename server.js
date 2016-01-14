var MongoClient = require('mongodb').MongoClient,
	path = require("path"),
	express = require("express"),
	bodyParser = require('body-parser'),
	app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

MongoClient.connect('mongodb://' + process.env.IP + ':27017/kjmg', function(err, db) {

	if (!err) {

		app.use(express.static(__dirname + '/public'));

		app.post('/complex', function(req, res) {
			db.open(function(err, db) {
				if (!err) {
					db.collection('complexContact').insert(req.body);

					db.collection('complexContact').find().toArray(function(err, data) {
						if (!err) {
							res.send(data);
						}
					});
				}
			});
		//	db.close();




		});

		app.listen(process.env.PORT);

	}

});
