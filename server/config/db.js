//require mongoose
var mongoose = require('mongoose');
//require file systems
var fs = require('fs');
var path = require('path');
//connect to the database
mongoose.connect("mongodb://localhost/mean_belt_exam");
//connect to models file
var models_path = path.join(__dirname, './../models' )
//read all filesysing models_path and require all js files.
fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js')>=0){
		require(models_path + '/' + file)
	}
})
