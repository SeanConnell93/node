
const express = require('express');
const app = express();
const routes = express.Router();

// all route controllers
const routeCtrl = require('./routesCtrl');




routes.get('/', routeCtrl.homeCtrl);

routes.get('/api/:post?', routeCtrl.apiCtrl);

routes.get('/api/user/:id', routeCtrl.userPostsCtrl);



module.exports = routes;