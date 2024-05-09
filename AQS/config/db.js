const mysql = require('mysql');

const db = mysql.createPool({
 host:"localhost",
 user:'root',
 password:'',
 database:'cbcDB'
});
db.getConnection(()=>{
console.log("Connect Db is Successfully ..");
});
module.exports = db;
