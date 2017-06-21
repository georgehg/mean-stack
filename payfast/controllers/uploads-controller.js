var fs = require('fs');

module.exports = function(app) {

	app.post('/upload/image', function(req, res) {

		console.log('Receiving image streaming');

		var filename = req.headers.filename;

		req.pipe(fs.createWriteStream('files/' + filename ))
			.on('finish', function() {
				console.log('File loaded');
				res.status(201).send();
			});
	});

}