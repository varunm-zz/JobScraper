module.exports = function(app){
	// controllers
	var home = require('../app/controllers/home_controller');
	
	// routes
	app.get('/', home.index);
	app.post('/search', home.search);
}
