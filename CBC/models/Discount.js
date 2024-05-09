const mysql = require('../config/db')
class Discount {
    static async GetRecently(){
        return new Promise(resolve=>{
            mysql.query('select * from discount ORDER BY id DESC' , [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }

    static async GetHighest(){
        return new Promise(resolve=>{
            mysql.query('select * from discount ORDER BY discount DESC' , [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
}
module.exports = Discount;