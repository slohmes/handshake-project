"use strict";

const express = require('express');
const mysql = require('mysql');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// index page
app.get('/index', (req, res) => {
	const chirp_data = [{id: 1, text: 'first cheep'}, {id: 2, text: 'second cheep'}];

	// credentials would ideally be set via env vars instead.
	const con = mysql.createConnection({
	  host: "localhost",
	  user: "chirpsAdmin",
	  password: "dataBird",
	  database: "chirps"
	});

	con.connect((err) => {
	  if (err) throw err;
	  console.log("Connected!");
	});

	con.end((err) => {
	  console.log(err);
	});
	res.render('index', {chirps: chirp_data});
});

// 404
app.use((req, res) => {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

// 500
app.use((error, req, res, next) => {
	console.error(error.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(app.get('port'), () => {
	console.log('App is running at http://localhost:' + app.get('port') + '/index; press Ctrl + c to terminate.');
});
