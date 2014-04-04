var post = require('../models/post.js');

/*
 * GET /posts, list all of them
 */
exports.index = function(req, res) {
  post.getAll(function(docs) {
    res.render('posts/index', {posts: docs});
  });
}
