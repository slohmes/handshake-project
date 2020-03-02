"use strict";

const mysql = require('mysql');

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
