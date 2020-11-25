const config = require("./secrets.json");
const { Pool } = require("pg");
const pool = new Pool(config);


function execute(sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res && res.rows);
      }
    });
  });
}

module.exports = {
  execute
}
