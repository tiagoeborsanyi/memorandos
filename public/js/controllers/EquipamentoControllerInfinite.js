angular.module('memorandos').controller('EquipamentoControllerInfinite', ['$scope', '$http', '$resource', 'Equipamento', function($scope, $http, $resource, Equipamento) {
  $scope.page = 0;
  $scope.equipamentos = [];
  $scope.fetching = false;

  // Fetch more items
	$scope.getMoreEquipamento = function() {
		$scope.fetching = true;
		$http.get('/equipamento/?'+ $scope.page).then(function(equipamentos) {
			//console.log('teste', equipamentos.data);
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


  $scope.situacao = function(){

  	console.log("dentro de function situacao "+$scope.eqpt.situacao.situacao);

  	$http.get('/equipamento/situacao').success(function(situacao){

  		var b = [];
  		for(var i = 0; i < situacao.length; i++){
  			var obj = situacao[i];
  			if($scope.eqpt.situacao.situacao == situacao[i]['situacao']){

  				b.push(situacao[i]);
  			}
  		}

  		$scope.ept = b;
  		console.log($scope.ept);

  	},
  	function(erro){
  		console.log(erro);
  		console.log('não foi possível obter o equipamento');
  	});
  };

  $scope.operacao = function(){

  	console.log("dentro de function operacao "+$scope.eqpto.operacao.operacao);

  	$http.get('/equipamento/operacao').success(function(operacao){

  		var b = [];
  		console.log("OPERACAO "+operacao[0]['assunto']);
  		for(var i = 0; i < operacao.length; i++){
  			//var obj = operacao[i];
  			if($scope.eqpto.operacao.operacao == operacao[i]['assunto']){

  				b.push(operacao[i]);
  			}
  		}

  		$scope.opr= b;
  		console.log($scope.opr);

  	},
  	function(erro){
  		console.log(erro);
  		console.log('não foi possível obter o equipamento');
  	});

  };

  //function para fazer relatório histórico da lotacao que esta na pagina de relatórios-equipamentos
  $scope.transacao = function(){

  	$http.get('/equipamento/transacao').success(function(transacao){

  		var b = [];

  		$scope.status = $scope.lot.lotacao.teste;

  		for(var i = 0; i < transacao.length; i++){

  			if(($scope.lot.lotacao.teste == transacao[i]['lotacaosaida']) || ($scope.lot.lotacao.teste == transacao[i]['lotacaodestino'])){

  				b.push(transacao[i]);
  			}
  		}

  		$scope.trans= b;
  	},
  	function(erro){
  		console.log(erro);
  		console.log('não foi possível obter o histórico da lotação');
  	});

  };

  function selecionaSituacao(){

  	$http.get('/configuracao/situacao').success(function(situacaolista){

  		$scope.situacoes = situacaolista;

  	},
  	function(erro){
  		console.log(erro);
  		console.log('não foi possível obter o equipamento');
  	});
  };

  function selecionaOperacao(){

  	$http.get('/configuracao/operacao').success(function(operacaolista){

  		$scope.operacoes = operacaolista;
  		//console.log(operacaolista);

  	},
  	function(erro){
  		console.log(erro);
  		console.log('não foi possível obter o equipamento');
  	});
  };

  function selecionaLotacao(){

  	$http.get('/configuracao/lotacao').success(function(lotacaoLista){

  		$scope.lotacoes = lotacaoLista;

  	},
  	function(erro){
  		console.log(erro);
  		console.log('não foi possível obter o equipamento');
  	});

  };

  selecionaOperacao();
  selecionaSituacao();
  selecionaLotacao();


}]);
