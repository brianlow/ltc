var express = require('express')
	, engine = require('ejs-locals')
	, path = require('path')
	, level = require('level');

var db = level('c:\\temp\\ltc.leveldb', {
	valueEncoding: 'json'
});

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index', { title: 'LTC' });
});

app.get('/id/:id([a-z0-9]+)', function(req, res) {
	var id = req.params.id;

	db.get(id, function(err, value) {
		if (err) {
			res.send("Cannot find id " + id);
			return;
		}
		if (value.type === "block")
		{
			res.render('block', value);
			return;
		}
		if (value.type === "transaction")
		{
			value.shortTxId = value.txid.substr(0, 6);
			res.render('transaction', value);
			return;
		}
		res.send(value);
	})
});

app.listen(3000);
console.log('Listening on port 3000');