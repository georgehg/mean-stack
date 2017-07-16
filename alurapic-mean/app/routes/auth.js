module.exports = function(app) {

	var api = app.api.auth;

	app.post('/auth', api.authenticate);
	app.use('/*', api.verifyToken);

}