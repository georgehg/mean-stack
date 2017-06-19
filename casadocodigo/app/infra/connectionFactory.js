var mysql = require('mysql');

// Connection Factory
function createDBConnection() {

	if (process.env.NODE_ENV == "production") {
		return mysql.createConnection({
			host: '192.168.99.100',
			port: '3306',
			user: 'root',
			password: 'test123',
			database: 'casadocodigo_nodejs' 
		});
	}

	if (process.env.NODE_ENV == "test") {
		return mysql.createConnection({
			host: '192.168.99.100',
			port: '3306',
			user: 'root',
			password: 'test123',
			database: 'casadocodigo_nodejs_test' 
		});
	}
}

//wrapper
module.exports = function() {
	return createDBConnection;
}