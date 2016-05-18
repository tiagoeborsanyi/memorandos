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

  $scope.remove = function(equipamento){
    var confirmar = confirm("Tem certeza que deseja excluir?");
    if(confirmar == true){
      Equipamento.delete({id: equipamento.tombo},
        window.location.reload(),
        function(erro){
          console.log('Não foi possível remover o equipamento');
          console.log(erro);
        });
    }
  };


  }]);
