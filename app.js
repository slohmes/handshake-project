"use strict";

const express = require('express');
const mysql = require('mysql');
const https = require('https');

let app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({ extended: true }));

// index page
const getChirpsSql = 'SELECT * FROM chirps ORDER BY id DESC';

const notificationEndpoint = 'https://bellbird.joinhandshake-internal.com/push';

app.get('/index', (req, res) => {
	let chirps = [];
	connection.query(getChirpsSql, (err, rows) => {
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

app.post('/create', (req, res) => {
	const newChirp = {text: req.body.text}; // this user input should be escaped, for safety
	connection.query('INSERT INTO chirps SET ?', newChirp, (err, conRes) => {
	  if (err) throw err;
	  console.log('Inserted new chirp with ID:', conRes.insertId);
		res.redirect('index');

		const data = JSON.stringify({
		  chirp_id: conRes.insertId
		})

		const options = {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
		    'Content-Length': data.length
		  }
		}
		const req = https.request(notificationEndpoint, options, (res) => {
			console.log(`statusCode: ${res.statusCode}`);
		});
		req.on('error', (e) => {
		  console.error(`problem with request: ${e.message}`);
		});

		req.write(data);
		req.end();

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

let connection = mysql.createConnection({
	host: 'localhost',
	// ideally, these would be set via env vars...
	user: 'chirpsAdmin',
	password: 'dataBird',
	database: 'chirps'
});

connection.connect(err => {
	if (err) throw err;
	app.listen(app.get('port'), () => {
		console.log('App is running at http://localhost:' + app.get('port') + '/index; press Ctrl + c to terminate.');
	});
});
