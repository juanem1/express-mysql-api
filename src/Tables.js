class Tables {

  constructor(connection) {
    this.connection = connection;
  }

  getQuery(qs) {
    return new Promise((resolve, reject) => {
      this.connection.query(qs, (err, response, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.stringify(response));
        }
      });
    });
  }

  getTables() {
    let qs = 'SHOW TABLES';
    return this.getQuery(qs);
  }

  getTableInfo(tableName) {
    let qs = `SELECT * FROM information_schema.TABLES WHERE TABLE_SCHEMA = '${DB_DATABASE}' AND table_name = '${tableName}'`;
    return this.getQuery(qs);
  }

  getTableStructure(tableName) {
    let qs = `DESCRIBE ${tableName}`;
    return this.getQuery(qs);
  }

  getTableContent(tableName) {
    let qs = `SELECT * FROM ${tableName} LIMIT 10`;
    return this.getQuery(qs);
  }

  getTableIndex(tableName) {
    let qs = `SHOW INDEXES FROM ${tableName}`;
    return this.getQuery(qs);
  }
}

module.exports = Tables;
