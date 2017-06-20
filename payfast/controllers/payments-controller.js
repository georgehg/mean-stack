module.exports = function(app) {

	//List Payments
	app.get('/payments', function(req, res) {
		console.log('Recebida requisição de pagamentos');

		var connection = app.persistence.connectionFactory();
		var paymentDao = new app.persistence.PaymentDao(connection);

		paymentDao.list(function(error, result) {
			if (error) {
				console.log(error);
				res.status(500).send(error);
			} else {
				res.status(200).json(result);
			}
		});
	});

	// Get Payment By Id
	app.get('/payments/payment/:id', function(req, res) {
		console.log('Recebida requisição de pagamento');

		var connection = app.persistence.connectionFactory();
		var paymentDao = new app.persistence.PaymentDao(connection);

		paymentDao.getById(req.params.id, function(error, result) {
			if (error) {
				console.log(error);
				res.status(500).send(error);
			} else {
				res.status(200).json(result);
			}
		});
	});

	app.post('/payments/payment', function(req, res) {

		req.assert("payment.forma_de_pagamento", 
			"Forma de Pagamento é obrigatório").notEmpty();
		req.assert("payment.valor", 
			"Valor inválido: Não pode ser vazio e deve ser um decimal válido" ).notEmpty().isFloat();

		var errors = req.validationErrors();
		if (errors) {
			console.log('Erros de validação encontrados: ' + errors);
			res.status(400).send(errors);
			return;
		}
		
		console.log("Processing new payment");
		var payment = req.body.payment;
		console.log(payment);

		payment.status = 'CREATED';
		payment.data = new Date;

		var connection = app.persistence.connectionFactory();
		var paymentDao = new app.persistence.PaymentDao(connection);

		paymentDao.save(payment, function(error, result) {

			if (error) {

				console.log(error);
				res.status(500).send(error);

			} else {
				
				payment.id = result.insertId;

				if (payment.forma_de_pagamento == 'cartao') {

					var card = req.body.card;

					var cardFastClient = new app.services.CardFastClient();
					cardFastClient.authorize(card, function(serviceError, serviceReq, serviceResp, serviceResult) {
						
						if (serviceError) {
							console.log(serviceError);
							res.status(400).send(serviceError);
							return;
						}

						console.log('Payment created.');
						
						payment.status = 'CONFIRMADO';
						console.log(payment);

						res.location('payments/payment/' + payment.id);

						var response = {
							payment_data: payment,
							card_authorizaton: serviceResult.card_data,
							links: [
								{
									href: "http://localhost:3000/payments/payment/" + payment.id,
									rel: "confirm",
									method: "PUT"
								},
								{
									href: "http://localhost:3000/payments/payment/" + payment.id,
									rel: "cancel",
									method: "DELETE"
								}
							]
						}

						res.status(201).json(response);
						return;
					});

				}

			}
		});

	});

	app.put('/payments/payment/:id', function(req, res) {
		console.log("Atualizando pagamento");

		var payment = {};
		payment.id = req.params.id;
		payment.status = 'CONFIRMADO';

		var connection = app.persistence.connectionFactory();
		var paymentDao = new app.persistence.PaymentDao(connection);

		paymentDao.update(payment, function(error, result) {
			if (error) {
				console.log(error);
				res.status(500).send(error);
			} else {
				console.log('Payment Updated.');
				res.status(200).json(payment);
			}
		});

	});

	app.delete('/payments/payment/:id', function(req, res) {
		console.log("Atualizando pagamento");

		var payment = {};
		payment.id = req.params.id;
		payment.status = 'CANCELADO';

		var connection = app.persistence.connectionFactory();
		var paymentDao = new app.persistence.PaymentDao(connection);

		paymentDao.update(payment, function(error, result) {
			if (error) {
				console.log(error);
				res.status(500).send(error);
			} else {
				console.log('Payment Canceled.');
				res.status(204);
			}
		});

	});
};