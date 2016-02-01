var mongoDB = require("mongodb"),
	MongoClient = mongoDB.MongoClient,
	expressHbs = require('express3-handlebars'),
bodyParser = require('body-parser'),
	express = require("express"),
	app = express();

app.engine('hbs', expressHbs({
	extname: 'hbs',
	defaultLayout: 'complexContact.hbs'
}));

app.set('view engine', 'hbs');

app.set('views', __dirname + '/views/layouts');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
	extended: true
}));

app.listen(process.env.PORT);


MongoClient.connect('mongodb://' + process.env.IP + ':27017/kjmg', function(err, db) {
	if (!err) {

		var collection = db.collection('complexContact'),

			// SEND UPDATE RESULTS
			display = function(res) {
				return function(err, data) {
					if (!err) {
						collection.find().toArray(function(err, data) {
							if (!err) {
								res.send(data);
							}
						});
					}
				};
			};


		// RENDER COMPLEX CONTACT TEMPLATE
		app.get('/complexContact', function(req, res) {
			collection.find().toArray(function(err, docs) {
				if (!err) {
					res.render('complexContact', {
						'complexContact': docs.reverse()
					});
				}
			});
		});


		// ADD FUNCTIONALITY
		app.post('/save', function(req, res) {
			collection.insert(req.body, display(res));
		});


		// UPDATE FUNCTIONALITY
		app.post('/edit', function(req, res) {
			collection.update({
				_id: new mongoDB.ObjectID(req.body.id)
			}, {
				name: req.body.name,
				phone: req.body.phone,
				gender: req.body.gender
			}, display(res));
		});


		// DELETE FUNCTIONALITY
		app.post('/remove', function(req, res) {
			collection.remove({
				_id: new mongoDB.ObjectID(req.body.id)
			}, display(res));
		});

	}
});
