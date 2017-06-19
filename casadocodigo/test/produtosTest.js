var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProductController', function(){

	beforeEach(function(done){
		var connection = express.infra.connectionFactory();
		connection.query("delete from produtos", function(err, results) {
			if (!err) {
				done();
			}
		})
	});

	it('#List json', function(done){

		request.get('/products')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, done);

	});

	it('#List html', function(done){

		request.get('/products')
		.set('Accept', 'text/html')
		.expect('Content-Type', /html/)
		.expect(200, done);

	});

	it('#Form products', function(done){

		request.get('/products/form')
		.expect('Content-Type', /html/)
		.expect(200, done);

	});

	it('#Insert products: Titulo inválido', function(done){

		request.post('/products')
		.set('Accept', 'application/json')
		.send({titulo: '', preco:50, descricao: 'Descricao valida'})
		.expect('Content-Type', /json/)
		//.expect(400, done);
		.expect(400, done);

	});

	it('#Insert products', function(done){

		request.post('/products')
		.send({titulo: 'Titulo Teste', preco:50, descricao: 'Descricao valida'})
		//.expect(400, done);
		.expect(302, done);

	});
});