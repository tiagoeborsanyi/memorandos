var mongoose = require('mongoose');

module.exports = function(){

	var schema = mongoose.Schema({
		equipamento: {
		type: String,
		required: true
		}
	});

	return mongoose.model('Memorandoequipamento', schema);	
};
