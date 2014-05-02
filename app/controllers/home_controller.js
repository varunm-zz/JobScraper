var request = require('request');
var keys = require('../../config/keys');
// these should be included in node, so they're not in package.json
var http = require('http');
var https = require('https');
var url = require('url');

exports.index = function(req, res) {
	res.render('index', {token: req.session.oauth_token});
};

exports.search = function(req, res) {
	// replaces spaces with %20 for the API call
	var title = req.body.title.replace(" ", "%20");
	request("https://api.linkedin.com/v1/job-search?job-title=" + title + "&sort=R&format=json&oauth2_access_token=" + req.session.oauth_token, function(error, response, body) {
		if(error) {
			console.log("error with request: " + error);
			// sending the title from the body because it is not modified from what was sent to this action
			return res.render('searchResults', {'title': req.body.title});
		}
		else {
			// sending the title from the body because it is not modified from what was sent to this action
			var results = JSON.parse(body);
			return res.render('searchResults', {'title': req.body.title, 'results': results.jobs.values});
		}
	});
};

exports.login = function(req, res) {
	var client_id = keys.api_key;
	var state = keys.state;
	var redirect_uri = "http://162.243.14.83:3000/return";
	var auth_url = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id="+client_id+"&state="+state+"&redirect_uri="+redirect_uri;
	return res.redirect(auth_url);
};

exports.return = function(req, res) {
	var queryObject = url.parse(req.url, true).query;
	var code = queryObject.code;
	// If there is a 'code' param, we have returned from part A and should move to part b
	// res.send("here. The code is " + code);
	if(code) {
		// we need to make one more call to LinkedIn
		var redirectURL = "http://162.243.14.83:3000/return";
		var APIKey = keys.api_key;
		var APIKeySecret = keys.secret_key;
		var options = {
			host: 'api.linkedin.com',
			port: 443,
			path: "/uas/oauth2/accessToken?grant_type=authorization_code&code=" + code + "&redirect_uri=" + callbackURL + "&client_id=" + APIKey + "&client_secret=" + APIKeySecret
		};
		var httpRequest = https.request(options, function(httpResponse) {
			httpResponse.on('data', function(d) {
				var access_token = JSON.parse(d).access_token;
				req.session.oauth_token = access_token;
				return res.redirect("/");
			});
		});
		httpRequest.end();
	}
	else {
		// shouldn't get here but I'll keep it
		res.send("got it");
	}
};


exports.post_return = function(req, res) {
	res.send("got to here");
};
