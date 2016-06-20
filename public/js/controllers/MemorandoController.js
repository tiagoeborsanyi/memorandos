angular.module('memorandos').controller('MemorandoController', function($scope, $http, $routeParams, Memorando){

	$scope.filtro = '';

	/*
		Estamos buscando os dados do servidor
		passando a rota via get de qual controller queremos do express
	*/
	$scope.remove = function(memorando){

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


	function selecionaOperacao(){
		$http.get('/configuracao/operacao').success(function(operacaolista){
			$scope.operacoes = operacaolista;
		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o equipamento');
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

	selecionaSituacao();
	selecionaOperacao();

	$scope.adicionaItem = function(a) {
		if($scope.memorando.tabela === undefined || $scope.memorando.tabela === null){
			$scope.memorando.tabela = [];
			$scope.selecionalotacao = [{teste: 'Em Transito'}, {teste: 'Manutenção'}, {teste: $("#provider-json-2").val()}];
			console.log($("#provider-json-2").val());
		}
		console.log($scope.memorando.tabela);
		$scope.memorando.tabela.push({a});
	};


	$scope.removeItem = function(i) {
		$scope.memorando.tabela.splice(i, 1);
	};


	//Função para quando clicar no botão de editar ir para a pagina de edição do memorando
	if($routeParams.id){
		Memorando.get({id: $routeParams.id},
		function(memorando){
			$scope.memorando = memorando;
			$scope.selecionalotacao = [{teste: 'Em Transito'}, {teste: $scope.memorando.lotacaodestino}];
			//$scope.diamesano = formataData(memorando.data);
		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o memorando')
		});
	}else{
		//cria um novo objeto memorando
		$scope.memorando = new Memorando();
	}

	//Criamos uma function para salvar um memorando que ainda nao exista no banco de dados
	$scope.salva = function(){

		if($scope.memorando.tabela !== undefined){
			$scope.memorando.tabelas = new Array();
			var t = $scope.memorando.tabela.length;
			for(var i = 0; i < t; i++){
				$scope.memorando.tabelas.push($scope.memorando.tabela[i]);
			}
			console.log($scope.memorando.tabelas);
		}

		$scope.memorando.lotacaosaida = $("#provider-json-1").val();
		$scope.memorando.lotacaodestino = $("#provider-json-2").val();
		$scope.memorando.assunto = $("#valoroperacao option:selected").text();
		$scope.memorando.$save()
				.then(function(){
					$scope.message = "Memorando adicionado com sucesso.";
					//limpa o form
					$scope.memorando = new Memorando();
					$('#tabela-body').html('');
				})
				.catch(function(erro){
					console.log("Não foi possível salvar memorando.");
					$scope.erro = "Falha para gravar memorando";
					console.log(erro);
				})
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
