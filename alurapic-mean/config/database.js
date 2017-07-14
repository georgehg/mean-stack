module.exports = function(uri) {

	var mongoose = require('mongoose');

	mongoose.connect('mongodb://' + uri);

	mongoose.connection.on('connected', function() {
		console.log("Connectado ao Mongo");
	});

	mongoose.connection.on('disconnected', function() {
		console.log("Desconectando do Mongo...");
	});


	mongoose.connection.on('error', function(error) {
		console.log('Erro durante a conexão: ' + error);
	});

	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log("Conexáo com Mongo finalizada.");
			process.exit(0);
		});
	});

}