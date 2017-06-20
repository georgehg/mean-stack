module.exports = function(app) {

	app.post('/cards/authorize', function(req, res) {
		console.log("Processando Pagamento com cartão de crédito");

		var card = req.body;		
		console.log(card);

		req.assert("numero", "Número do Cartão é obrigatório e deve ter 16 caracteres").notEmpty().len(16,16);
		req.assert("bandeira", "Bandeira do Cartão é obrigatória").notEmpty();
		req.assert("ano_de_expiracao", "Ano de expiração do Cartão é obrigatório e deve ter 4 dígitos").notEmpty().len(4,4);
		req.assert("mes_de_expiracao", "Mês de expiração do Cartão é obrigatório e deve ter 2 dígitos").notEmpty().len(2,2);
		req.assert("cvv", "CVV é obrigatório e deve ter 3 caracteres").notEmpty().len(3,3);

		var errors = req.validationErrors();
		if (errors) {
			console.log('Erros de validação encontrados: ' + errors);
			res.status(400).send(errors);
			return;
		}

		card.status = 'AUTORIZADO';
		console.log(card);

		var response = {
			card_data: card			
		}

		res.status(201).json(response);

	});

};