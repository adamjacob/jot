var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var fs = require('fs');
var saveFile = require('../save-file.js');

var mainWindow = null; // Keep State Somewhere...

var loadSettingsFile = require('../load-settings.js');
var loadThemes = require('../constructors/load-theme.js');

module.exports = function() {
	// Create the browser window.
	mainWindow = new BrowserWindow({width: 800, height: 600});

	var uiPath = __dirname;
			uiPath = uiPath.replace('/app/events', '');

	// and load the index.html of the app.
	mainWindow.loadUrl('file://' + uiPath + '/ui/index.html');

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	var userSettings = loadSettingsFile();

	console.log('Theme SElected:');
	console.log(userSettings.theme);

	mainWindow.webContents.on('dom-ready', function(){
		if(userSettings.theme){
			mainWindow.webContents.send('load-theme', userSettings.theme.path);
		}
			//var css = fs.readFileSync(userSettings.theme.path, 'utf8');
			//console.log('CSS:'+css);
			//mainWindow.webContents.insertCSS(css);
	});

	// File Save
	ipc.on('save-file', function(event, arg) {
		console.log(arg);
		saveFile(arg.path, arg.contents);
	});

	// Emitted when the window is closed.
	/*mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});*/

	mainWindow.on('close', function() {
		if(mainWindow.isDocumentEdited()){
			alert('Document Has Not Been Saved!');
		}else{
			mainWindow = null;
		}
	});

	mainWindow.on('open-file', function(event, path) {
		event.preventDefault();
		var contents = fs.readFileSync(path);
		mainWindow.webContents.send('open-file', contents);
	});

	ipc.on('document-change', function(event, state) {
		event.preventDefault();
		console.log(state);
		mainWindow.setDocumentEdited(state);
	});

	loadThemes(mainWindow);

};