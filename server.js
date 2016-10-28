(function () {
  'use strict';

  // Vendor modules
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var mustacheExpress = require('mustache-express');

  // App modules
  var Tables = require('./src/server/Tables');
  var DB = require('./src/server/DB');

  var port = process.env.PORT || 3000;
  var tables = new Tables();

  // for parsing application/json
  app.use(bodyParser.json());
  // for parsing application/x-www-form-urlencoded
  //app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(__dirname + '/public'));
  
  app.engine('html', mustacheExpress());
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.post('/connection', (req, res) => {
    DB.connect(req.body).then(() => {
      res.type('application/json');
      res.send({ 'OK': 'ok' });
    });
  });

  app.get('/tables', (req, res) => {
    tables.getTables().then((resp) => {
      res.type('application/json');
      res.send(resp);
    });
  });

  app.get('/tables/:table/info', (req, res) => {
    tables.getTableInfo(req.params.table).then((resp) => {
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
  
})();
