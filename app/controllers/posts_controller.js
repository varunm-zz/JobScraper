var post = require('../models/post.js');
var request = require('request');
var async = require('async');

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

// renders the new post page, not necessary but will still have it for development purposes
exports.new = function(req, res) {
  res.render('posts/new');
}

// creates a new post not necessary but will still have it for development purposes
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

// saves a post from the post show page
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
        console.log(crsr);
        console.log(JSON.stringify(crsr));
        res.render('saved/show', {'job': crsr[0]});
      }
    });
  }
}

// renders the show page with a post that is in the mongo db
exports.showFromSaved = function(req, res) {
  post.showFromSaved(req.param('id'), function(err, docs) {
    return res.render('saved/show', {'job': docs});
  });
}

/*
 * Save jobs from the search result page
 */
exports.saveFromResults = function(req, res) {
  var jobId = req.params.id;
  var request_uri = "https://api.linkedin.com/v1/jobs";
  request_uri += '/' + jobId;
  request_uri += ":(id,customer-job-code,active,posting-date,expiration-date,posting-timestamp,company:(id,name),position:(title,location,job-functions,industries,job-type,experience-level),skills-and-experience,description-snippet,description,salary,job-poster:(id,first-name,last-name,headline),referral-bonus,site-job-url,location-description)";
  request_uri += "?format=json&oauth2_access_token=" + req.session.oauth_token;
  request(request_uri, function(error, response, body) {
    if(error) {
      console.log('there is/was an error!');
      return res.render('posts/show', {'error': error, 'job': undefined});
    }
    else {
      var results = JSON.parse(body);
      post.insert(results, function(err, crsr) {
        if(err) {
          console.log('there was an error!');
          return res.redirect('back');
        }
        return res.render('posts/show', {'job': results});
      });
    }
  });

}

/*
 * send a search request and save all responses
 */
exports.requestAndSave = function(req, res) {
  var title = req.session.title;
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
      async.each(results.jobs.values, function(oneJob, innerCallback) {
        savePost(oneJob.id, function() {
          setTimeout(innerCallback, 10000);
        });
      }, function(asyncError) {
        if(asyncError) {
          console.log('async error saving posts');
        }
        else {
          console.log('posts finished saving');
        }
      });
    }
  });
  return res.send('here');
}

/*
 * save a post one at a time
 */
var savePost = function(linkedInId, done) {
  var request_uri = "https://api.linkedin.com/v1/jobs";
  request_uri += '/' + jobId;
  request_uri += ":(id,customer-job-code,active,posting-date,expiration-date,posting-timestamp,company:(id,name),position:(title,location,job-functions,industries,job-type,experience-level),skills-and-experience,description-snippet,description,salary,job-poster:(id,first-name,last-name,headline),referral-bonus,site-job-url,location-description)";
  request_uri += "?format=json&oauth2_access_token=" + req.session.oauth_token;
  request(requst_uri, function(error, response, body) {
    if(error) {
      console.log('there is an error!');
    }
    else {
      post.insert(results, function(postError, saved) {
        if(postError) {
          console.log('error inserting post');
        }
        else {
          console.log('post successfully inserted');
          done();
        }
      });
    }
  });
}
