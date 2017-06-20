function PaymentDao(connection) {
	this._connection = connection;
}

PaymentDao.prototype.save = function(payment, callback) {
	this._connection.query('insert into payments set ?', payment, callback);
}

PaymentDao.prototype.update = function(payment, callback) {
	this._connection.query('update payments set status = ? where id = ?', [payment.status, payment.id], callback);
}

PaymentDao.prototype.list = function(callback) {
	this._connection.query('select * from payments', callback);
}

PaymentDao.prototype.getById = function(id, callback) {
	this._connection.query('select * from payments where id = ?', [id], callback);
}

PaymentDao.prototype.remove = function(id, callback) {
	this._connection.query('delete from payments where id = ?', [id], callback);
}

module.exports = function() {
	return PaymentDao;
}