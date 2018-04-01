
const express = require('express');
const app = express();


// middleware
var userPosts = function (req, res, next) {

    
    
    next();
};
app.use('/api/user/:id', userPosts);


app.use('/public', express.static('public'));




const routes = require('./routes.js');
app.use('/', routes);

 
// port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});




