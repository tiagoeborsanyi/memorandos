function verifica(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.status('401').json('não autorizado');
	}
};

module.exports = function(app){

	var controller = app.controllers.memorando;


	//criar rota para o json das lotações
	app.route('/inicio/lotacoes')
		.get(controller.listaLotacoes);


	/*****
			VAMOS CRIAR AS ROTAS PARA PAGINA DE INICIO
	*****/

	app.route('/inicio')
		.get(controller.listaMemorandos)
		.post(controller.salvaMemorando);

	//rota para deletar um memorando
	app.route('/inicio/:id')
			.get(controller.obtemMemorandos)
			.delete(controller.removeMemorando);

	app.route('/destroy/:id')
			.get(controller.destroyMemorando);

	//Rota para elasticSearch de memorandos
	app.route('/search')
			.get(controller.elasticMemorando)
			.post(controller.elasticMemorandoUrl);

};
