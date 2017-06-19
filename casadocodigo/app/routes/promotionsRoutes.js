module.exports = function(app) {

	app.get('/promotions/form', function(req, res) {
		console.log(req.url);

		var connection = app.infra.connectionFactory();
		var products = new app.infra.ProductsDAO(connection);

		products.list(function(err, results) {
			res.render("promotions/form", {list:results});
		});

		connection.end;

	});

	app.post('/promotions', function(req, res, next) {
		console.log(req.url);

		var promotion = req.body;

		console.log(promotion);

		var connection = app.infra.connectionFactory();
		var promotions = new app.infra.PromotionsDAO(connection);
		app.get('io').emit('newPromotion', promotion);
		res.redirect('/promotions/form');
		/*promotions.save(promotion, function(err, results) {

			if (err) {
				console.log(err);
				return next(err);
			}/*

			res.redirect('/promotions');
		/*

		});*/

		connection.end;
	});
}