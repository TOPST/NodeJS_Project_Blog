const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');

function loginUserAndRedirect(path){
	return async (req, res) => {
		let user = req.user;
		user.email = req.body.email;
		user.password = await bcrypt.hash(req.body.password, 10);
		const errorMessage = {};
		const authToken = {};
		const userExist = await User.findOne({ email: req.body.email });
		try{
			if(!userExist){
				errorMessage.errorLoginEmail = 'This email does not exist.';
				res.render('home/' + path, { 
						user: user, 
						title: 'Login - Please Retry', 
						errorMessage: errorMessage 
					});
			} else {
				if(user.password == userExist.password){
					errorMessage.errorLoginPassword = 'This is not the correct password.';
					res.render('home/' + path, { 
						user: user, 
						title: 'Login - Please Retry', 
						errorMessage: errorMessage 
					});
				} else {
					user = userExist;
					const token = jwt.sign({ id : user.id }, process.env.SECRET_TOKEN);
					res.cookie('authToken', token, { 
						httpOnly: true,
						sameSite: 'Strict',
						//secure: true 
					});
					res.cookie('authId', user.id, { 
						httpOnly: true,
						sameSite: 'Strict',
						//secure: true 
					});
					res.redirect('/account/' + user.id);
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

module.exports = loginUserAndRedirect;