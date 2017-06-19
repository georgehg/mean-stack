angular.module('myDirectives', ['myServices'])
.directive('myPanel', function() {

	var ddo = {};

	ddo.restrict = "AE";

	ddo.scope = {
		titulo : "@" //"@titulo";
	};

	ddo.transclude = true;

	ddo.templateUrl = 'js/directives/my-panel.html'; 
				
	return ddo;

})

.directive('myPicture', function() {

	var ddo = {};

	ddo.restrict = "AE";

	ddo.scope = {
		url : "@",
		hint : "@"
	};

	ddo.templateUrl = 'js/directives/my-picture.html'; 
				
	return ddo;

})

.directive('myDangerButton', function() {

	var ddo = {};

	ddo.restrict = "E";

	ddo.scope = {
		name : "@",
		action : "&"
	};

	ddo.templateUrl = 'js/directives/my-danger-button.html'; 
				
	return ddo;

})

.directive('customFocus', function() {

	var ddo = {};

	ddo.restrict = "A";
	
	ddo.link = function(scope, element) {
		scope.$on('pictureSaved', function() {
			element[0].focus();
		});
	}
				
	return ddo;

})

.directive('myTitles', function() {

	var ddo = {};

	ddo.restrict = 'E';

	ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';

	ddo.controller = function($scope, pictureResource) {
		pictureResource.query(function(fotos) {
			$scope.titulos = fotos.map(function(foto) {
				return foto.titulo;
			});
		});

	};

	return ddo;

});