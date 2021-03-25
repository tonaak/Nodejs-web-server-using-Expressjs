var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var db = require('./db');

var userRoute = require('./routers/user.router');
var authRoute = require('./routers/auth.router');

var authMiddleware = require('./middlewares/auth.middleware');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index', {
		name: 'AAA'
	});
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(port, function() {
	console.log('Server listening on port ' + port);
});
