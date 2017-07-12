var logger = require('../services/logger.js')

const PAGAMENTO_CRIADO = "CREATED";
const PAGAMENTO_CONFIRMADO = "CONFIRMED";
const PAGAMENTO_CANCELADO = "CANCELED";
const PAYMENT_CACHE_TOKEN = "payment-";

module.exports = function(app) {

	//List Payments
	app.get('/payments', function(req, res) {
		logger.info('Recebida requisição de pagamentos');

		var connection = app.persistence.connectionFactory();
		var paymentDao = new app.persistence.PaymentDao(connection);

		paymentDao.list(function(error, result) {
			if (error) {
				logger.info(error);
				res.status(500).send(error);
			} else {
				res.status(200).json(result);
			}
		});
	});

	// Get Payment By Id
	app.get('/payments/payment/:id', function(req, res) {

		logger.info('Recebida requisição de pagamento');

		var id = req.params.id;

		var memcachedClient = app.services.memcachedClient();
		var key = PAYMENT_CACHE_TOKEN + id;

		memcachedClient.get(key, function(error, result) {
			if (error || !result) {
				logger.info('MISS - key[' + key + '] not found');

				//Getting from the Database
				var connection = app.persistence.connectionFactory();
				var paymentDao = new app.persistence.PaymentDao(connection);

				paymentDao.getById(id, function(error, result) {
					if (error) {
						logger.info(error);
						res.status(500).send(error);
					} else {
						res.status(200).json(result);
					}
				});

			} else {
				logger.info('HIT - key[' + key + ']: value: ' + JSON.stringify(result));
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
			logger.info('Erros de validação encontrados: ' + errors);
			res.status(400).send(errors);
			return;
		}
		
		logger.info("Processing new payment");
		var payment = req.body.payment;
		logger.info(payment);

		payment.status = PAGAMENTO_CRIADO;
		payment.data = new Date;

		var connection = app.persistence.connectionFactory();
		var paymentDao = new app.persistence.PaymentDao(connection);

		paymentDao.save(payment, function(error, result) {

			if (error) {

				logger.info(error);
				res.status(500).send(error);

			} else {
				
				payment.id = result.insertId;

				var memcachedClient = app.services.memcachedClient();
				var key = PAYMENT_CACHE_TOKEN + payment.id;
				memcachedClient.set( key, payment, 60000
					, function(error) {
						if (error) {
							logger.info(error);
						} else {
							logger.info('ADD - key[' + key + ']: value: ' + JSON.stringify(result));
						}						
				});
				//memcachedclient.set('payment-' + payment.id, payment, 6000);

				var response = {
					payment_data: payment,
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

				if (payment.forma_de_pagamento == 'cartao') {

					var card = req.body.card;

					var cardFastClient = new app.services.CardFastClient();
					cardFastClient.authorize(card, function(serviceError, serviceReq, serviceResp, serviceResult) {
						
						if (serviceError) {
							logger.info(serviceError);
							res.status(400).send(serviceError);
							return;
						}

						logger.info('Payment created.');
						
						payment.status = PAGAMENTO_CONFIRMADO;
						logger.info(payment);

						res.location('payments/payment/' + payment.id);	

						response.card_authorizaton = serviceResult.card_data;

						res.status(201).json(response);
						return;
					});

				} else {

					res.status(201).json(response);
					return;

				}

			}
		});

	});

	app.put('/payments/payment/:id', function(req, res) {
		logger.info("Atualizando pagamento");

		var payment = {};
		payment.id = req.params.id;
		payment.status = PAGAMENTO_CONFIRMADO;

		var connection = app.persistence.connectionFactory();
		var paymentDao = new app.persistence.PaymentDao(connection);

		paymentDao.update(payment, function(error, result) {
			if (error) {
				logger.info(error);
				res.status(500).send(error);
			} else {
				logger.info('Payment Updated.');

				var memcachedClient = app.services.memcachedClient();
				var key = PAYMENT_CACHE_TOKEN + payment.id;
				memcachedClient.set( key, payment, 60000
					, function(error) {
						if (error) {
							logger.info(error);
						} else {
							logger.info('UPDATE - key[' + key + ']: value: ' + JSON.stringify(result));
						}						
				});


				res.status(200).json(payment);
			}
		});

	});

	app.delete('/payments/payment/:id', function(req, res) {
		logger.info("Atualizando pagamento");

		var payment = {};
		payment.id = req.params.id;
		payment.status = PAGAMENTO_CANCELADO;

		var connection = app.persistence.connectionFactory();
		var paymentDao = new app.persistence.PaymentDao(connection);

		paymentDao.update(payment, function(error, result) {
			if (error) {
				logger.info(error);
				res.status(500).send(error);
			} else {
				logger.info('Payment Canceled.');

				var memcachedClient = app.services.memcachedClient();
				var key = PAYMENT_CACHE_TOKEN + payment.id;
				memcachedClient.set( key, payment, 60000
					, function(error) {
						if (error) {
							logger.info(error);
						} else {
							logger.info('UPDATE - key[' + key + ']: value: ' + JSON.stringify(result));
						}						
				});

				res.status(204).send(result);
			}
		});

	});
};