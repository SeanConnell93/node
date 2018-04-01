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
			let posts = JSON.parse(data);

			let singlePost = posts.find( post => post.id === Number(req.params.post));

			res.send( singlePost !== undefined ? singlePost : 'Not Found' );

		});

		return;
	}
	
	// send back all posts
	fs.readFile(db, (err, data) => {
		if (err) throw err;
		res.send( JSON.parse(data) );
	});
	
}


// send home page
function homeCtrl(req, res) {
	let file = path.join(__dirname + '/public/index.html');
	res.sendFile(file);
}


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
					if (post.userId === Number(req.params.id) ) userPosts.push(post);
				});

				resolve(userPosts);
				
			});
			
		});

		// send user posts
		getUserPosts.then( (data) => {
	
			if (data.length === 0) {
				res.status(404).send(['No posts found of given user']);
				return;
			}
			
			res.send(data); 
		});

	}
	
}




module.exports = {
	apiCtrl,
	homeCtrl,
	userPostsCtrl
}

