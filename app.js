var express = require('express');
var app = express();
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
require('./config/routes')(app);

console.log('listening on port 3000');
app.listen(3000);