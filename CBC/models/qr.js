const mysql = require('../config/db')
class QrModel {
    static async getQr(){
        return new Promise(resolve=>{
            mysql.query('select * from qr', [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
}
module.exports = QrModel;