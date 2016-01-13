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

		console.log(db);

		/*app.get('/', function(req, res) {
			res.send(req.query);
			
		});*/


		app.post('/complex', function(req, res) {
			db.open(function(err, db) {

				if (!err) {
					db.collection('complexContact').insert(req.body);
				}
			});


			/*db.collections('complexContact').find({}).toArray(function(err, data){
				data.foreach(function(err, item){
					
				});
			});*/

		});



		app.listen(process.env.PORT);

	}


});
