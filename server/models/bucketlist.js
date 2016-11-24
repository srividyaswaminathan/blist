
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BucketSchema = new Schema(
	{
		title: {type: String, required: true, minlength: 5},		
		description: {type: String, required: true, minlength: 10},		
		_taggedUser: { type: Schema.Types.ObjectId, ref : 'User' },
		_createdUser: { type: Schema.Types.ObjectId, ref : 'User' },
		done: {type: Boolean, required: true, default: false}
	},
	{timestamps: true}
	)


module.exports = mongoose.model('Bucket', BucketSchema);