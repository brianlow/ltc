var level = require('level')

var db = level('c:\\temp\\ltc.leveldb')

db.createKeyStream()
      .on('data', function(key) { db.del(key); })
      .on('close', function () {
        db.close()
      });