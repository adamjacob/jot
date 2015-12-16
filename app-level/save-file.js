var fs = require('fs');

module.exports = function(path, contents){
	console.log(path);
	console.log(contents);
	fs.writeFileSync(path, contents, 'utf-8');
};