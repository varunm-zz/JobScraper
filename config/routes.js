module.exports = function(app){
	// controllers
	var home = require('../app/controllers/home_controller');
	var posts = require('../app/controllers/posts_controller');
	// routes
	app.get('/', home.index);
	app.post('/search', home.search);
	app.get('/login', home.login);
	app.get('/return', home.return);
	app.post('/return', home.post_return);
	app.get('/posts', posts.index);
	app.get('/jobquery/:id', posts.show);
	app.get('/posts/new', posts.new);
	app.post('/posts', posts.create);
	app.get('/posts/saveFromPost', posts.saveFromShow);
}
