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
    static async addCity(title, image ) {
        return new Promise((resolve) => {
            const query = 'INSERT INTO cities (title, image  , active) VALUES (? , ? , 1)';
            mysql.query(query, [title, image], (error, result) => {
                if (!error) {
                    resolve('تمت الاضافة بنجاح');
                }else{
                    resolve(error);
                }
            });
        });
    }
}
module.exports = City;