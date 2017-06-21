var soap = require('soap');

function CorreiosSoapClient() {
	this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
}

CorreiosSoapClient.prototype.calculaPrazo = function(body, callback) {
	soap.createClient(this._url, function(error, client) {
		console.log('Client SOAP Created');
		client.CalcPrazo(body, callback);
	});
}

module.exports = function() {
	return CorreiosSoapClient;
}