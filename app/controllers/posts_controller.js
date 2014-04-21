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
      req.session.post = results;
      return res.render('posts/show', {'job': results});
    }
  });
}

exports.new = function(req, res) {
  res.render('posts/new');
}

exports.create = function(req, res) {
  post.insert(req.body, function(err, crsr) {
    if(err) {
      console.log("there was an error!");
      res.redirect('/');
    }
    else {
      console.log(req.body);
      console.log(JSON.stringify(crsr));
      res.send("done");
    }
  });
}

exports.saveFromShow = function(req, res) {
  if(req.session && req.session.post) {
    post.insert(req.session.post, function(err, crsr) {
      if(err) {
        req.session.post = undefined;
        console.log('There was an error!');
        res.redirect('/');
      }
      else {
        req.session.post = undefined;
        res.render('/posts/show', {'job': crsr});
      }
    });
  }
}
