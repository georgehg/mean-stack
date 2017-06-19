var http = require('http');

var config = {
	hostname: 'localhost',
	port:3000,
	path: '/products',
	method: 'post',
	headers: {
		'Accept': 'application/json',
		'Content-type': 'application/json'
	}
};

var client = http.request(config, function(res) {
	console.log(res.statusCode);
	res.on('data', function(body) {
		console.log('Body: ' + body)
	})
});

var product = {
	titulo: '',
	descricao: 'Node, javascript e HTTP',
	preco: 'Teste'	
};

client.end(JSON.stringify(product));