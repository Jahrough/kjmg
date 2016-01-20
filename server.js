var mongoDB = require("mongodb"),
	MongoClient = mongoDB.MongoClient,
	path = require("path"),
	express = require("express"),
	bodyParser = require('body-parser'),
	app = express(),
	expressHbs = require('express3-handlebars');

app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'complexContact.hbs'}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views/layouts');

app.use(bodyParser.urlencoded({
	extended: true
}));

MongoClient.connect('mongodb://' + process.env.IP + ':27017/kjmg', function(err, db) {

	if (!err) {
		console.log("Connected to MongoDB");
		app.use(express.static(__dirname + '/public'));

		app.get('/complexContact', function(req, res) {
			db.open(function(err, db) {
				if (!err) {
					db.collection('complexContact').find().toArray(function(err,data) {
						if(!err){
							res.render('complexContact',data);
						}
					});
				}
			});
			//	db.close();

		});
		
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

		app.post('/delete', function(req, res) {

			db.open(function(err, db) {

				if (!err) {

					db.collection('complexContact').remove({
						_id: new mongoDB.ObjectID(req.body.id)
					}, function(err, data) {
						db.collection('complexContact').find().toArray(function(err, data) {
							if (!err) {
								res.send(data);
							}
						});

					});

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
					}, function(err, data) {
						db.collection('complexContact').find().toArray(function(err, data) {
							if (!err) {
								res.send(data);
							}
						});
					});


				}
			});

		});
		app.listen(process.env.PORT);

	}

});
