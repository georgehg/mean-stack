var logger = require('../services/logger.js')

module.exports = function(app) {

	app.post('/correios/delivery-time', function(req, res) {

		var deliveryData = req.body;

		var correiosClient = new app.services.CorreiosSoapClient();
		correiosClient.calculaPrazo(deliveryData, function(error, result) {
			if (error) {
				logger.info(error);
				res.status(500).send(error);
				return;
			} else {
				logger.info('Delivery Time calculated');
				res.json(result);
			};
		});

	});



}