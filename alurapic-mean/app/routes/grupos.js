var api = require('../api/grupo');

module.exports = function(app) {

	var api = app.api.grupo;

	app.get('/v1/grupos', api.list);

}