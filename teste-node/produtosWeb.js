var http = require('http');
var port = 3000;
var ip = "localhost";

var server = http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	if (req.url=="/produtos") {
		res.end('<html><body>Listando os Produtos</body></html>');
	} else {
		res.end('<html><body>Home da Casa do Código</body></html>');
	}
	
});


server.listen(port, ip);

console.log("Server running at http://" + ip + ":" + port + "/");

