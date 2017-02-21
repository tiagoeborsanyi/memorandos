module.exports = function(app){

	var Memorando = app.models.memorando;
	var Equipamento = app.models.equipamento;
	var Lotacao = app.models.lot;

	var controller = {};
	var resultFormat = '';

	controller.elasticMemorando = function (req, res) {
		if (req.query.q) {
			resultFormat = req.query.q.toString();
			console.log(resultFormat.toString());
			Memorando.find({$or:[
				{"tabela.tombo": {$regex: resultFormat}},
				{"tabela.situacao": {$regex: resultFormat}},
				{"tabela.local": {$regex: resultFormat}},
				{"tabela.descricao": {$regex: resultFormat}},
				{numeromemorando: {$regex: resultFormat}},
				{lotacaodestino: {$regex: resultFormat}},
				{lotacaosaida: {$regex: resultFormat}},
				{assunto: {$regex: resultFormat}},
				{observacao: {$regex: resultFormat}}
			]}).sort({data : -1}).populate('usuario').exec()
				.then(
					function(memorandos){
						res.render('search-memorandos', {data: memorandos});
						//res.json(memorandos)
						//console.log('Data Memorandos: '+memorandos);
					},
					function(erro){
						console.error('ERRO NO SERVER: ', erro);
						res.status(500).json(erro);
					});
		}
	};


	controller.listaMemorandos = function(req, res){

      var page = req._parsedOriginalUrl.query;
      console.log(page);
			Memorando.find().limit(3).skip(page*3).sort({data : -1}).populate('usuario').exec()
				.then(
					function(memorandos){
						res.json(memorandos);
					},
					function(erro){
						console.error(erro);
						res.status(500).json(erro);
					});
	};


	controller.listaLotacoes = function(req, res){

		Lotacao.find().exec()
			.then(
				function(lotacoes){
					res.json(lotacoes);
				},
				function(erro){
					console.error(erro);
					res.status(500).json(erro);
				});
	};


	controller.obtemMemorandos = function(req, res){

		var _id = req.params.id;
		Memorando.findById(_id).exec()
			.then(
				function(memorando){
					if(!memorando) throw new error('Memorando não encontrado');
					res.json(memorando);
				},
				function(erro){
					console.log(erro);
					res.status(404).json(erro);
				});

	};

	//function para remover o memorando
	controller.removeMemorando = function(req, res){

		var _id = req.params.id;
		console.log('ID: ', _id);
		Memorando.remove({"_id" : _id}).exec()
			.then(
				function(){
					res.status(204).end();
				},
				function(erro){
					return console.error(erro);
				});
	};

	controller.destroyMemorando = function (req, res) {
		var _id = req.params.id;
		Memorando.remove({"_id" : _id}).exec()
			.then(
				function(){
					res.status(204).end();
					res.redirect('/home#/inicio');
				},
				function(erro){
					return console.error(erro);
				});
	};

	controller.salvaMemorando = function(req, res){

		var _id = req.body._id;


		var dados = {
			"lotacaosaida" : req.body.lotacaosaida,
			"lotacaodestino" : req.body.lotacaodestino,
			"numeromemorando" : req.body.numeromemorando,
			"assunto" : req.body.assunto,
			"tabela" : req.body.tabela,
			"observacao" : req.body.observacao,
			"usuario" : req.user._id
		};


		//console.log("reqBody "+req.body.tabela[0].tombo);

		if(_id){

			Memorando.findByIdAndUpdate(_id, dados).exec()
				.then(
					function(memorando){
						console.log('MEMORANDO '+memorando);
						res.json(memorando);
					},
					function(erro){
						console.error(erro);
						res.status(500).json(erro);
					});

			for(var i = 0; i < req.body.tabela.length; i++){

			var tab = {
				"tombo" : req.body.tabela[i].tombo,
				"descricao" : req.body.tabela[i].descricao,
				"local" : req.body.tabela[i].local,
				"situacao" : req.body.tabela[i].situacao[0].situacao[0].memorando,
				"lotacaosaida" : req.body.lotacaosaida,
				"lotacaodestino" : req.body.lotacaodestino,
				"assunto" : req.body.assunto
			};

			Equipamento.create(tab)
				.then(
					function(equipamento){
						res.status(201).json(equipamento);
					},
					function(erro){
						console.log(erro);
						res.status(500).json(erro);
					});
			}


		}else{


			for(var i = 0; i < req.body.tabela.length; i++){

				console.log("situacao: "+req.body.tabela[i].situacao[0].situacao[0].memorando);

			var tab = {
				"tombo" : req.body.tabela[i].tombo,
				"descricao" : req.body.tabela[i].descricao,
				"local" : req.body.tabela[i].local,
				"situacao" : req.body.tabela[i].situacao[0].situacao[0].memorando,
				"lotacaosaida" : req.body.lotacaosaida,
				"lotacaodestino" : req.body.lotacaodestino,
				"assunto" : req.body.assunto
			};

			Equipamento.create(tab)
			.then(
				function(equipamento){
					res.status(201).json(equipamento);
				},
				function(erro){
					console.log(erro);
					res.status(500).json(erro);
				});
		}


			Memorando.create(dados)
				.then(
					function(memorando){
						res.status(201).json(memorando);
					},
					function(erro){
						console.log(erro);
						res.status(500).json(erro);
					});
		}

	};

	return controller;
};
