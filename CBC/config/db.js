const mysql = require('mysql');

const db = mysql.createPool({
  host: "185.166.188.103",
  database: 'u594579701_cbc',
  password: '@Asec1997@',
  user: 'u594579701_cbcroot'
});
// الاتصال بقاعدة البيانات والتعامل مع الأخطاء
db.getConnection((err, connection) => {
  if (err) {
    console.error("خطأ في الاتصال بقاعدة البيانات:", err);
    return;
  }
  console.log("Connect Db is Successfully ..");
});
module.exports = db;
