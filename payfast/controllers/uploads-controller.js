var fs = require('fs');
var logger = require('../services/logger.js')

module.exports = function(app) {

	app.post('/upload/image', function(req, res) {

		logger.info('Receiving image streaming');

		var filename = req.headers.filename;

		req.pipe(fs.createWriteStream('files/' + filename ))
			.on('finish', function() {
				logger.info('File loaded');
				res.status(201).send();
			});
	});

}