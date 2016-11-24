var app = angular.module('App', ['ngRoute', 'ngCookies']).config([
    '$routeProvider',
    function($routeProvider) {

	 $routeProvider
		.when('/index', {
			templateUrl: 'partials/login.html',
            controller: 'UserController'
		})
		.when('/dashboard', {
			templateUrl: 'partials/dashboard.html',
            controller: 'BucketListController'
		})
		.when('/user/:id', {
			templateUrl: 'partials/user.html',
            controller: 'UserListController'

		})
		.when('/logout', {
			templateUrl: 'partials/login.html',
            controller: 'UserController'	
		})

		.otherwise({redirectTo: '/index'});
    }
]);
