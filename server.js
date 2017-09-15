// dependencies
var express = require('express');
var mongoose = require('mongoose');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');

// express instance
var app = express();

// express router
var router = express.Router();

// require routes file
require('./config/routes')(router);

// declare port
var port = process.env.PORT || 1337;

// designate public folder as static directory
app.use(express.static(__dirname + "/public"));

// connect handlebars to express app
app.engine('handlebars', expressHandlebars({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// use body parser
app.use(bodyParser.urlencoded({
	extended: false
}));

// have requests go through router middleware
app.use(router);

// if deployed, use deployed database, else use local database
var db = process.env.MONGODB_URI || 'mongodb://localhost/farkHeadlines';

mongoose.connect(db, function(error){
	if(error){
		console.log(error);
	} else {
		console.log('connected to mongoose, bruh');
	}
});

// listen to port
app.listen(port, function(){
	console.log('listening on port: ' + port);
});