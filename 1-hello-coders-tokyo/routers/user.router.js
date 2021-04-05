var express = require('express');
var multer  = require('multer');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var router = express.Router(); 

var upload = multer({ dest: './public/uploads/' }) ;

router.get('/', controller.index);

router.get('/cookie', function(req, res, next) {
	res.cookie('user-id', 12345);
	res.send('Hello');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.id);

router.post('/create',
	upload.single('avatar'), 
	validate.postCreate,
	controller.postCreate);

module.exports = router;