var cluster = require('cluster');
var os = require('os');

var cpus = os.cpus();

console.log('executando thread');
if(cluster.isMaster) {
	console.log('thread master');
	cpus.forEach(cluster.fork);

	cluster.on('listening', function(worker) {
		console.log('cluster connected: ' + worker.process.pid);
	});

	cluster.on('exit', worker => {
		console.log('cluster %d desconnected: ', worker.process.pid);
		cluster.fork;
	});

} else {
	console.log('thread slave');
	require('./server.js');

}
