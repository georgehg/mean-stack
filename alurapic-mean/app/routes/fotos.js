var api = require('../api/foto');

module.exports = function(app) {

	var api = app.api.foto;

	app.route('/v1/fotos')
		.get(api.list)
		.post(api.add);

	app.route('/v1/fotos/:id')
		.get(api.getById)
		.put(api.update)
		.delete(api.deleteById);

}