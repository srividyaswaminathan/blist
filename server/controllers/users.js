var User = require('./../models/user');

module.exports = { 

	login: function(req, res) {
		var username = req.body.name;
		User.findOne({name:username}, function(err, user) {
			if (err) {
				return res.json({
					success:false,
					error: err
				});
			}

			if (user) {
				req.session.logged_in_user = username;				
				return res.json({
					success: true,
					logged_in_user: username
				})
			}

			User.create({name: username}, function(err){
				if (err) {
					return res.json({
						success: false,
						error: err
					})
				}

				req.session.logged_in_user = username;
				return res.json({
					success: true,
					logged_in_user: username
				})
			});

		});
	},

	logout: function(req, res) {
		delete req.session.logged_in_user;
		return res.json({
			success: true
		});
	},

	index: function(req, res) {
		User.find({}, function(err, allUsers) {
			if (err) {
				return res.json({
					success: false,
					error: err
				})
			}
			return res.json({
				success: true,
				users: allUsers
			})
		})
	},

	fetchUser: function(req, res) {
		User.findOne({_id: req.params.id}, function(err, user) {
			if (err) {
				return res.json({
					success: false,
					error: err
				})
			}
			return res.json({
				success: true,
				user: user
			})
		})

	}

}