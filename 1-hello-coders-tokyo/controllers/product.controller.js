var db = require('../db');

module.exports.showProduct = function(req, res) {
	var itemPerPage = 12;
	var currentPage = req.query.page || 1;
	var nextPage = parseInt(currentPage) + 1;
	var previousPage = parseInt(currentPage) - 1;

	var numberOfItems = db.get('products').size().value();
	var numberOfPages = (numberOfItems % itemPerPage === 0) ? 
	(numberOfItems / itemPerPage) : (numberOfItems / itemPerPage + 1);

	var firstItem = itemPerPage * currentPage - itemPerPage;
	var firstItemOfNextPage = currentPage * itemPerPage;

	res.render('products/product', {
		products: db.get('products').value().slice(firstItem, firstItemOfNextPage),
		numberOfPages: parseInt(numberOfPages),
		nextPage: nextPage,
		currentPage: currentPage,
		previousPage: previousPage
	});
}