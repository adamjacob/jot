var app = require('app');
var fs = require('fs');
var Menu = require('menu');
var MenuItem = require('menu-item');

var menuTemplate = require('../constructors/build-menu.js');
var readThemePackageFile = require('../read-theme-file.js');

module.exports = function(mainWindow){

	var themes = [];

	var themePath = app.getPath('userData') + '/themes';

	if (!fs.existsSync(themePath)){
		fs.mkdirSync(themePath);
	}

	try {
		fs.readdir(themePath, function(error, files) {

			// es5
			for(var i = 0, l = files.length; i < l; i++) {
				var filePath = files[i];
				if(fs.lstatSync(themePath+'/'+filePath).isDirectory()){
					var themeInfo = readThemePackageFile(themePath+'/'+filePath);
					if(themeInfo){
						themeInfo = JSON.parse(themeInfo);
						themes.push({
							label: themeInfo.name,
							themePath: themePath+'/'+filePath+'/'+themeInfo.main,
							click: function(e){
								mainWindow.webContents.send('load-theme', e.themePath);
								// Save to user settings here.
							}
						});
					}
				}

			}

			var menu = Menu.buildFromTemplate(menuTemplate(themes,mainWindow));
			Menu.setApplicationMenu(menu);

		});

	} catch(err) {
		console.log(err);
	}

};