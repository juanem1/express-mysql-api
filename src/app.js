'use strict';

var app = require('express')();
var bodyParser = require('body-parser');

var Tables = require('./Tables');
var DB = require('./DB');

var port = process.env.PORT || 3000;
var tables = new Tables;

 // for parsing application/json
app.use(bodyParser.json());
 // for parsing application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Home');
});

app.post('/connection', (req, res) => {
  DB.getConnection(req.body).then((resp) => {
    tables.setConnection(DB.connection);
    res.type('application/json');
    res.send({"OK": "ok"});
  });
});

app.get('/tables', (req, res) => {
  tables.getTables().then((resp) => {
    res.type('application/json');
    res.send(resp);
  });
});

app.get('/tables/:table/info', (req, res) => {
  tables.getTableInfo(req.params.table, DB_DATABASE).then((resp) => {
    res.type('application/json');
    res.send(resp);
  });
});

app.get('/tables/:table/structure', (req, res) => {
  tables.getTableStructure(req.params.table).then((resp) => {
    res.type('application/json');
    res.send(resp);
  });
});

app.get('/tables/:table/index', (req, res) => {
  tables.getTableIndex(req.params.table).then((resp) => {
    res.type('application/json');
    res.send(resp);
  });
});

app.get('/tables/:table/content', (req, res) => {
  tables.getTableContent(req.params.table).then((resp) => {
    res.type('application/json');
    res.send(resp);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
