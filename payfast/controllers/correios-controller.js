module.exports = function(app) {

	app.post('/correios/delivery-time', function(req, res) {

		var deliveryData = req.body;

		var correiosClient = new app.services.CorreiosSoapClient();
		correiosClient.calculaPrazo(deliveryData, function(error, result) {
			if (error) {
				console.log(error);
				res.status(500).send(error);
				return;
			} else {
				console.log('Delivery Time calculated');
				res.json(result);
			};
		});

	});



}