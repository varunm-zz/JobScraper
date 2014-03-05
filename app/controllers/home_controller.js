var request = require('request');
var passport = require('passport');
var keys = require('../../config/keys');
exports.index = function(req, res) {
	res.render('index', {user: req.user, 'token': passport.session.token, 'secret': passport.session.secret });
}

exports.search = function(req, res) {
	var title = req.body.title;
	var token = passport.session.token;
	var key = keys.api_key;
	request("http://api.linkedin.com/v1/people/~?format=json&oauth_consumer_key=" + key + "&oauth_nonce=1234&oauth_signature=68pmwRNPzWGnAAW6hUL3jvl48nw%3D&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1393998136&oauth_token="+ token +"&oauth_version=1.0", function(err, response, body) {
		res.render('searchResults', {'title': title, 'body': body});
	});
}

exports.test = function(req, res) {
	res.render('test');
}