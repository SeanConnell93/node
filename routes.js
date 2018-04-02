
const express = require('express');
const app = express();
const routes = express.Router();

// all route controllers
const routeCtrl = require('./routesCtrl');





routes.get(['/api/:post?', '/:post?'], routeCtrl.allPostsCtrl);

routes.get(['/api/user/:id', '/user/:id'], routeCtrl.userPostsCtrl);




module.exports = routes;