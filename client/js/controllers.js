app.controller('UserController', ['$scope', '$route', 'UserFactory', '$location', '$cookies', function($scope, $route, UserFactory, $location, $cookies) {



	$scope.login = function() {
		UserFactory.login($scope.user, function(data) {
			if (data.success){
				$scope.logged_in_user = data.logged_in_user;
				$cookies.put('logged_in_user', data.logged_in_user);
				$location.path('/dashboard');
			}
		});
	}

	$scope.logout = function() {
		UserFactory.logout(function(data) {
			if (data.success){
				delete $scope.logged_in_user;
				$cookies.remove('logged_in_user');
				$location.path('/index');
			}
		});
	}


	if ($location.path() === '/index' && $cookies.get('logged_in_user')) {
		$location.path('/dashboard');		
	}

	if ($location.path() === '/logout') 
	{
		$scope.logout();
	}
}])

.controller('BucketListController', ['$scope', '$route', 'UserFactory', 'BucketListFactory', '$location', '$cookies', 
	function($scope, $route, UserFactory, BucketListFactory, $location, $cookies) {
		$scope.logged_in_user = $cookies.get('logged_in_user');


		UserFactory.listAllUsers().then( function(response) {
			if (response.data.success){
				$scope.users = response.data.users;
				$scope.otherUsers = []

				for (var i=0; i<$scope.users.length; i++) {
					if ($scope.users[i].name != $scope.logged_in_user) {
						$scope.otherUsers.push($scope.users[i]);
					}
				}
			}
		});

		$scope.addToBucketList = function() {
			BucketListFactory.create($scope.newItem).then( function(response) {
				if (response.data.success) {
					$route.reload();
				} else {
					console.log(response.data);
					$scope.errors = []
					for (var key in response.data.error.errors) {
						$scope.errors.push(response.data.error.errors[key].message);
					}					
				}
			}) ;

		}

		$scope.updateStatus = function(item) {
			console.log("status changed for ", item.title);
			BucketListFactory.update(item);
		}

		BucketListFactory.index().then(function(response){
			if (response.data.success) {
				$scope.items = response.data.items;
			}
		}) 		

}])

.controller('UserListController', ['$scope', '$route', 'UserFactory', 'BucketListFactory', '$location', '$cookies', 
	function($scope, $route, UserFactory, BucketListFactory, $location, $cookies) {
		var userId = $route.current.params.id;
		console.log(userId);

		UserFactory.fetchUserById(userId).then(function(response) {
			if (response.data.success) {
				$scope.user = response.data.user

			}
		})

		BucketListFactory.fetchItemsByUser(userId).then(function(response) {
			if (response.data.success) {
				console.log(response.data.items);

				var items = response.data.items;
				var done = []
				var pending = []
				items.forEach(function(item) {
					if (item.done) {
						done.push(item);
					} else {
						pending.push(item);
					}
				})

				$scope.doneItems = done;
				$scope.pendingItems = pending;
			}

		})
		// $scope.logged_in_user = $cookies.get('logged_in_user');

		// var items = [] 
		// BucketListFactory.index().then(function(response){
		// 	if (response.data.success) {
		// 		items = response.data.items;
		// 	}
		// }) 

		// var done = []
		// var pending = []
		// items.forEach(function(item) {
		// 	if (item.done) {
		// 		done.push(item);
		// 	} else {
		// 		pending.push(item);
		// 	}
		// })

}]);		