
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema(
	{
		name: {type: String, required: true, minlength: 4},		
	},
	{timestamps: true}
	)


module.exports = mongoose.model('User', UserSchema);