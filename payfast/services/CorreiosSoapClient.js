var soap = require('soap');
var logger = require('../services/logger.js')

function CorreiosSoapClient() {
	this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
}

CorreiosSoapClient.prototype.calculaPrazo = function(body, callback) {
	soap.createClient(this._url, function(error, client) {
		logger.info('Client SOAP Created');
		client.CalcPrazo(body, callback);
	});
}

module.exports = function() {
	return CorreiosSoapClient;
}