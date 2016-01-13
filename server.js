var MongoClient = require('mongodb').MongoClient,
	path = require("path"),
	express = require("express"),
	bodyParser = require('body-parser'),
	app = express();


MongoClient.connect('mongodb://' + process.env.IP + ':27017/kjmg', function(err, db) {

	if (!err) {
		app.use(express.static(__dirname + '/public'));

		console.log(db);

		/*app.get('/', function(req, res) {
			res.send(req.query);
			
		});*/

		db.open(function(err, db) {

			if (!err) {
				db.createCollection('complexContact');
				db.collection('complexContact').insert({
					'name': 'bob dole'
				});
			}
		});

		app.post('/complex', function(req, res) {
			console.log(req.body);


			/*db.collections('complexContact').find({}).toArray(function(err, data){
				data.foreach(function(err, item){
					
				});
			});*/

		});



		app.listen(process.env.PORT);

	}


});
