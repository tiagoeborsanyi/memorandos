angular.module('memorandos').controller('ConfiguracaoController', function($http, $scope, $routeParams, $resource){

	var Lotacao = $resource('/configuracao/lotacao/:id');
	var Situacao = $resource('/configuracao/situacao/:id');
	var Operacao = $resource('/configuracao/operacao/:id');
	var Equipamento = $resource('/configuracao/memorandoequipamento/:id');
	var Equiparada = $resource('/configuracao/situacaoequiparada/:id');


	function buscaSituacoes(){

		Equiparada.query(
			function(situacoes){
				//console.log(situacoes);
				$scope.situacoes = situacoes;
			},
			function(erro){
				console.log('Não foi possível obter a lista de situações.');
				console.log(erro);
			});
	};

	//function para remover uma situação
	$scope.removeSituation = function(situation){

		var confirmar = confirm("Tem certeza que deseja remover esta situação.");

		if(confirmar == true){
			Equiparada.delete({id: situation._id},
				buscaSituacoes,
				function(erro){
					console.log("Não foi possível remover a situação.");
					console.log(erro);
				});
		}
		console.log(situation);
	};


	//lotacaoId ainda nao existe para ir para algum tipo de pagina de edição com o ID
	function verificaSituacaoId(){

		if($routeParams.situacaoId){

			Equiparada.get({id: $routeParams.situacaoId},
			function(eqpt){
				$scope.eqpt = eqpt;

			},
			function(erro){
				console.log(erro);
				console.log('não foi possível obter o equipamento');
			});
		}else{
			//cria um novo objeto equipamento
			$scope.eqpt = new Equiparada();
		}
	};

	verificaSituacaoId();
	buscaSituacoes();

	$scope.situacaoSalva = function(){

		$scope.eqpt.$save()
			.then(function(){
				console.log("lot salvo "+ $scope.eqpt.teste);
				//limpa o form
				$scope.eqpt = new Equiparada();
				buscaSituacoes();
			})
			.catch(function(erro){
				console.log("não foi possivel salvar a situação "+ erro);
			});


	};


	function buscaLotacoes(){

		Lotacao.query(
			function(lotacoes){
				$scope.lot = lotacoes;
			},
			function(erro){
				console.log('Não foi possível obter a lista de usuários.');
				console.log(erro);
			});

	};

	buscaLotacoes();

	$scope.removeLotation = function(lotation){

		var confirmar = confirm("Tem certeza que deseja remover esta situação.");

		if(confirmar == true){
			Lotacao.delete({id: lotation._id},
				buscaLotacoes,
				function(erro){
					console.log("Não foi possível remover a situação.");
					console.log(erro);
				});
		}
		console.log(lotation);
	};

	function verificaLotacaoId(){

		if($routeParams.lotacaoId){

			Lotacao.get({id: $routeParams.lotacaoId},
			function(lotacao){
				$scope.lotacao = lotacao;

			},
			function(erro){
				console.log(erro);
				console.log('não foi possível obter o equipamento');
			});
		}else{
			//cria um novo objeto equipamento
			$scope.lotacao = new Lotacao();
		}

	};

	verificaLotacaoId();


	$scope.salvaLotacao = function(){

			$scope.lotacao.$save()
			.then(function(){
				console.log("lot salvo "+ $scope.lotacao.teste);
				//limpa o form
				$scope.lotacao = new Lotacao();
				buscaLotacoes();
			})
			.catch(function(erro){
				console.log("não foi possivel salvar o memorando "+ erro);
			});

	};

	function buscaOperacao(){

		Operacao.query(
			function(operacoes){
				$scope.operacoes = operacoes;
			},
			function(erro){
				console.log('Não foi possível obter as operações.');
				console.log(erro);
			});

	};

	buscaOperacao();

	$scope.removeOperation = function(operation){

		var confirmar = confirm("Tem certeza que deseja remover esta situação.");

		if(confirmar == true){
			Operacao.delete({id: operation._id},
				buscaOperacao,
				function(erro){
					console.log("Não foi possível remover a situação.");
					console.log(erro);
				});
		}
		console.log(operation);
	};


	function verificaOperacaoId(){

		if($routeParams.operacaoId){

			Operacao.get({id: $routeParams.operacaoId},
			function(opr){
				$scope.opr = opr;

			},
			function(erro){
				console.log(erro);
				console.log('não foi possível obter a operação.');
			});
		}else{
			//cria um novo objeto equipamento
			$scope.opr = new Operacao();
		}

	};

	verificaOperacaoId();

	$scope.operacaoSalva = function(){

		$scope.opr.$save()
			.then(function(){
				//console.log("opr salvo ");
				//limpa o form
				$scope.opr = new Operacao();
				buscaOperacao();
			})
			.catch(function(erro){
				console.log("não foi possivel salvar a operação "+ erro);
			});

	};



	function buscaModeloEquipamentos () {
		Equipamento.query(
			function(equipamentos){
				$scope.modeloequipamentos = equipamentos;
			},
			function(erro){
				console.log('Não foi possível obter os equipamentos.');
				console.log(erro);
			});
	};

	function verificaMemorandoEquipamentoId(){
		if($routeParams.memorandoEquipamentoId){
			Situacao.get({id: $routeParams.memorandoEquipamentoId},
			function(memorandoequipamento){
				$scope.memorandoequipamento = memorandoequipamento;
			},
			function(erro){
				console.log(erro);
				console.log('não foi possível obter o equipamento');
			});
		}else{
			//cria um novo objeto equipamento
			$scope.memorandoequipamento = new Equipamento();
		}
	};

	verificaMemorandoEquipamentoId();
	buscaModeloEquipamentos();

	$scope.removeModeloEquipamento = function(equipamento){
		var confirmar = confirm("Tem certeza que deseja remover este equipamento?");
		if(confirmar == true){
			Equipamento.delete({id: equipamento._id},
				buscaModeloEquipamentos,
				function(erro){
					console.log("Não foi possível remover a situação.");
					console.log(erro);
				});
		}
		//console.log(operation);
	};

	$scope.modeloEquipamentoSalva = function () {
		console.log($scope.memorandoequipamento);
		$scope.memorandoequipamento.$save().then(function () {
			console.log('Modelo de equipamento salvo.');
			$scope.memorandoequipamento = new Equipamento();
			buscaModeloEquipamentos();
		}).catch(function () {
			console.log('Não foi possíve salvar a operação.');
		});
	}; //final da função modeloEquipamentoSalva

});
