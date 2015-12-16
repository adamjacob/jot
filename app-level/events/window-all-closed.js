var app = require('app');

module.exports = function() {
	if (process.platform != 'darwin') {
		app.quit();
	}
};