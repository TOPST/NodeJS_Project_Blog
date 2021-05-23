const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const User = require('./../models/user');

const protectedRoute = (req, res, next) => {
	const authToken = req.cookies.authToken;
	if(!authToken){
		res.redirect('/login');
	}
	try {
		jwt.verify(authToken, process.env.SECRET_TOKEN);
		next();
	} catch (err) {
		console.log(err);
		res.redirect('/login');
	};
};

module.exports = protectedRoute;