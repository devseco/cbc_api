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
    static async DashGetCity(id){
        return new Promise(resolve=>{
            mysql.query('select * from cities where id = ?' , [id], (error , result)=>{
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
    static async DashDeleteCity(id) {   
        return new Promise(resolve => {
          const query = `DELETE FROM cities WHERE id = ?`;
          mysql.query(query, [id], (error, result) => {
              if (!error) {
                  resolve('تم الحذف بنجاح');
              } else {
                  console.error(error);
              }
          });
      });
  }
  static async UpdateCity(title , id ) {
    return new Promise((resolve) => {
        const query = 'UPDATE cities SET title = ? WHERE id = ?';
        mysql.query(query, [title, id], (error, result) => {
            if (!error) {
                resolve('تم حفظ التعديلات');
            } else {
                resolve(error);
            }
        });
    });
}

  static async UpdateImageCity(image, id) {
    return new Promise((resolve) => {
        const query = 'UPDATE cities SET image = ? WHERE id = ?';
        mysql.query(query, [image,id], (error, result) => {
            if (!error) {
                resolve('Update Successfully');
            } else {
                resolve(error);
            }
        });
    });
}
}
module.exports = City;