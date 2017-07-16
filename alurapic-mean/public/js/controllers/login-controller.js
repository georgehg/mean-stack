angular.module('alurapic').controller('LoginController', function($scope, $http, $location) {

	$scope.user = {};
	$scope.message = '';

	$scope.authenticate = function() {

		var user = $scope.user;

		$http.post('/auth', {login: user.login, senha: user.senha})
			.then(function() {
				$location.path('/')
			}, function(error) {
				console.log(error)
				$scope.user = {};
				$scope.message='Login ou Senha Inválidos';
			}
		);

	};

});