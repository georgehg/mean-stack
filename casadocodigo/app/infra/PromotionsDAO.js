function PromotionsDAO(connection) {
	this._connection = connection;
}

PromotionsDAO.prototype.save = function(promotion, callback) {
	this._connection.query('insert into promocoes set ?', promotion, callback);
}

PromotionsDAO.prototype.list = function(callback) {
	this._connection.query('select * from promocoes', callback);
}

PromotionsDAO.prototype.remove = function(callback) {
	this._connection.query('select * from promocoes', callback);
}

module.exports = function() {
	return PromotionsDAO;
}