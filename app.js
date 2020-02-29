"use strict";

var express = require('express');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);

// index page
app.get('/index', function(request, response) {
	response.type('text/html');
	response.sendFile(path.join(__dirname+'/src/index.html'));
});

// 404
app.use(function(request, response) {
	response.type('text/plain');
	response.status(404);
	response.send('404 - Not Found');
});

// 500
app.use(function(error, request, response, next) {
	console.error(error.stack);
	response.type('text/plain');
	response.status(500);
	response.send('500 - Server Error');
});

app.listen(app.get('port'), function () {
	console.log('App is running at http://localhost:' + app.get('port') + '/index; press Ctrl + c to terminate.');

});
