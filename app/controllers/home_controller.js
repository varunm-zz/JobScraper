var request = require('request');
var keys = require('../../config/keys');
var http = require('http');
var https = require('https');
var url = require('url');

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
	var queryObject = url.parse(req.url, true).query;
	console.log("We are in the return");
	// If there is a 'code' param, we have returned from part A and should move to part b
	res.send("here. The code is " + queryObject.code);

};


exports.post_return = function(req, res) {
	res.send("got to here");
};
