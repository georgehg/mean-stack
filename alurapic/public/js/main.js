angular.module('alurapic', ['myDirectives', 'ngAnimate','ngRoute', 'myServices'])
.config(function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$routeProvider.when('/fotos', {
		templateUrl: 'partials/main.html',
		controller: 'FotosController'
	});

	$routeProvider.when('/fotos/new', {
		templateUrl: 'partials/fotos-form.html',
		controller: 'FotoFormController'
	});

	$routeProvider.when('/fotos/edit/:fotoId', {
		templateUrl: 'partials/fotos-form.html',
		controller: 'FotoFormController'
	});


	$routeProvider.otherwise({
		redirectTo: '/fotos'
	});

});