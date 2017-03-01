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
		Baixa.get({id: $routeParams.id},
		function(memorando){
			$scope.memorando = memorando;
		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o relatório de baixa.')
		});
	}else{
		//cria um novo objeto Baixa()
		$scope.baixa = new Baixa();
	}

  //Função para salvar os dados de baixa de equipamentos
	$scope.salva = function(){

		if($scope.baixa.tabela !== undefined){
			$scope.baixa.tabelas = new Array();
			var t = $scope.baixa.tabela.length;
			for(var i = 0; i < t; i++){
				$scope.baixa.tabelas.push($scope.baixa.tabela[i]);
			}
			console.log($scope.baixa.tabelas);
		}

		$scope.baixa.lotacaosaida = $("#provider-json-1").val();
		$scope.baixa.lotacaodestino = $("#provider-json-2").val();

		$scope.baixa.$save()
				.then(function(){
          console.log('baixa salva...');
					$scope.message = "Baixa adicionado com sucesso.";
					//limpa o form
					$scope.baixa = new Baixa();
					$('#tabela-body').html('');
				})
				.catch(function(erro){
					console.log($scope.baixa);
					console.log("Não foi possível salvar relatório de baixa.");
					$scope.erro = "Falha para gravar baixa";
					console.log(erro);
				});
	};

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
