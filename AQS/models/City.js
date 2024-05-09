const mysql = require('../config/db')
class City {
    static async GetAllCities(){
        return new Promise(resolve=>{
            mysql.query('select * from cities ORDER BY active DESC' , [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
}
module.exports = City;