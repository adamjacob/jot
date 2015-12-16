var fs = require('fs');

module.exports = function(path){

	console.log(path+'/package.json');

	var packageFile = fs.readFileSync(path+'/package.json', 'utf8');
	
	if(packageFile){
		return packageFile;
	}else{
		return false;
	}

};