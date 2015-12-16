var app = require('app');
var fs = require('fs');

module.exports = function(){

	var settingsPath = app.getPath('userData') + '/Preference-User.json';

	if(fs.existsSync(settingsPath)){
		var settings = fs.readFileSync(settingsPath, 'utf8');
		return JSON.parse(settings);
	}else{
		fs.writeFile(settingsPath, '{}');
		return {};
	}

};