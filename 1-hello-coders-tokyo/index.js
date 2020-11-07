var express = require('express');
var app = express();
var port = 3000;

app.get('/', function(request, response) {
	response.send('<h2>Hello Coders.Tokyo<h2>');
});

app.get('/hello', function(request, response) {
	response.send('Hello World');
});

app.listen(port, function() {
	console.log('Server listening on port ' + port);
});