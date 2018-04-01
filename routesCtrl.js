
const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const db = './db.json';


function apiCtrl(req, res) {

    // send back post number
    if (req.params.post && Number(req.params.post) ) {
        
        fs.readFile(db, (err, data) => {
            if (err) throw err;
            let post = JSON.parse(data)[req.params.post];
            res.send( post );
        });
        return;
    }
    
    // send back all posts
    fs.readFile(db, (err, data) => {
        if (err) throw err;
        res.send( JSON.parse(data) );
    });

}

function homeCtrl(req, res) {
    let file = path.join(__dirname + '/public/index.html');
    res.sendFile(file);
}

function userPostsCtrl(req, res) {

    // send back post number
    if (req.params.id && Number(req.params.id)) {

        fs.readFile(db, (err, data) => {
            if (err) throw err;

            let posts = JSON.parse(data);

            console.log('sending');
            res.send(posts);
            
            
            

            
        });
    }

}




module.exports = {
    apiCtrl,
    homeCtrl,
    userPostsCtrl
}

