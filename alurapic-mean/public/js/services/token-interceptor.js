angular.module('alurapic')
.factory('TokenInterceptor', function($window, $location, $q) {

	var interceptor = {}; 

	interceptor.response = function(response) {
		var token = response.headers('x-access-token');
		if (token) {
			$window.sessionStorage.token = token;
			console.log("Session token stored");
		}

		return response;
	};

	interceptor.request = function(config) {
		config.headers = config.headers || {};
		if ($window.sessionStorage.token) {
			config.headers['x-access-token'] = $window.sessionStorage.token;
			console.log("Header token added");
		}

		return config;
	};

	interceptor.responseError = function(rejection) {
		if (rejection != null && rejection.status == 401) {
			console.log("Request rejected");
			delete $window.sessionStorage.token;
			$location.path('/login');
		}

		return $q.reject(rejection);
	};

	return interceptor;

});