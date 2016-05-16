var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');

module.exports = function(){

	var schema = mongoose.Schema({

		lotacaosaida: {
			type: String,
			required: true
		},
		lotacaodestino: {
			type: String,
			required: true
		},
		numeromemorando: {
			type: String,
			required: true
		},
		assunto: {
			type: String,
			required: true
		},
		tabela: [],

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

	schema.plugin(mongoosastic, {
		hosts: [
			'localhost:9200'
		]
	});

	return mongoose.model('Memorando', schema);
};
