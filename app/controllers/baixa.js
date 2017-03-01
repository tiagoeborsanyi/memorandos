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
    res.json(req.body)
  };

  return controller;

};
