angular.module('alurapic').controller('FotoFormController', 
	['$scope', '$routeParams', 'pictureResource', 'pictureCrud', 
	function($scope, $routeParams, pictureResource, pictureCrud) {

	$scope.foto = {};
	$scope.mensagem = "";

	if ($routeParams.fotoId) {
		pictureResource.get({fotoId : $routeParams.fotoId}
		, function(foto) {
			$scope.foto = foto;
		}
		, 	function(error) {
			console.log(error);
			$scope.mensagem = "Não foi possível obeter a foto com ID: " + $routeParams.fotoId;
		});
	}

	$scope.save = function() {

		if ($scope.formulario.$valid) {

			pictureCrud.createOrUpdate($scope.foto)
			.then(function(data) {
				$scope.mensagem = data.mensagem;
				if (data.insert) $scope.foto = {};
			})
			.catch(function(data) {
				$scope.mensagem = data.mensagem;
			})

		}
	};

}]);