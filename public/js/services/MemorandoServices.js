angular.module('memorandos').factory('Memorando', function($resource){

	return $resource('/inicio/:id');
});
