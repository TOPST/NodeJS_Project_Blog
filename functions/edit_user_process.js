function editUserAndRedirect(path){
	return async (req, res) => {
		let user = req.user;
		user.first_name = req.body.first_name;
		user.last_name = req.body.last_name;
		user.email = req.body.email;
		user.password = req.body.password;
		const errorMessage = {};
		try {
			user = await user.save();
			res.redirect('/account/' + user.id);
		} catch (err) {
			console.log(err);
			errorMessage.errorUser = 'Could not create user.';
			res.render('home/' + path, { 
				user: user, 
				title: 'New user - Please Retry', 
				errorMessage: errorMessage
			});
		};
	};
};

module.exports = editUserAndRedirect;