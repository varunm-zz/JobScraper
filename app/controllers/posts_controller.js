var post = require('../models/post.js');

// GET /posts
exports.index = function(req, res) {
  res.render('posts/index');
}
