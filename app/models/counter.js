var mongoose = require('mongoose');

module.exports = function(){

	var schema = mongoose.Schema({
		count: {
		type: Number,
		required: true
		}
	});

	return mongoose.model('Counter', schema);	
};
