exports.index = function(req, res) {
	res.render('index');
}

exports.search = function(req, res) {
	var title = req.params.title;
	res.render('searchResults', {'title': title});
}

exports.test = function(req, res) {
	res.render('test');
}