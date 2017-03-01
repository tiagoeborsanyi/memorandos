angular.module('memorandos').controller('BaixaController', function($http, $scope, $routeParams, Baixa){

  $scope.message = '';
  $scope.erro = '';

  function selecionaSituacao(){
    $http.get('/configuracao/situacaoequiparada').success(function(situacaolista){
      //console.log(situacaolista);
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

  selecionaSituacao();
  selecionaEquipamento();

  $scope.adicionaItemBaixa = function(a) {
    if($scope.baixa.tabela === undefined || $scope.baixa.tabela === null){
      $scope.baixa.tabela = [];
    }
    console.log($scope.baixa.tabela);
    $scope.baixa.tabela.push({a});
  };


  $scope.removeItem = function(i) {
    $scope.baixa.tabela.splice(i, 1);
  };

  //Função para quando clicar no botão de editar ir para a pagina de edição do memorando
	if($routeParams.id){
		Memorando.get({id: $routeParams.id},
		function(memorando){
			$scope.memorando = memorando;
			$scope.selecionalotacao = [{teste: 'Em Transito'}, {teste: 'Manutenção'}, {teste: $scope.memorando.lotacaodestino}, {teste: $scope.memorando.lotacaosaida}];
			//$scope.diamesano = formataData(memorando.data);
		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o memorando')
		});
	}else{
		//cria um novo objeto Baixa()
		$scope.baixa = new Baixa();
	}

  var opt;
	$http.get('/inicio/lotacoes').success(function(lotacao){
			opt = {
				url: '/inicio/lotacoes',

				getValue: "teste",

				list: {
					match: {
						enabled: true
					}
				}
			};
			$("#provider-json-1").easyAutocomplete(opt);
			$("#provider-json-2").easyAutocomplete(opt);
	},
	function(erro){
		console.log(erro);
	});

});
