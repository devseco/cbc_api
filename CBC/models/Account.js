const mysql = require('../config/db')
class Account {
    static async GetAccount(number){
        return new Promise(resolve=>{
            mysql.query('select * from account where number = ? ' , [number], (error , result)=>{
                if(!error){
                    resolve(result);
                }else{
                    resolve([{'error':'Not Found Card'}]);
                }
            });
        })
    }
}
module.exports = Account;