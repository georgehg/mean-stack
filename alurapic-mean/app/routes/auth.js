module.exports = function(app) {

	var api = app.api.auth;

	app.get('/auth', api.authenticate);
	app.use('/*', api.verifyToken);

}