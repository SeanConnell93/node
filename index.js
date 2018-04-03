
const express = require('express');
const app = express();
const path = require('path');

// middleware
var viewMiddleware = function (req, res, next) {

    res.locals.pageTitle = false;
    
    next();
};
app.use('/', viewMiddleware);




// set template engine
const ejs = require('ejs');

app.set('view engine', 'ejs');


// bootstrap css files
app.use('/public', express.static(__dirname + '/node_modules/bootstrap-css-only/css'));

app.use('/public', express.static('public'));




const routes = require('./routes.js');
app.use('/', routes);

 
// port
const port = process.env.PORT || 3000;
const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port ${port}`);
});




