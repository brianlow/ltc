var levelup  = require('level')
  , levelHUD = require('levelhud')

var poneys = levelup('c:\\temp\ltc.leveldb', { encoding: 'json' })

new levelHUD().use(poneys).listen(4420)
