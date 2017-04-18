module.exports = function (app) {

  var Baixa = app.models.baixa;
	var Equipamento = app.models.equipamento;
	var Lotacao = app.models.lot;

  var controller = {};

  controller.listaBaixas = function (req, res) {
    //Lista todas as baixas usando consultas via mongoose
		Baixa.find().exec()
			.then(
				function(baixas){
					res.json(baixas);
				},
				function(erro){
					console.error(erro);
					//error 500 => intyernal server error
					res.status(500).json(erro);
				}
			);
  };

  controller.obtemBaixa = function (req, res) {
    var _id = req.params.id;
		Baixa.findById(_id).exec()
			.then(
				function(baixa){
					if(!baixa) throw new error('baixa não encontrada.');
					res.json(baixa);
				},
				function(erro){
					console.log(erro);
					res.status(404).json(erro);
				});
  };

  controller.removeBaixa = function (req, res) {
    var id = req.params.id;
		Baixa.remove({_id : id}).exec()
			.then(
				function(){
					res.status(204).end();
				},
				function(erro){
					return console.error(erro);
				});
  };

  //função para pegar o último relatório de baixa cadastrado e consultar o numero de baixa.
  function sequence(callback){
    return Baixa.find().sort({data: -1}).limit(1).exec().then(callback);
  };


  var n = sequence(function(s){
    //console.log(s);
  });

  controller.salvaBaixa = function (req, res) {

    //console.log(req.body)
      var dados;
  		var _id = req.body._id;

      //estou usando esta função para fazer autoincremente do banco de dados, ele busca o ultimo numero no banco e depois faz o cremento
      sequence(function(s){
        console.log(s[0].numerobaixa);
        var dados = {
    			"lotacaosaida" : req.body.lotacaosaida,
    			"lotacaodestino" : req.body.lotacaodestino,
    			"numerobaixa" : s[0].numerobaixa+1, //este numero baixa é automatico, tem que fazer uma consulta no banco e retorno o ultimo numero da collection
    			"tabela" : req.body.tabela,
          "htmltexto": req.body.htmltexto,
          "objetotexto": req.body.objetotexto,
          "nomeresponsavel": req.body.nomeresponsavel,
          "descricaoresponsavel": req.body.descricaoresponsavel,
    			"usuario" : req.user._id
    		};

  		//console.log("reqBody "+req.body.tabela[0].tombo);

  		if(_id){

  			Baixa.findByIdAndUpdate(_id, req.body).exec()
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
    });
  };

  return controller;

};
