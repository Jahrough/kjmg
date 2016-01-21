var mongoDB = require("mongodb"),
	MongoClient = mongoDB.MongoClient,
	path = require("path"),
	express = require("express"),
	bodyParser = require('body-parser'),
	app = express(),
	expressHbs = require('express3-handlebars');

app.engine('hbs', expressHbs({
	extname: 'hbs',
	defaultLayout: 'complexContact.hbs'
}));

app.set('view engine', 'hbs');

app.set('views', __dirname + '/views/layouts');

app.use(bodyParser.urlencoded({
	extended: true
}));

/*app.use('/', routes);*/
MongoClient.connect('mongodb://' + process.env.IP + ':27017/kjmg', function(err, db) {

	if (!err) {
		console.log("Connected to MongoDB");
		app.use(express.static(__dirname + '/public'));

		var display = function(res) {
			return function(err, data) {
				if (!err) {
					db.collection('complexContact').find().toArray(function(err, data) {
						if (!err) {
							res.send(data);
						}
					});
				}
			};
		};

		app.get('/complexContact', function(req, res) {
			db.open(function(err, db) {
				var getDB = db.collection('complexContact');

				if (!err) {
					getDB.find().toArray(function(err, docs) {
						if (!err) {
							res.render('complexContact', {
								'complexContact': docs
							});
						}
					});
				}
			});
			//	db.close();

		});

		app.post('/add', function(req, res) {
			db.open(function(err, db) {
				if (!err) {
					db.collection('complexContact').insert(req.body, display(res));
				}
			});
			//	db.close();

		});

		app.post('/delete', function(req, res) {

			db.open(function(err, db) {

				if (!err) {

					db.collection('complexContact').remove({
						_id: new mongoDB.ObjectID(req.body.id)
					}, display(res));

				}
			});


		});

		app.post('/update', function(req, res) {
			db.open(function(err, db) {
				if (!err) {
					db.collection('complexContact').update({
						_id: new mongoDB.ObjectID(req.body.id)
					}, {
						name: req.body.name,
						phone: req.body.phone,
						gender: req.body.gender
					}, display(res));


				}
			});

		});
		app.listen(process.env.PORT);

	}

});
