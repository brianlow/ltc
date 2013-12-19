var express = require('express');
var path = require('path');
var level = require('level');

var db = level('c:\\temp\\ltc.leveldb', {
	valueEncoding: 'json'
});

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
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
		res.send(value);
	})
});

app.listen(3000);
console.log('Listening on port 3000');