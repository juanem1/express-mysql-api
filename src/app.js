'use strict';

var mysql = require('mysql');
var express = require('express');
var Tables = require('./Tables');

var app = express();
var port = process.env.PORT || 3000;

// Tested with homestead database
const DB_HOST = '192.168.10.10';
const DB_PORT = '3306';
const DB_USERNAME = 'homestead';
const DB_PASSWORD = 'secret';
const DB_DATABASE = 'homestead';

var connection = mysql.createConnection({
  host     : DB_HOST,
  user     : DB_USERNAME,
  password : DB_PASSWORD,
  database : DB_DATABASE,
  port     : DB_PORT
});
 
connection.connect();
//connection.end();

var tables = new Tables(connection);

app.get('/', function (req, res) {
  res.send('Home');
});

app.get('/tables', function (req, res) {
  tables.getTables().then(function(resp) {
    res.type('application/json');
    res.send(resp);
  });
});

app.get('/tables/:table/info', function (req, res) {
  tables.getTableInfo(req.params.table).then(function(resp) {
    res.type('application/json');
    res.send(resp);
  });
});

app.get('/tables/:table/structure', function (req, res) {
  tables.getTableStructure(req.params.table).then(function(resp) {
    res.type('application/json');
    res.send(resp);
  });
});

app.get('/tables/:table/index', function (req, res) {
  tables.getTableIndex(req.params.table).then(function(resp) {
    res.type('application/json');
    res.send(resp);
  });
});

app.get('/tables/:table/content', function (req, res) {
  tables.getTableContent(req.params.table).then(function(resp) {
    res.type('application/json');
    res.send(resp);
  });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
