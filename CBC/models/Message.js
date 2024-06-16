const mysql = require('../config/db')
class MessageModel {
    static async getMessages(){
        return new Promise(resolve=>{
            mysql.query('select * from notifications ORDER BY id DESC', [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
}
module.exports = MessageModel;