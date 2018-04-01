'use strict';

var express = require('express');
var app = express();

// middleware
var userPosts = function userPosts(req, res, next) {

    next();
};
app.use('/api/user/:id', userPosts);

var routes = require('./routes.js');
app.use('/', routes);

// port
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});