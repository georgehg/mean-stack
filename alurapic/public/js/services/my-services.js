angular.module('myServices', ['ngResource'])
.factory('pictureResource', function($resource) {

	return $resource('v1/fotos/:fotoId', null, {
		update : {
			method : 'PUT'
		}
	});
})

.factory('pictureCrud', function(pictureResource, $q, $rootScope) {

	var service = {};
	var crudEvent = 'pictureSaved';

	service.createOrUpdate = function(foto) {

		return $q(function(resolve, reject) {
			
			if (foto._id) {
				pictureResource.update({fotoId : foto._id}, foto
				, function() {
					$rootScope.$broadcast(crudEvent);
					resolve({
						mensagem : "Foto " + foto.titulo +" atualizada com sucesso!",
						insert : false
					});
				}
				, function(errors) {
					console.log(errors);
					reject({
						mensagem : "Não foi possível atualizar a foto " + foto.titulo,
						error: errors
					});
				});

			} else {

				pictureResource.save(foto
				, function(data) {
					$rootScope.$broadcast(crudEvent);
					resolve({
						mensagem : "Foto " + foto.titulo + " incluida com sucesso!",
						insert : true
					});					
				}
				, function(errors) {
					console.log(error);
					reject({
						mensagem : "Não foi possível incluir uma foto:" + foto.titulo,
						error: errors
					});				
				});

			}
		});
	};

	return service;

});