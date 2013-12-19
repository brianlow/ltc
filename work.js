var litecoin = require('node-litecoin');
var level = require('level');
var ff = require("ff");
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

var context = {
	index: 11
};

var f = ff(context,
	function(ctx) {
		f.slot(context);
		client.getBlockHash(context.index, f.slot());
	},
	function(context, blockHash) {
		f.slot(context);
		client.getBlock(blockHash, f.slot());
	},
	function(context, block) {
		block.type = "block";
		block.index = context.index;
		db.put(block.hash, block, f.wait());
		f.pass(block);
	},
	function(block) {
		f.slot(block);
		var group = f.group();
		block.tx.forEach(function(transactionId) {
			client.getRawTransaction(transactionId, group.slot());
		});
	},
	function(block, rawTransactions) {
		f.slot(block);
		var group = f.group();
		rawTransactions.forEach(function(rawTransaction) {
			client.decodeRawTransaction(rawTransaction, group.slot());
		});
	},
	function(block, transactions) {
		var group = f.group();
		transactions.forEach(function(transaction) {
			db.put(transaction.txid, transaction, f.wait());
		});
	}
).onError(function(err) {
	console.log("Error: " + err)
});


// function getBlock(i) {

// 	return client_getBlockHash(i)
// 		.then(client_getBlock)
// 		.then(function(block) {
// 			block.type = "block";
// 			block.index = i;
// 			return block;
// 		});
// }

// function putBlock(block) {
// 	var deferred = Q.defer();
// 	db.put(block.hash, block, deferred.reject);
// 	return deferred.promise;
// }

// function extractTransactionIds(block) {
// 	if (typeof block === "undefined")
// 	{
// 		return [];
// 	}

//  		if (block.tx && block.tx.length > 0)
//  		{
//  			for (var t = 0; t < block.tx.length; t++) {
//  				console.log( "    txid: " + block.tx[t]);
//  				client.getRawTransaction(block.tx[t], function (err, raw) {

// }


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