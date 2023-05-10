const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const { Console } = require('console');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'lee',
    password: 'alien123.com',
    database: 'nodelogin'
});

// testing database connection
connection.connect(function(error){
	if(error) throw error
	else  console.log('************************Successful Database connection************************');
});

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Redirect to the login page when accessing the root URL
app.get('/', function(request, response) {
	response.redirect('/public/login.html');
});

// Serve the login page
app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/login.html'));
});

// Authenticate the user
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exist and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/index.html');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!!!!');
		response.end();
	}
});

// Server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

























/**const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const { Console } = require('console');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'lee',
    password: 'alien123.com',
    database: 'nodelogin'
  });
  // testing database connection
  connection.connect(function(error){
	if(error) throw error
	else  console.log('Success Database connection');
  });

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));
// Serve static files from the public directory
app.use(express.static('public'));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/index.html');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!!!!');
		response.end();
	}
});

// Server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
  */