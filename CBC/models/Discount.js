const mysql = require('../config/db')
class Discount {
  static async DeleteDiscount(id , title) {   
    return new Promise(resolve => {
      const query = `DELETE FROM discount WHERE storeId = ? AND title = ? `;
      mysql.query(query, [id , title], (error, result) => {
          if (!error) {
              resolve('تم الحذف بنجاح');
          } else {
              console.error(error);
          }
      });
  });
}

  static async DashDeleteDiscount(id) {   
    return new Promise(resolve => {
      const query = `DELETE FROM discount WHERE id = ?`;
      mysql.query(query, [id], (error, result) => {
          if (!error) {
              resolve('تم الحذف بنجاح');
          } else {
              console.error(error);
          }
      });
  });
}

    static async GetRecently(){
        return new Promise(resolve=>{
            mysql.query('select * from discount ORDER BY id DESC' , [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
    static async GetDiscount(id){
      return new Promise(resolve=>{
          mysql.query('select * from discount where id = ?' , [id], (error , result)=>{
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


      static async EditDiscount(storeId, title, discount , idDiscount) {
        return new Promise((resolve, reject) => {
          // First, fetch the store and image from the stories table
          const fetchStoreQuery = 'SELECT name, logo FROM stories WHERE id = ?';
          mysql.query(fetchStoreQuery, [storeId], (error, results) => {
            if (error) {
              console.log(error);
              return resolve(error);
            }
      
            if (results.length === 0) {
              console.log('not found');
              return resolve(new Error('Store not found'));
            }
      
            const { name: store, logo: image } = results[0];
            // Now, insert the new discount record
            //UPDATE discount SET title = ?, discount = ? WHERE storeId = ?
            const insertDiscountQuery = 'UPDATE discount SET store = ?, discount = ?, image = ?, storeId = ? , title = ? WHERE id = ?';
            mysql.query(insertDiscountQuery, [store, discount, image, storeId, title , idDiscount], (error, results) => {
              if (error) {
                console.log(error);
                return resolve(error);
              }
              
              resolve("تمت التعديل بنجاح");
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