// Import packages.
const express = require('express');
const router = express.Router();

// Imports models.
const User = require('./../models/user');
const protectedRoute = require('./../functions/protected_routes_process');
const editUserAndRedirect = require('./../functions/edit_user_process');

// Routes.
router.get('/:id', protectedRoute, async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user == null) {
		res.redirect('/')
	};
	res.render('account/user_account',{ 
		title: 'Account',
		user: user, 
		errorMessage: ''
	});
});

router.get('/edit/:id', async (req, res) => {
	const user = await User.findById(req.params.id);
	res.render('account/edit_user', { 
		title: 'Edit : ' + user.first_name + " " + user.last_name,
		user: user, 
		errorMessage: ''
	});
});

router.get('/:id/logout', (req, res) => {
	for(cookie in req.cookies){
		res.clearCookie(cookie);
	};
	res.redirect('/');
});

router.put('/:id', async (req, res, next) => {
	req.user = await User.findById(req.params.id);
	next();
}, editUserAndRedirect('edit_user'));

// Export routes.
module.exports = router;