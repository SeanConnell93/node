'use strict';

var express = require('express');
var app = express();
var routes = express.Router();

// all route controllers
var routeCtrl = require('./routesCtrl');

routes.get('/', routeCtrl.homeCtrl);

routes.get('/api/:post?', routeCtrl.apiCtrl);

routes.get('/api/user/:id', routeCtrl.userPostsCtrl);

module.exports = routes;