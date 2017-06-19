var express = require('express'); //fast server startup
var load = require('express-load'); //request body load
var bodyParser = require('body-parser'); //request body parser
var expressValidator = require('express-validator'); // request body validator

module.exports = function() {
	var app = express();

	app.use(express.static('./app/public'));

	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(expressValidator());

	load('routes', {cwd: 'app'})
		.then('infra')
		.into(app);

	app.use(function(req, res, next) {
		res.status(400).render('errors/404');
		next();
	});

	app.use(function(error, req, res, next) {
		if (process.env.NODE_ENV == "production") {
			res.status(500).render('errors/500');
			return;
		} else {
			next(error);
		}
	});

	return app;
}