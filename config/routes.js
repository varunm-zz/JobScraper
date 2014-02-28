module.exports = function(app){
	// controllers
	var home = require('../app/controllers/home_controller');

	// passport
	var passport = require('passport');
	// routes
	app.get('/', home.index);
	app.post('/search', home.search);
	app.get('/test', home.test);

	// GET /auth/linkedin
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in LinkedIn authentication will involve
	//   redirecting the user to linkedin.com.  After authorization, LinkedIn will
	//   redirect the user back to this application at /auth/linkedin/callback
	app.get('/auth/linkedin', passport.authenticate('linkedin'), function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
	});

	app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

  app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});
}