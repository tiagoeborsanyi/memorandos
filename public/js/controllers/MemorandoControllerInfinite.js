angular.module('memorandos').controller('MemorandoControllerInfinite', ['$scope', '$http', '$resource', 'Memorando', function($scope, $http, $resource, Memorando) {
  $scope.page = 0;
  $scope.memorandos = [];
  $scope.fetching = false;

  /*
    O código para fazer a busca própria de memorandos
    estava no MemorandoController, usando um evento
    de JQuery que eu apaguei.
  */

  // Fetch more items
  $scope.getMore = function() {
    $scope.fetching = true;
    $http.get('/inicio?'+ $scope.page).then(function(memorandos) {
      console.log('teste', memorandos);
      $scope.fetching = false;
      // Append the items to the list
      $scope.memorandos = $scope.memorandos.concat(memorandos.data);
    });
    $scope.page++;
  };

  $scope.remove = function(memorando) {
    var confirmar = confirm("Tem certeza que deseja remover o memorando.");
		if(confirmar == true){
			Memorando.delete({id: memorando._id},
			window.location.reload(),
				function(erro){
					console.log('Não foi possível remover a linha do memorandos.');
					console.log(erro);
					console.log(id);
				});
		}
  };


}]);
