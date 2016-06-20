angular.module('memorandos').factory('Lot', function($resource){

	return $resource('/configuracao/lotacao/:id');

});
