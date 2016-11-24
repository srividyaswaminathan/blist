app
.factory('UserFactory', ['$http', function($http) {
	var factory = {};
	
	factory.login = function(user, callback) {
		$http.post('/login', user).then(function(response) {
			console.log(response.data);
			callback(response.data);
		});
	}

	factory.logout = function() {
		$http.get('/logout').then(function(response) {
			console.log(response.data);
		});
			
	}

	factory.fetchUserById = function(id) {
		return $http.get(`/user/${id}`);
	}
	
	factory.listAllUsers = function() {
		return $http.get('/users')
	}

	return factory;
}])
.factory('BucketListFactory', [ '$http', function($http) {
	var factory = {};

	factory.create = function(item) {
		return $http.post('/newitem', item);
	}

	factory.index = function() {
		return $http.get('/items');
	}

	factory.update = function(item) {
		return $http.put(`/item/${item._id}`, item);
	}

	factory.fetchItemsByUser = function(userId) {
		return $http.get(`/items/${userId}`);
	}
	return factory;

}]);