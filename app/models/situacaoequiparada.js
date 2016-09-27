var mongoose = require('mongoose');

module.exports = function(){

	var schema = mongoose.Schema({
		situacao: {
		type: [],
		required: true
		}
	});

	return mongoose.model('Situacaoequiparada', schema);	
};
