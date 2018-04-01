'use strict';

var _https = require('https');

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
			var post = JSON.parse(data)[req.params.post];
			res.send(post);
		});
		return;
	}

	// send back all posts
	fs.readFile(db, function (err, data) {
		if (err) throw err;
		res.send(JSON.parse(data));
	});
}

function homeCtrl(req, res) {
	var file = path.join(__dirname + '/public/index.html');
	res.sendFile(file);
}

function userPostsCtrl(req, res) {

	// send back post number
	if (req.params.id && Number(req.params.id)) {

		var readData = fs.readFile(db, function (err, data) {
			if (err) throw err;

			var posts = JSON.parse(data);

			return posts;
		});

		readData.then(function (data) {

			var userPosts = [];

			var sortUserPosts = posts.find(function (post, i) {

				if (post.userId === Number(req.params.id)) userPosts.push(post);
			});

			return userPosts;
		}).then(function (data) {

			res.send(data);
		});
	}
}

module.exports = {
	apiCtrl: apiCtrl,
	homeCtrl: homeCtrl,
	userPostsCtrl: userPostsCtrl
};