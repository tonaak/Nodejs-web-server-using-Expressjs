require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');

var db = require('./db');

var userRoute = require('./routers/user.router');
var authRoute = require('./routers/auth.router');
var productRoute = require('./routers/product.router');
var cartRoute = require('./routers/cart.router');
var transferRoute = require('./routers/transfer.router');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.use(csrf({ cookie: true }));

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index', {
		name: 'AAA'
	});
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);

app.listen(port, function() {
	console.log('Server listening on port ' + port);
});
