
const express = require('express');
const app = express();
const routes = express.Router();

// all route controllers
const routeCtrl = require('./routesCtrls');


routes.get('/', (req, res) => {
  res.render('index');
});


routes.get(['/api/post/:post?', '/post/:post?'], routeCtrl.allPostsCtrl);

routes.get(['/api/post/user/:id', '/post/user/:id'], routeCtrl.userPostsCtrl);



module.exports = routes;