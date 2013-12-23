var litecoin = require('node-litecoin');

var client = new litecoin.Client({
  host: 'localhost',
  port: 9332,
  user: 'user',
  pass: 'password'
});

