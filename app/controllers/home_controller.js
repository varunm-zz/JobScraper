var request = require('request');
var keys = require('../../config/keys');
exports.index = function(req, res) {
	res.render('index');
};

exports.search = function(req, res) {
	res.render('searchResults', {'title': req.body.title});
};
