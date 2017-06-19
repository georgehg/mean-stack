function ProductsDAO(connection) {
	this._connection = connection;
}

ProductsDAO.prototype.save = function(product, callback) {
	this._connection.query('insert into produtos set ?', product, callback);
}

ProductsDAO.prototype.list = function(callback) {
	this._connection.query('select * from produtos', callback);
}

ProductsDAO.prototype.remove = function(callback) {
	this._connection.query('select * from produtos', callback);
}

module.exports = function() {
	return ProductsDAO;
}