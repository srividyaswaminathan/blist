//require the necessary modules

var express = require('express'),
	bodyParser = require('body-parser'),
	cookieSession = require('cookie-session'),
	root = __dirname,
	app = express(),
	path = require('path');

//set up static files	
app.use(express.static(path.join(root, '../client')));
app.use(express.static(path.join(root,'.././bower_components')));
app.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))


var routes = require('./config/routes');
routes(app);

// // Establish connection to DB
require('./config/db');


//listen to required port (check on the port before deployment)
app.listen(5000, function(){
	console.log("listening on port 5000");
})