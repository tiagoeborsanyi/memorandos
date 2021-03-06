function verificaAutenticacao(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.status('401').json('não autorizado');
	}
};

module.exports = function(app){

	var controller = app.controllers.configuracao;

	app.route('/configuracao/lotacao')
			.get(controller.listaLotacoes)
			.post(controller.salvaLotacao);

	app.route('/configuracao/lotacao/:id')
			.get(controller.obtemLotacao)
			.delete(controller.removeLotacao);

	app.route('/configuracao/operacao')
			.get(controller.listaOperacoes)
			.post(controller.salvaOperacao);

	app.route('/configuracao/operacao/:id')
			.get(controller.obtemOperacao)
			.delete(controller.removeOperacao);

	app.route('/configuracao/situacao')
			.get(controller.listaSituacoes)
			.post(controller.salvaSituacao);

	app.route('/configuracao/situacao/:id')
			.get(controller.obtemSituacao)
			.delete(controller.removeSituacao);

	app.route('/configuracao/situacaoequiparada')
			.get(controller.listaSituacaoEquiparada)
			.post(controller.salvaSituacaoEquiparada);

	app.route('/configuracao/situacaoequiparada/:id')
			.delete(controller.removeSitucaoEquiparada);

	app.route('/configuracao/memorandoequipamento')
			.get(controller.listaModeloEquipamento)
			.post(controller.salvaModeloEquipamento);

	app.route('/configuracao/memorandoequipamento/:id')
			.delete(controller.removeModeloEquipamento);
};
