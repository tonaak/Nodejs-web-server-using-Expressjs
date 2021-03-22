var express = require('express');
var bodyParser = require('body-parser');

var db = require('./db');

var userRoute = require('./routers/user.router');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index', {
		name: 'AAA'
	});
});

app.use('/users', userRoute);


app.listen(port, function() {
	console.log('Server listening on port ' + port);
});
