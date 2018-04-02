'use strict';

var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var db = './db.json';

function apiCtrl(req, res) {

	// send back post number
	if (req.params.post && Number(req.params.post)) {

		fs.readFile(db, function (err, data) {
			if (err) throw err;
			var posts = JSON.parse(data);

			var singlePost = posts.find(function (post) {
				return post.id === Number(req.params.post);
			});

			res.send(singlePost !== undefined ? singlePost : 'Not Found');
		});

		return;
	}

	// send back all posts
	fs.readFile(db, function (err, data) {
		if (err) throw err;
		res.send(JSON.parse(data));
	});
}

// send home page
function homeCtrl(req, res) {
	var file = path.join(__dirname + '/public/index.html');
	res.sendFile(file);
}

// get user posts
function userPostsCtrl(req, res) {

	// send back post number
	if (req.params.id && Number(req.params.id)) {

		// read db and sort posts by userId
		var getUserPosts = new Promise(function (resolve, reject) {

			fs.readFile(db, function (err, data) {

				if (err) throw err;
				var posts = JSON.parse(data);
				var userPosts = [];

				var findPosts = posts.find(function (post) {
					if (post.userId === Number(req.params.id)) userPosts.push(post);
				});

				resolve(userPosts);
			});
		});

		// send user posts
		getUserPosts.then(function (data) {

			if (data.length === 0) {
				res.status(404).send(['No posts found of given user']);
				return;
			}

			res.render('index', {
				data: data
			});
		});
	}
}

module.exports = {
	apiCtrl: apiCtrl,
	homeCtrl: homeCtrl,
	userPostsCtrl: userPostsCtrl
};