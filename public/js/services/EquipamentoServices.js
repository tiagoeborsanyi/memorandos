angular.module('memorandos').factory('Equipamento', function($resource){

	return $resource('/equipamento/:id');
});
