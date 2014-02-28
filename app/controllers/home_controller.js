var request = require('request');
var passport = require('passport');
exports.index = function(req, res) {
	res.render('index', {user: req.user, 'token': passport.session.token, 'secret': passport.session.secret });
}

exports.search = function(req, res) {
	var title = req.body.title;
	var token = passport.session.token;
	var url = 'https://api.linkedin.com/v1/people/~?oauth2_access_token=' + token;
	request(url, function(err, response, body) {
		res.render('searchResults', {'title': title, 'body': body});
	});
}

exports.test = function(req, res) {
	res.render('test');
}