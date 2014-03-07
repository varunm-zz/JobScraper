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
	var redirect_uri = 'http://localhost:3000/return';
	var auth_url = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id="+client_id+"&state="+state+"&redirect_uri="+redirect_uri;
	return res.redirect(auth_url);
};

exports.return = function(req, res) {
		var redirect_uri = 'http://localhost:3000/return';
		var client_id = keys.api_key;
		var client_secret = keys.secret_key;
		var code = req.param('code');
		// this is driving me crazy. I don't understand how this is supposed to work.
		// I am quite literally copying things from their website and trying it and it fails.
		// client_id and secret are copied from the developer page. The redirect uri is specified on the developer page as well.
		// the code they give me is the code I send back, and I copied the post request from the how to authenticate article and
		// it does not work. I don't think there is any more I can do.

		// here I just put every option in as a parameter
		var post_uri = "https://www.linkedin.com/uas/oauth2/accessToken?grant_type=authorization_code&code=" + code + "&redirect_uri=" + redirect_uri + "&client_id=" + client_id + "&client_secret=" + client_secret;
		// this gives me this error: {"error":"invalid_request","error_description":"missing required parameters, includes an invalid parameter value, parameter more then once. : Unable to retrieve access token : appId or redirect uri does not match authorization code or authorization code expired"}
		// and here I try to put it in as a form body for a post request
		// var post_uri = "https://www.linkedin.com/uas/oauth2/accessToken"
		// request({
		// 	uri: post_uri,
		// 	method: 'POST',
		// form: {
		// 		grant_type: "authorization_code",
		// 		code: code,
		// 		redirect_uri: redirect_uri,
		// 		client_id: client_id,
		// 		client_secret: client_secret
		//   },
		// }, function(err, response, body) {
		// 	if(err) {
		// 		console.log("You got an error");
		// 	}
		// 	else {
		// 		res.send(body);
		// 	}
		// });
		// with this I get the error: {"error":"invalid_request","error_description":"missing required parameters, includes an invalid parameter value, parameter more then once. : Unable to retrieve access token : appId or redirect uri does not match authorization code or authorization code expired"}
};

exports.post_return = function(req, res) {
	res.send("got to here");
};
