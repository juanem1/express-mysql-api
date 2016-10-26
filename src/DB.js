'use strict';

var mysql = require('mysql');

module.exports = {
  connection: null,
  getConnection: function (configObj) {
    return new Promise((resolve, reject) => {
      this.connection = mysql.createConnection({
        host     : configObj.host,
        user     : configObj.username,
        password : configObj.password,
        database : configObj.database,
        port     : configObj.port
      });
      
      this.connection.connect();
      //connection.end();
      resolve();
    });
  }

};
