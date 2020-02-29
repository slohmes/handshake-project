# Handshake project

Created from slohmes/js-sample-app.

### TODO:

- connect and populate database (MySQL)
- add testing framework
- add react (?) or templating engine (?)
- display chirps from DB on index page


### Specifications

Create a web application that fetches two records from a *chirps* database table through a
server endpoint and shows the values of chirps in an HTML page.


#### For your database

Create a database that has a single table called *chirps*.

The *chirps* table should have two columns.
  *id* (primary key)
  *text* (string) - Chirps are plain text posts of 140 characters or less.

Create some sample data
  Create two records in the table:
  __id_|_text_____________________
    1  | this is the first chirp
    2  | this is the second chirp


#### For your web server

Create an endpoint called */index* that reads all the values from the *chirps* table and
outputs the *id* and *text* values in a bulleted list.


#### Verifying it all works

You should have a web server running locally

When a user visits *http://your_web_server:port/index* endpoint, they should see
the following on their web browser (see pdf for format):

Chirps
  1 -- this is the first chirp
  2 -- this is the second chirp

And here is sample HTML:
<html>
  <body>
    <h1>Chirps</h1>
    <ul>
      <li>1 -- this is the first chirp</li>
      <li>2 -- this is the second chirp</li>
    </ul>
  </body>
</html>
