angular.module('memorandos').factory('Baixa', function($resource){

	return $resource('/baixa/equipamento/:id');
});
