const express = require('express');
const app = express();
const fs = require('fs');
const db = './db.json';


const {isApi} = require('./../helpers');


// all posts
function allPostsCtrl(req, res) {

  // send back post number
  if (req.params.post && Number(req.params.post)) {

    fs.readFile(db, (err, data) => {
      if (err) throw err;
      let posts = JSON.parse(data);

      let singlePost = posts.find(post => post.id === Number(req.params.post));

      if (isApi(req.path)) {
        res.send(singlePost !== undefined ? singlePost : 'Not Found');
        return;
      }

      res.locals.pageTitle = `Post Id ${singlePost.id}`;

      res.render('singlePost', {
        singlePost
      });

    });

    return;
  }

  // send back all posts
  fs.readFile(db, (err, data) => {
    if (err) throw err;

    let allPosts = JSON.parse(data);

    // send api data
    if (isApi(req.path)) {
      res.send(allPosts);
      return;
    }

    res.locals.pageTitle = 'All Posts';

    res.render('allPosts', {
      allPosts
    });

  });

}



module.exports = allPostsCtrl;