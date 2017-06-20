var restify = require('restify');

function CardfastClient() {
	this._client = restify.createJsonClient({
		url:  'http://localhost:3001'
	});	
}

CardfastClient.prototype.authorize = function(card, callback) {
	var uri = '/cards/authorize';
	this._client.post(uri, card, callback);	
}

module.exports = function() {
	return CardfastClient;
}