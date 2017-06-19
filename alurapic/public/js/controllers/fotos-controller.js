angular.module('alurapic').controller('FotosController', 
	['$scope', 'pictureResource', 
	function($scope, pictureResource) {

    $scope.fotos = [];
    $scope.filtro = '';
    $scope.mensagem = "";

    pictureResource.query(
    function(fotos) {
    	$scope.fotos = fotos;
	}
	, function(error) {
		console.log(error);
    });

	/*$http.get('v1/fotos')
	.success(function(data) {
		$scope.fotos = data;
	})
	.error(function(error) {	
		console.log(error);
	});*/

	/*var promisse = $http.get('v1/fotos');
	promisse.then(function(result) {
		$scope.fotos = result.data;
	}).catch(function(errors) {
		console.log(errors);
	});*/

	$scope.remove = function(foto) {

		pictureResource.delete({fotoId : foto._id}
		, function() {
			var idxFoto = $scope.fotos.indexOf(foto);
			$scope.fotos.splice(idxFoto, 1);
			$scope.mensagem = "Foto " + foto.titulo + " removida com sucesso!";
		}, function(error) {
			$scope.mensagem = "Erro ao tentar remover a foto: "+ foto.titulo;
			console.log(error);
		});

		/*$http.delete('v1/fotos/' + foto._id)
		.success(function() {
			var idxFoto = $scope.fotos.indexOf(foto);
			$scope.fotos.splice(idxFoto, 1);
			$scope.mensagem = "Foto " + foto.titulo + " removida com sucesso!";
		})
		.error(function(error) {
			$scope.mensagem = "Erro ao tentar remover a foto: "+ foto.titulo;
			console.log(error);
		});*/
	};



}]);