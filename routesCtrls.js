const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const db = './db.json';




const allPostsCtrl = require('./route_controllers/allPostsCtrl');

const userPostsCtrl = require('./route_controllers/userPostsCtrl');







module.exports = {
	allPostsCtrl,
	userPostsCtrl
}

