var http = require('http');
var app = require('./config/express');

require('./config/database')('192.168.99.100/alurapic');


http.createServer(app).listen(3000, function() {
	console.log("Server up and running on Port 3000");
});