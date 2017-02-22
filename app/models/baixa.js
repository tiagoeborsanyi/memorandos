var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');

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
			type: String,
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

	return mongoose.model('Baixa', schema);

};
