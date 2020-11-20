const config = require("./secrets.json");
const mysql = require("mysql");

let con = null;

function connect() {
  con = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
  });
}


connect()

con.on('error', function handleError(err) {
  console.log('数据库断开了', err.code);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    connect();
  }
});

function execute(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, function(err, results) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  execute
}