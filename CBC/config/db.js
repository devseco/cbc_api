const mysql = require('mysql');

const db = mysql.createPool({
  host:"localhost",
  user:'root',
  password:'',
  database:'cbcDB'
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
