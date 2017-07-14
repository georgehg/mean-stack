var api = require('../api/foto');

module.exports = function(app) {

	var api = app.api.foto;

	app.get('/v1/fotos', api.list);

	app.get('/v1/fotos/:id', api.getById);

}