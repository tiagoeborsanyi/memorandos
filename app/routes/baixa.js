function verifica(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.status('401').json('não autorizado');
	}
};

module.exports = function (app) {

  var controller = app.controllers.baixa;

  app.route('/baixa/equipamento/')
    .get(controller.listaBaixas)
    .post(controller.salvaBaixa);

  app.route('baixa/equipamento/:id')
    .get(controller.obtemBaixa)
    .delete(controller.removeBaixa);



};
