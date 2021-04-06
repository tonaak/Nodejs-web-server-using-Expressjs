var db = require('../db');
var shortid = require('shortid');

module.exports.create = function(req, res, next) {
	res.render('transfer/create', {
		csrfToken: req.csrfToken()
	});
};

module.exports.postCreate = function(req, res, next) {
	var data = {
		id: shortid.generate(),
		accountId: req.body.accountId,
		amount: parseInt(req.body.amount),
		userId: req.signedCookies.userId
	};

	db.get('transfers').push(data).write();
	res.redirect('/transfer/create');
};