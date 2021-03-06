var mongoose = require('mongoose');

module.exports = function(){

	var schema = mongoose.Schema({

		tombo : {
			type: String,
			required: true
		},
		descricao: {
			type: String,
			required: true
		},
		situacao: {
			type: []
		},
		lotacaosaida: {
			type: String
		},
		lotacaodestino: {
			type: String
		},
		assunto: {
			type: String
		},
		local: {
			type: String
		},
		observacao: {
			type: String
		},
		usuario: {
			type: mongoose.Schema.ObjectId,
			ref: 'Usuario'
		},
		data: {
			type: Date,
			default: Date
		}



	});

	return mongoose.model('Equipamento', schema);
};
