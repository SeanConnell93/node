const express = require('express');
const app = express();
const fs = require('fs');
const db = './db.json';


const {isApi} = require('./../helpers');

// get user posts
function userPostsCtrl(req, res) {

  // send back post number
  if (req.params.id && Number(req.params.id)) {

    // read db and sort posts by userId
    let getUserPosts = new Promise(function (resolve, reject) {

      fs.readFile(db, (err, data) => {

        if (err) throw err;
        let posts = JSON.parse(data);
        let userPosts = [];

        let findPosts = posts.find((post) => {
          if (post.userId === Number(req.params.id)) userPosts.push(post);
        });

        resolve(userPosts);

      });

    });

    // send user posts
    getUserPosts.then((data) => {

      if (isApi(req.path)) {

        if (data.length <= 0) {
          res.status(404).send(['No posts found of given user']);
          return;
        }

        res.send(data);
        return;
      }

      if (data.length <= 0) data = false;

      res.locals.pageTitle = `User ${data[0].userId} Posts`;

      res.render('userPosts', {
        data
      });


    });

  }

}

module.exports = userPostsCtrl;