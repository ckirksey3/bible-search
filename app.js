/**
 * Module dependencies.
 */

var express = require('express')
var http = require('http')
var path = require('path')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

var bibleApi = require('./bible_api.js')
var bibleApiInstance = new bibleApi()

// the ExpressJS App
var app = express()

// configuration of expressjs settings for the web server.

// server port number
app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

/**
 * CORS support for AJAX requests
 */

app.all('*', function(req, res, next){
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

// ROUTES, logic is in routes/index.js

var routes = require('./routes/index.js');


// home route is not really an API route, but does respond back
app.get('/', routes.index); // calls index function in /routes/index.js

// API routes
app.post('/api/create', routes.create); // API create route and callback (see /routes/index.js)
app.get('/api/get', routes.getAll); // API retrieve all route and callback (see /routes/index.js)
app.post('/api/update/:id', routes.update); // API update route and callback (see /routes/index.js)
app.get('/api/delete/:id', routes.remove); // API delete route and callback (see /routes/index.js)

// create NodeJS HTTP server using 'app'
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

bibleApiInstance.getPassage('Luke', '1', '5', '8', function logResult(err, result) {
	console.log(result)
})