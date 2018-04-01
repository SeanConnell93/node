
const express = require('express');
const app = express();


// middleware
var myLogger = function (req, res, next) {
    console.log('before sending');
    next();
};
app.use('/api/user/:id', myLogger);




const routes = require('./routes.js');
app.use('/', routes);

 
// port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});




