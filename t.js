var levelup = require('level')

// open a data store
var db = levelup('c:\\temp\\ltc.leveldb')

// a simple Put operation
db.put('name', 'Kim Jong-un', function (err) {

  // a Batch operation made up of 3 Puts
  db.batch([
      { type: 'put', key: 'spouse', value: 'Ri Sol-ju' }
    , { type: 'put', key: 'dob', value: '8 January 1983' }
    , { type: 'put', key: 'occupation', value: 'Clown' }
  ], function (err) {

    // read the whole store as a stream and print each entry to stdout
    db.createReadStream()
      .on('data', console.log)
      .on('close', function () {
        db.close()
      })
  })
})