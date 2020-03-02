"use strict";

const express = require('express');
const mysql = require('mysql');

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'chirpsAdmin',
	password: 'dataBird',
	database: 'chirps'
});

connection.connect();

let app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// index page
app.get('/index', (req, res) => {
	let chirps = [];
	connection.query('SELECT * FROM chirps', (err, rows) => {
	  if (err) throw err;
		rows.forEach((row) => {
			chirps.push({
	      'id': row.id,
	      'text': row.text
	    });
		});
		res.render('index', {'chirps': chirps});
	});

});

// 404
app.use((req, res) => {
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

// 500
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(app.get('port'), () => {
	console.log('App is running at http://localhost:' + app.get('port') + '/index; press Ctrl + c to terminate.');
});
