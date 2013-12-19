var litecoin = require('node-litecoin');
var level = require('level');
var Q = require("q");
var _ = require("underscore");

var db = level('c:\\temp\\ltc.leveldb', {
	valueEncoding: 'json'
});

var client = new litecoin.Client({
	host: 'localhost',
	port: 9332,
	user: 'user',
	pass: 'password'
});

var client_getBlockHash = Q.denodeify(client.getBlockHash.bind(client));
var client_getBlock = Q.denodeify(client.getBlock.bind(client));

getBlock(0)
	.then(putBlock)
	.then(console.log)
	.done();

function getBlock(i) {

	return client_getBlockHash(i)
		.then(client_getBlock)
		.then(function(block) {
			block.type = "block";
			block.index = i;
			return block;
		});
}

function putBlock(block) {
	var deferred = Q.defer();
	db.put(block.hash, block, deferred.reject);
	return deferred.promise;
}

function extractTransactionIds(block) {
	if (typeof block === "undefined")
	{
		return [];
	}
	
 		if (block.tx && block.tx.length > 0)
 		{
 			for (var t = 0; t < block.tx.length; t++) {
 				console.log( "    txid: " + block.tx[t]);
 				client.getRawTransaction(block.tx[t], function (err, raw) {

}


// client.getBlockHash(i, (function(err, blockHash) { 
// 	console.log(err);
// 	console.log("Block hash: " + blockHash);

// 	client.getBlock(blockHash, function(err, block) {
// 		console.log("  " + err);
// 		console.log("  Block:  block");
// 		block.type = "block";
// 		block.blockIndex = i;
// 		db.put(block.hash, block);

// 		if (block.tx && block.tx.length > 0)
// 		{
// 			for (var t = 0; t < block.tx.length; t++) {
// 				console.log( "    txid: " + block.tx[t]);
// 				client.getRawTransaction(block.tx[t], function (err, raw) {
// 					client.decodeRawTransaction(raw, function(err, tx) {

// 						console.log("    ---");
// 						console.log("    " + tx);

// 						tx.type = "tx";
// 						tx.blockHash = blockHash;
// 						db.put(tx.txid, tx);

// 					})
// 				})
// 			};
// 		}
// 	})
// }))

//};