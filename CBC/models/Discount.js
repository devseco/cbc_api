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
    static async AddDiscount(storeId, title, discount) {
        return new Promise((resolve, reject) => {
          // First, fetch the store and image from the stories table
          const fetchStoreQuery = 'SELECT name, logo FROM stories WHERE id = ?';
          mysql.query(fetchStoreQuery, [storeId], (error, results) => {
            if (error) {
              return resolve(error);
            }
      
            if (results.length === 0) {
              return resolve(new Error('Store not found'));
            }
      
            const { name: store, logo: image } = results[0];
            // Now, insert the new discount record
            const insertDiscountQuery = 'INSERT INTO discount (store, discount, image, storeId, title) VALUES (?, ?, ?, ?, ?)';
            mysql.query(insertDiscountQuery, [store, discount, image, storeId, title], (error, results) => {
              if (error) {
                return resolve(error);
              }
              resolve("تمت الاضافة بنجاح");
            });
          });
        });
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