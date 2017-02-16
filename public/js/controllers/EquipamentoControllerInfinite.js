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


  //Essa função faz a busca de situação do equipamento
  //Existe varios equipamentos com o mesmo tombo, então devemos pegar somente os equipamentos que tem a ultima data de cadastro
  //com a situação relacionada
  //Existe um porém, se existir a data com a situação, neste matching nao pode haver nenhuma data mais nova com outra situação
  //A data é o carro chefe para fazer o match e em seguida a situação.
  $scope.situacao = function(){

  	$http.get('/equipamento/situacao').success(function(situacao){
      //console.log('sem filtro: ',situacao);

  		var b = [];
  		for(var i = 0; i < situacao.length; i++){
  			var obj = situacao[i];
        //console.log(situacao[i].situacao[0]);
  			if($scope.tabela.situacao.memorando.situacao[0].memorando == situacao[i].situacao[0]){

  				b.push(situacao[i]);
          //console.log(situacao[i]._id == '137190');
  			}
  		}
  		$scope.ept = b;
      console.log($scope.tabela.situacao.memorando.situacao[0].memorando);

  		//console.log('com filtro: ', $scope.ept.length);
      //inicio de teste para ver se os parametros estao vindo corretos
      for(var k = 0; k < $scope.ept.length; k++) {
        if ('118989' == b[k].situacao){
          //console.log(b[k]);
        }
      }//final do teste

  	},
  	function(erro){
  		console.log(erro);
  		console.log('não foi possível obter o equipamento');
  	});
  }; //final da função de trazer situações

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

  //função para listar todas as situação no select na aba de relatórios de equipamentos
  function selecionaSituacao(){

  	$http.get('/configuracao/situacaoequiparada').success(function(situacaolista){

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
