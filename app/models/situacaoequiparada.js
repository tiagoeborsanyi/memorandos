var mongoose = require('mongoose');

module.exports = function(){

	var schema = mongoose.Schema({
		situacao: []
	});

	return mongoose.model('Situacaoequiparada', schema);
};
