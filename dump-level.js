var level = require('level');
var util = require('util');

var db = level('c:\\temp\\ltc.leveldb', {
	valueEncoding: 'json'
});

db.createReadStream()
	.on('data', function(obj) {
		console.log(util.inspect(obj, false, null));
	})
	.on('close', function() {
		db.close()
	});