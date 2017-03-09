angular.module('memorandos').controller('EquipamentoController', function($http, $scope, $routeParams, Equipamento){

	//seta o filter como vazio
	$scope.$on('equipamento', function(event, data){
		$scope.equipamentos = data;
	});


if($routeParams.tombo) {
	var t = $routeParams.tombo;
	$http.get('/equipamento/historico/'+t).success(function(historico){
		$scope.historico = historico;
	},
	function(erro){
		console.log(erro);
		console.log('não foi possível obter o historico');
	});
}

if($routeParams.equipamentoId){
	Equipamento.get({id: $routeParams.equipamentoId},
	function(equipamento){
		$scope.equipamento = equipamento;
		console.log(equipamento);
	},
	function(erro){
		console.log(erro);
		console.log('não foi possível obter o equipamento');
	});
}else{
	//cria um novo objeto equipamento
	$scope.equipamento = new Equipamento();
}

$scope.salva = function(){
	$scope.equipamento.$save()
		.then(function(){
			console.log($scope.equipamento);
			//limpa o form
			$scope.equipamento = new Equipamento();
		})
		.catch(function(erro){
			console.log("não foi possivel salvar o equipamento "+ erro);
		});
	};

	function selecionaSituacao(){

  	$http.get('/configuracao/situacaoequiparada').success(function(situacaolista){

  		$scope.situacoes = situacaolista;

  	},
  	function(erro){
  		console.log(erro);
  		console.log('não foi possível obter o equipamento');
  	});
  };

	function selecionaEquipamento() {
		$http.get('/configuracao/memorandoequipamento').success(function(equipamentolista){
			$scope.equipamentosLista = equipamentolista;
		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o equipamento');
		});
	};

	selecionaEquipamento();
	selecionaSituacao();

});
