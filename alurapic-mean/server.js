var http = require('http');
var app = require('./config/express');


http.createServer(app).listen(3000, function() {
	console.log("Server up and running on Port 3000");
});