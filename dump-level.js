var level = require('level')

var db = level('c:\\temp\\ltc.leveldb', { valueEncoding: 'json' });

db.createReadStream()
      .on('data', console.log)
      .on('close', function () {
        db.close()
      });