angular.module('alurapic').controller('GruposController', function($scope, $http) {

	$scope.groups = [];

	$http.get('v1/grupos')
	.success(function(grupos) {
		$scope.groups = grupos;
	})
	.error(function(error) {
		console.log(error);
	});

});