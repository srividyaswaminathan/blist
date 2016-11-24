
var UserController = require('./../controllers/users');
var BucketListController = require('./../controllers/bucketlists');

module.exports = function(app){
	app.get('/', function(req, res){
		res.sendFile(__dirname + '../client/index.html')
	});

	app.post('/login', UserController.login);
	app.get('/logout', UserController.logout);
	app.get('/users', UserController.index);
	app.get('/user/:id', UserController.fetchUser);

	app.post('/newitem', BucketListController.create);
	app.get('/items', BucketListController.index);
	app.get('/items/:id', BucketListController.fetchItemsForUser);
	app.put('/item/:id', BucketListController.update)
}

