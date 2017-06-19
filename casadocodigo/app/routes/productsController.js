module.exports = function(app) {

	var listProducts = function(req, res, next) {
		console.log(req.url);

		var connection = app.infra.connectionFactory();
		var products = new app.infra.ProductsDAO(connection);

		products.list(function(err, results) {

			if (err) {
				console.log(err);
				return next(err);
			}

			res.format({
				html: function() {
					res.render("products/list", {list:results});
				},
				
				json: function() {
					res.json(results);
				}
			})			
		});

		connection.end;
	};

	app.get('/products', listProducts);

	app.get('/products/form', function(req, res) {
		console.log(req.url);
		res.render("products/form", {validationErrors: {}, product: {}});
	});

	app.post('/products', function(req, res, next) {
		console.log(req.url);

		var product = req.body;

		req.assert('titulo', 'Titulo é obrigatório').notEmpty();
		req.assert('preco', 'Formato numérico inválido').isFloat();
		var errors = req.validationErrors();
		if (errors) {
			res.format({
				html: function() {
					res.status(400).render("products/form", {validationErrors: errors, product: product});
				},
				json: function() {
					res.status(400).json(errors);
				}
			});
			
			return;
		}

		var connection = app.infra.connectionFactory();
		var products = new app.infra.ProductsDAO(connection);

		products.save(product, function(err, results) {

			if (err) {
				console.log(err);
				return next(err);
			}

			res.redirect('/products');

		});

		connection.end;
	});

	app.get('/products/remove', function(req, res) {

		var product = products.load(id, callback);

		if (product) {
			products.remove(connection, product, callback);
		}

	});
}