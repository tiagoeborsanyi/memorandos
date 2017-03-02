var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var sequence = require('mongoose-sequence');

module.exports = function () {

  var schema = mongoose.Schema({

		lotacaosaida: {
			type: String,
			required: true
		},
		lotacaodestino: {
			type: String,
			required: true
		},
		numerobaixa: {
			type: Number,
			required: true
		},
		texto: {
			type: String
		},
		tabela: [],

		nomeresponsavel: {
			type: String
		},

    descricaoresponsavel: {
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

  //schema.plugin(sequence, {inc_field: 'numerobaixa'});

	return mongoose.model('Baixa', schema);

};
