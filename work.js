var litecoin = require('node-litecoin');
var level = require('level');
var Q = require("q");

var db = level('c:\\temp\\ltc.leveldb', { valueEncoding: 'json' });

var client = new litecoin.Client({
  host: 'localhost',
  port: 9332,
  user: 'user',
  pass: 'password'
});


for (var i = 0; i < 10; i++) {

	client.getBlockHash(i, (function(err, blockHash) { 
		console.log(err);
		console.log("Block hash: " + blockHash);

		client.getBlock(blockHash, function(err, block) {
			console.log("  " + err);
			console.log("  Block:  block");
			block.type = "block";
			block.blockIndex = i;
			db.put(block.hash, block);

			if (block.tx && block.tx.length > 0)
			{
				for (var t = 0; t < block.tx.length; t++) {
					console.log( "    txid: " + block.tx[t]);
					client.getRawTransaction(block.tx[t], function (err, raw) {
						client.decodeRawTransaction(raw, function(err, tx) {
							
							console.log("    ---");
							console.log("    " + tx);

							tx.type = "tx";
							tx.blockHash = blockHash;
							db.put(tx.txid, tx);

						})
					})
				};
			}
		})
	}))
	
};
