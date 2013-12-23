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

function importBlock(index) {

	var context = {
		index: index
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
				transaction.type = "transaction";
				db.put(transaction.txid, transaction, group.wait());
			});
		}
	).onError(function(err) {
		console.log("Error on block " + index + ": " + err)
	});

};

for (var i = 0; i < 100; i++) {
	importBlock(i);
}