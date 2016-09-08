angular.module('memorandos').factory('Usuario', function($resource){

	return $resource('/usuario/:id');
});
