var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var MenuItem = require('menu-item');
var dialog = require('dialog');
var ipc = require('ipc');
var fs = require('fs');
var sys = require('sys');

module.exports = function(themes, mainWindow){

	var template = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Open',
				accelerator: 'Command+O',
				click: (function() {
					return dialog.showOpenDialog(mainWindow, { filters:[{ name: 'Markdown', extensions: ['md'] },{ name: 'Text', extensions: ['txt'] }], properties: [ 'openFile' ]}, function(files){

						var contents = fs.readFileSync(files[0]);

						mainWindow.setTitle(files[0].replace(/^.*[\\\/]/, ''));

						mainWindow.setRepresentedFilename(files[0]);

						mainWindow.webContents.send('open-file', contents);
						console.log(files);
					});
				})
			}, {
				type: 'separator'
			}, {
				label: 'Save',
				accelerator: 'Command+S',
				click: (function() {

					return dialog.showSaveDialog(mainWindow, { filters:[{ name: 'Markdown', extensions: ['md'] },{ name: 'Text', extensions: ['txt'] }] }, function(path){
						mainWindow.webContents.send('save-file', path);
					});

				})
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{
				label: 'Undo',
				accelerator: 'CmdOrCtrl+Z',
				role: 'undo'
			},
			{
				label: 'Redo',
				accelerator: 'Shift+CmdOrCtrl+Z',
				role: 'redo'
			},
			{
				type: 'separator'
			},
			{
				label: 'Cut',
				accelerator: 'CmdOrCtrl+X',
				role: 'cut'
			},
			{
				label: 'Copy',
				accelerator: 'CmdOrCtrl+C',
				role: 'copy'
			},
			{
				label: 'Paste',
				accelerator: 'CmdOrCtrl+V',
				role: 'paste'
			},
			{
				label: 'Select All',
				accelerator: 'CmdOrCtrl+A',
				role: 'selectall'
			},
		]
	},
	{
		label: 'View',
		submenu: [
			{
				label: 'Reload',
				accelerator: 'CmdOrCtrl+R',
				click: function(item, focusedWindow) {
					if (focusedWindow)
						focusedWindow.reload();
				}
			},
			{
				label: 'Toggle Full Screen',
				accelerator: (function() {
					if (process.platform == 'darwin')
						return 'Ctrl+Command+F';
					else
						return 'F11';
				})(),
				click: function(item, focusedWindow) {
					if (focusedWindow)
						focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
				}
			},
			{
				label: 'Toggle Developer Tools',
				accelerator: (function() {
					if (process.platform == 'darwin')
						return 'Alt+Command+I';
					else
						return 'Ctrl+Shift+I';
				})(),
				click: function(item, focusedWindow) {
					if (focusedWindow)
						focusedWindow.toggleDevTools();
				}
			},
		]
	},
	{
		label: 'Window',
		role: 'window',
		submenu: [
			{
				label: 'Minimize',
				accelerator: 'CmdOrCtrl+M',
				role: 'minimize'
			},
			{
				label: 'Close',
				accelerator: 'CmdOrCtrl+W',
				role: 'close'
			},
		]
	},
	{
		label: 'Help',
		role: 'help',
		submenu: [
			{
				label: 'Learn More',
				click: function() { require('shell').openExternal('http://electron.atom.io') }
			},
		]
	},
];

if (process.platform == 'darwin') {
	var name = require('app').getName();
	template.unshift({
		label: name,
		submenu: [
			{
				label: 'About ' + name,
				role: 'about'
			},
			{
				type: 'separator'
			},
			{
				label: 'Themes',
				submenu: themes
			},			
			{
				type: 'separator'
			},
			{
				label: 'Services',
				role: 'services',
				submenu: []
			},
			{
				type: 'separator'
			},
			{
				label: 'Hide ' + name,
				accelerator: 'Command+H',
				role: 'hide'
			},
			{
				label: 'Hide Others',
				accelerator: 'Command+Shift+H',
				role: 'hideothers'
			},
			{
				label: 'Show All',
				role: 'unhide'
			},
			{
				type: 'separator'
			},
			{
				label: 'Quit',
				accelerator: 'Command+Q',
				click: function() { app.quit(); }
			},
		]
	});
	// Window menu.
	template[3].submenu.push(
		{
			type: 'separator'
		},
		{
			label: 'Bring All to Front',
			role: 'front'
		}
	);
}

return template;

};