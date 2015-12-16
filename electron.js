var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var MenuItem = require('menu-item');
var dialog = require('dialog');
var ipc = require('ipc');
var fs = require('fs');
var sys = require('sys');

// Report crashes to our server?
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Events
app.on('window-all-closed', require(__dirname+'/app/events/window-all-closed.js'));
app.on('ready', require(__dirname+'/app/events/ready.js'));

var saveFile = require(__dirname+'/app/save-file.js');