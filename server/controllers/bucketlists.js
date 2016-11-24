var BucketList = require('./../models/bucketlist');
var User = require('./../models/user');

module.exports = { 
	create: function(req, res) {
		User.findOne({name:req.session.logged_in_user}, function(err, user) {
			if (err || !user) { 
				return res.json({
					success: false,
					error: err
				});
			};

			req.body._createdUser = user._id;
			req.body.done = false;

			BucketList.create(req.body, function(err) {
				if (err) {
					return res.json({
						success: false,
						error: err
					});
				}
				return res.json({
					success: true
				});
			})
		});

		
	},

	index: function(req, res) {
		User.findOne({name:req.session.logged_in_user}, function(err, user) {
			if (err || !user) { 
				return res.json({
					success: false,
					error: err
				});
			};

			var userId = user._id
			return res.redirect('/items/' + user._id);
			
		})
	},

	update: function(req, res) {
		BucketList.findOneAndUpdate({_id: req.params.id}, req.body, function(err){
	  		if(err){
	  			res.json({
	  				success:false,
	  				error: err
	  			});
	  		}
	  		else {
	  			res.json({success:true});
	  		}
	  	})

	},

	fetchItemsForUser: function(req, res) {
		var userId = req.params.id
		BucketList.find({
			$or: [
				{_taggedUser: userId},
				{_createdUser: userId},
		]})
		.populate('_taggedUser _createdUser')
		.exec(function(err, items) {
				if (err) {
					res.json({
						success: true,
						error: err
					})
				}
				else {
					res.json({success:true, items: items});
				}
		});
	}

}