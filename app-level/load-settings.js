var app = require('app');
var fs = require('fs');

module.exports = function(){

	var settingsPath = app.getPath('userData') + '/Preference-User.json';

	try {
		console.log('TRYING TO LOAD SETTINGS');
		var settings = fs.readFileSync(settingsPath, 'utf8');
		console.log(settings);
		console.log('SETTINGS LOADED!');
		return JSON.parse(settings);
	} catch(err) {
		throw err;
		console.log('THIS THING IS ERRORING OUT');
		console.log(err);
		//fs.writeFileSync(settingsPath, '{}', 'utf-8');
		//return {};
	}

};