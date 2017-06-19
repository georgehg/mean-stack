var http = require('http');

var config = {
	hostname: 'localhost',
	port:3000,
	path: '/products',
	headers: {
		Accept: 'application/json'
	}
};

http.get(config, function(res) {
	console.log(res.statusCode);
	res.on('data', function(body) {
		console.log('Body: ' + body)
	})
})