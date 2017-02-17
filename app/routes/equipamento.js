function verifica(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.status('401').json('não autorizado');
	}
};

module.exports = function(app){

	var controller = app.controllers.equipamento;

	app.route('/equipamento/situacao')
			.get(controller.situacao);

	app.route('/equipamento/operacao')
			.get(controller.operacao);

	app.route('/equipamento/transacao')
			.get(controller.transacao);

	app.route('/equipamento')
		.get(controller.listaEquipamentos)
		.post(controller.salvaEquipamento);



	//rota para deletar um memorando
	app.route('/equipamento/:id')
			.get(controller.obtemEquipamentos)
			.delete(controller.removeEquipamento);

	app.route('/equipamento/historico/:tombo')
		.get(controller.obtemHistoricoEquipamento);



};
