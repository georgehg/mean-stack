var app = require('./config/custom-express')();

app.listen(3001, function() {
	console.log('Credit Card Server running on port 3001');
});



