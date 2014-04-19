var post = require('../models/post.js');
var request = require('request');

/*
 * GET /posts, list all of them
 */
exports.index = function(req, res) {
  post.getAll(function(docs) {
    res.render('posts/index', {posts: docs});
  });
}

/*
 * GET /postquery/:id, gets all of the details for a post
 */
exports.show = function(req, res) {
  var jobId = req.params.id;
  var request_uri = "https://api.linkedin.com/v1/jobs";
  request_uri += '/' + jobId;
  request_uri += ":(id,customer-job-code,active,posting-date,expiration-date,posting-timestamp,company:(id,name),position:(title,location,job-functions,industries,job-type,experience-level),skills-and-experience,description-snippet,description,salary,job-poster:(id,first-name,last-name,headline),referral-bonus,site-job-url,location-description)";
  request_uri += "?format=json&oauth2_access_token=" + req.session.oauth_token;
  console.log('request_uri is ' + request_uri);
  request(request_uri, function(error, response, body) {
    if(error) {
      console.log('there is/was an error!');
      return res.render('posts/show', {'error': error, 'job': undefined});
    }
    else {
      var results = JSON.parse(body);
      return res.render('posts/show', {'job': results});
    }
  });
}
