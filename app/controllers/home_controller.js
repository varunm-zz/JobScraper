var request = require('request');
var passport = require('passport');
exports.index = function(req, res) {
	res.render('index', {user: req.user, 'token': passport.session.token, 'secret': passport.session.secret });
}

exports.search = function(req, res) {
	var title = req.body.title;
	var token = passport.session.token;
	request("http://api.linkedin.com/v1/people/~?oauth_consumer_key=77qzfiyj0v0508&oauth_nonce=1234&oauth_signature=NNgSQiDQ3AW46lciApaL4lR5nSI%3D&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1393875199&oauth_token=6fc8f6cd-3fba-4b9c-b9cf-4a2f1ab33262&oauth_version=2.0", function(err, response, body) {
		res.render('searchResults', {'title': title, 'body': body});
	});
}

exports.test = function(req, res) {
	res.render('test');
}