const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const db = './db.json';


// all posts
function allPostsCtrl(req, res) {
	
	// send back post number
	if (req.params.post && Number(req.params.post) ) {

		fs.readFile(db, (err, data) => {
			if (err) throw err;
			let posts = JSON.parse(data);

			let singlePost = posts.find( post => post.id === Number(req.params.post));

			if ( isApi(req.path) ) {
				res.send( singlePost !== undefined ? singlePost : 'Not Found' );
				return;
			}

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

		if( isApi(req.path) ) {
			res.send(allPosts);
			return;
		}

		let link = req.originalUrl;

		res.render('allPosts', {
			allPosts,
			link
		});

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

			if ( isApi(req.path) ) {

				if (data.length <= 0) {
					res.status(404).send(['No posts found of given user']);
					return;
				}

				res.send(data);	
				return;
			}

			if (data.length <= 0) data = false;

			res.render('userPosts', {
				data
			});
				

		});

	}
	
}




function isApi(reqestPath) {
	
	const regx = /^\/api\/.*/;

	return reqestPath.match(regx) ? true : false;

}



module.exports = {
	allPostsCtrl,
	homeCtrl,
	userPostsCtrl
}

