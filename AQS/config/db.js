const mysql = require('mysql');

const db = mysql.createPool({
 host:"localhost",
 user:'root',
 password:'',
 database:'aqsDB'
});
db.getConnection(()=>{
console.log("Connect Db is Successfully ..");
});
module.exports = db;
