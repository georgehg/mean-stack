var memcached = require('memcached');

module.exports = function() {
	return createMemcachedClient;
}	

function createMemcachedClient() {
	return client = new memcached('192.168.99.100:11211', {
		retries: 10,
		retry: 10000,
		remove: true
	});
}

/*function add(client, key, value, timeout, callback) {
	client.set(key, value, timeout, function(error) {
		if (error) {
			console.log(error);
		} else {
			console.log('ADD - key[' + key + ']: value: ' + JSON.stringify(result));
		}
		callback();
	});
}

function hit(client, key, callback) {
	client.get(key, function(error, result)y {
		if (error || !result) {
			console.log('MISS - key[' + key + '] not found');
		} else {
			console.log('HIT - key[' + key + ']: value: ' + JSON.stringify(result));
		}
		callback();
	});
}*/

