var express = require('express');
var http = require('http');
var util = require('util');
var api_keys = require(__dirname + '/config/keys');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'cmuis272' }));
app.use(app.router);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
require('./config/routes')(app);
app.use(express.logger());
app.use(express.methodOverride());

// API keys and such
var LINKEDIN_API_KEY = api_keys.api_key;
var LINKEDIN_SECRET_KEY = api_keys.secret_key;

console.log('listening on port 3000');
console.log('local mongo database listening at 127.0.0.1');
app.listen(3000);
