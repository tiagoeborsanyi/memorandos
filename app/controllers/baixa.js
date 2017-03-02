module.exports = function (app) {

  var Baixa = app.models.baixa;
	var Equipamento = app.models.equipamento;
	var Lotacao = app.models.lot;

  var controller = {};

  controller.listaBaixas = function (req, res) {
    res.json({data: 'dados de baixa'});
  };

  controller.obtemBaixa = function (req, res) {

  };

  controller.removeBaixa = function (req, res) {

  };

  controller.salvaBaixa = function (req, res) {

    //res.json(req.body)

  		var _id = req.body._id;


  		var dados = {
  			"lotacaosaida" : req.body.lotacaosaida,
  			"lotacaodestino" : req.body.lotacaodestino,
  			"numerobaixa" : 1, //este numero baixa é automatico, tem que fazer uma consulta no banco e retorno o ultimo numero da collection
  			"tabela" : req.body.tabela,
        "texto": req.body.texto,
        "nomeresponsavel": req.body.nomeresponsavel,
        "descricaoresponsavel": req.body.descricaoresponsavel,
  			"usuario" : req.user._id
  		};


  		//console.log("reqBody "+req.body.tabela[0].tombo);

  		if(_id){

  			Baixa.findByIdAndUpdate(_id, dados).exec()
  				.then(
  					function(baixa){
  						console.log('Baixa ', baixa);
  						res.json(baixa);
  					},
  					function(erro){
  						console.error(erro);
  						res.status(500).json(erro);
  					});

  			for(var i = 0; i < req.body.tabela.length; i++){

  			var tab = {
  				"tombo" : req.body.tabela[i].tombo,
  				"descricao" : req.body.tabela[i].descricao,
  				"situacao" : req.body.tabela[i].situacao[i].situacao[0].memorando,
  				"lotacaosaida" : req.body.lotacaosaida,
  				"lotacaodestino" : req.body.lotacaodestino
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

  			var tab = {
  				"tombo" : req.body.tabela[i].tombo,
  				"descricao" : req.body.tabela[i].descricao,
  				"situacao" : req.body.tabela[i].situacao[i].situacao[0].memorando,
  				"lotacaosaida" : req.body.lotacaosaida,
  				"lotacaodestino" : req.body.lotacaodestino
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


  			Baixa.create(dados)
  				.then(
  					function(baixa){
  						res.status(201).json(baixa);
  					},
  					function(erro){
  						console.log(erro);
  						res.status(500).json(erro);
  					});
  		}

  };

  return controller;

};
