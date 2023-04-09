const mysql = require("mysql2");

const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  connectionLimit: 10,
  user: "root",
  password: "Lyh476622853",
  database: "coderhub",
});

connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log("数据库连接失败:", err);
    return;
  }
  connection.connect((err) => {
    if (err) {
      console.log("数据库交互失败", err);
    }
  });
});

module.exports = connectionPool.promise();
