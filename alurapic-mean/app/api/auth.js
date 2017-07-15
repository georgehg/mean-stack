module.exports = function(app) {

	var mongoose = require('mongoose');
	var jwt = require('jsonwebtoken');


	var api = {};
	var model = mongoose.model('User');

	api.authenticate = function(req, res) {

		model
			.findOne({login: req.body.login, senha: reqw.body.senha})
			.then(
				function(user) {
					if (!user) {
						console.log("Login e Senha inválidos!");
						res.sendStatus(401);
					} else {
						console.log("Usuário "+ user + " autenticado");

						var token = jwt.sign(user.login, app.get('secret'),{
							expiresIn: 84600
						});

						console.log("Token created: " + token);

						res.set('x-access-token', token);
						res.end;

					}

				}, function(error) {
					console.log("Login e Senha inválidos!");
					res.sendStatus(401);
				}
			);

	};

	api.verifyToken = function(req, res, next) {

		var token = req.headers['x-access-token'];

		if (token) {

			console.log("Verifying token: " + token);

			jwt.verify(token, app.get('secret'),
				function(err, decoded){
					if (err) {
						console.log("Token rejeitado");
						res.sendStatus(403);
					}

					req.user = decoded;
					next();
				}
			);
		} else {
			console.log("Token not set");
			res.sendStatus(403);
		}

	};

	return api;

}