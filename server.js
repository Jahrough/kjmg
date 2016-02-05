var mongoDB = require("mongodb"),
	MongoClient = mongoDB.MongoClient,
	mongoose = require('mongoose'),
	fs = require('fs'),
	expressHbs = require('express3-handlebars'),
	bodyParser = require('body-parser'),
	express = require("express"),
	app = express();

app.engine('hbs', expressHbs({
	extname: 'hbs',
	defaultLayout: 'complexContact.hbs'
}));


fs.readdirSync(__dirname + '/models').forEach(function(filename) {
	if (~filename.indexOf('.js')) {
		require(__dirname + '/models/' + filename);
	}
});

app.set('view engine', 'hbs');

app.set('views', __dirname + '/views/layouts');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
	extended: true
}));

app.listen(process.env.PORT);

mongoose.connect('mongodb://' + process.env.IP + ':27017/kjmg');


app.get('/contact23', function(req, res) {
	mongoose.model('Contact').find(function(err, contact) {
		if (!err) {
			res.send(contact);
		}
	})

});

/*var c = new Contact({
	name: 'mahesh003',
	phone: '5615438975',
	gender: 'Male'
});*/

/*c.save(function(err) {
	Contact.find({}, function(err, doc) {

	})
});*/


MongoClient.connect('mongodb://' + process.env.IP + ':27017/kjmg', function(err, db) {
	if (!err) {

		var collection = db.collection('complexContact'),

			// SEND UPDATE RESULTS
			display = function(res) {
				return function(err, data) {
					if (!err) {
						/*collection.find().toArray(function(err, data) {
							if (!err) {
								res.send(data);
							}
						});*/
						var cur = collection.find().sort({
							'name': -1
						});
						var dataArr = [];
						while (cur.hasNext()) {
							dataArr.push(cur.next());
						}
						res.send(dataArr);
					}
				};
			};


		// RENDER COMPLEX CONTACT TEMPLATE
		app.get('/complexContact', function(req, res) {
			collection.find().toArray(function(err, docs) {
				if (!err) {
					res.render('complexContact', {
						'complexContact': docs
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
