var api = {};

var fotos = [
	{_id: 1, titulo: 'Leão1', url: 'http://www.fundosanimais.com/Minis/par-leoes.jpg'},
	{_id: 2, titulo: 'Leão2', url: 'http://www.fundosanimais.com/Imagens/leao-por-do-sol.jpg'}
]

api.list = function(req, res) {

	res.json(fotos);

};

api.getById = function(req, res) {

	var foto = fotos.find(function(foto) {
		return foto._id == req.params.id;
	});

	res.json(foto);
};

module.exports = api;