// Import packages.
const express = require('express');

// Set variables.
const router = express.Router();

// Imports models.
const User = require('./../models/user');
const createUserAndRedirect = require('./../functions/create_user_process');
const loginUserAndRedirect = require('./../functions/login_process');

// Routes.
router.get('/', async (req, res) => {
	res.render('home/home_page',{ 
		title: 'Home page',
		user: req.cookies
	});
});

router.get('/login', (req, res) => {
	res.render('home/login',{ 
		title: 'Login',
		user: new User(),
		errorMessage: ''
	});
});

router.get('/register', (req, res) => {
	res.render('home/new_user',{ 
		title: 'Register', 
		user: new User(),
		errorMessage: '' 
	});
});

router.post('/register', async (req, res, next) => {
	req.user = new User();
	next();
}, createUserAndRedirect('new_user'));

router.post('/login', async (req, res, next) => {
	req.user = new User();
	next();
}, loginUserAndRedirect('login'));

// Export routes.
module.exports = router;