
module.exports = function(app){

	var controller = app.controllers.usuario;

	app.route('/usuario')
		.get(controller.listaUsuarios)
		.post(controller.salvaUsuario);

	//rota para deletar um memorando
	app.route('/usuario/:id')
			.get(controller.obtemUsuarios)
			.delete(controller.removeUsuario);
};
