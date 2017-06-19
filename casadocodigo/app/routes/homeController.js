module.exports = function(app) {

	app.get('/', function(req, res) {
		console.log(req.url);

		var connection = app.infra.connectionFactory();
		var products = new app.infra.ProductsDAO(connection);

		products.list(function(err, results) {
			res.render("home/index", {livros:results});
		});

		connection.end;

	});
}