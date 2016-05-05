angular.module('memorandos').controller('EquipamentoController', function($http, $scope, $routeParams, Equipamento){

	//seta o filter como vazio
	$scope.$on('equipamento', function(event, data){
		$scope.equipamentos = data;
	});

});
