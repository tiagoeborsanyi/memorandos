angular.module('memorandos').controller('EquipamentoControllerInfinite', ['$scope', '$http', '$resource', 'Equipamento', function($scope, $http, $resource, Equipamento) {
  $scope.page = 0;
  $scope.equipamentos = [];
  $scope.fetching = false;

  // Fetch more items
	$scope.getMoreEquipamento = function() {
		$scope.fetching = true;
		$http.get('/equipamento/?'+ $scope.page).then(function(equipamentos) {
			console.log('teste', equipamentos.data);
			$scope.fetching = false;
			// Append the items to the list
			$scope.equipamentos = $scope.equipamentos.concat(equipamentos.data);
		});
		$scope.page++;
	};



  }]);
