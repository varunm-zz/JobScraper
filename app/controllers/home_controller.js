var request = require('request');
var keys = require('../../config/keys');
exports.index = function(req, res) {
	res.render('index');
};

exports.search = function(req, res) {
	res.render('searchResults', {'title': req.body.title});
};

exports.login = function(req, res) {
	var client_id = keys.api_key;
	var state = keys.state;
	var redirect_url = 'http://localhost:3000/return';
	var auth_url = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id="+client_id+"&state="+state+"&redirect_uri="+redirect_url;
	return res.redirect(auth_url);
};

exports.return = function(req, res) {
	// I don't think this always works... I don't know why. But 4 in a row is enough for a commit
	var redirect_url = 'http://localhost:3000/gotKey';
	var client_id = keys.api_key;
	var client_secret = keys.secret_key;
	var code = req.param('code');
	var post_url = "https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code="+code+"&redirect_uri="+redirect_url+"&client_id="+client_id+"&client_secret="+client_secret;
	// need to send a post request to this url and listen for a response ^
};

exports.gotKey = function(req, res) {
	res.send("got to here");
};
