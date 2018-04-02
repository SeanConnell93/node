'use strict';

var express = require('express');
var app = express();
var path = require('path');

// middleware
var userPosts = function userPosts(req, res, next) {

    next();
};
app.use('/api/user/:id', userPosts);

// set template engine

var hbs = require('express-handlebars');

// hbs file extension
app.engine('hbs', hbs({
    extname: 'hbs'
    // defaultLayout: 'index',
}));
app.set('view engine', 'hbs');

var bootstrap = require('/bootstrap/css/bootstrap.min.css');
app.use('/', express.static(bootstrap));

app.use('/public', express.static('public'));

var routes = require('./routes.js');
app.use('/', routes);

// port
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});