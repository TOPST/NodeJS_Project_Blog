const bcrypt = require('bcrypt');
const User = require('./../models/user');

function createUserAndRedirect(path){
	return async (req, res) => {
		let user = req.user;
		user.first_name = req.body.first_name;
		user.last_name = req.body.last_name;
		user.email = req.body.email;
		user.password = await bcrypt.hash(req.body.password, 10);
		const errorMessage = {};
		const userExist = await User.findOne({ email: req.body.email });
		try{
			// Check if email and password are correct.
			if(req.body.password.length < 6){
				errorMessage.errorPassword = 'The password should at least contains 6 characters.';
				if(userExist){
					errorMessage.errorEmail = 'This email has already been used.';
					res.render('home/' + path, { 
						user: user, 
						title: 'New user - Please Retry', 
						errorMessage: errorMessage 
					});
				} else {
					res.render('home/' + path, { 
						user: user, 
						title: 'New user - Please Retry', 
						errorMessage: errorMessage 
					});
				};
			} else {
				if(userExist){
					errorMessage.errorEmail = 'This email has already been used.';
					res.render('home/' + path, { 
						user: user, 
						title: 'New user - Please Retry', 
						errorMessage: errorMessage 
					});
				} else {
					user = await user.save();
					res.redirect('/login');
				};
			};
		} catch (err) {
			console.log(err);
			errorMessage.errorUser = 'Could not create user.';
			res.render('home/' + path, { 
				user: user, 
				title: 'New user - Please Retry', 
				errorMessage:  errorMessage
			});
		};
	};
};

module.exports = createUserAndRedirect;