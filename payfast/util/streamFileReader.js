var fs = require('fs');

fs.createReadStream('image.jpg')
	.pipe(fs.createWriteStream('imageStreamed.jpg'))
	.on('finish', function() {
		console.log('Arquivo escrito com stream.');
	});