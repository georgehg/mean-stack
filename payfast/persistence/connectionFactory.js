var mysql = require('mysql');

function createDBConnection() {
	return mysql.createConnection({
		host: '192.168.99.100',
		port: '3306',
		user: 'root',
		password: 'test123',
		database: 'payfast'
	});

};

module.exports = function() {
	return createDBConnection;
}