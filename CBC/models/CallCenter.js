const mysql = require('../config/db')
class CallCenter {
    static async getCallCenter(){
        return new Promise(resolve=>{
            mysql.query('select * from callcenter', [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
     
}
module.exports = CallCenter;