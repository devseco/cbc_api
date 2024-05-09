const mysql = require('../config/db')
class Bill{
    //getBills
    static async getBill(id) {
        return new Promise(resolve => {
            mysql.query('SELECT  * FROM bills JOIN sales ON bills.id = sales.bill WHERE bills.id = ?', [id], (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    resolve(error);
                }
            });
        });
    }
    //getBillsLastest
    static async getBillsLastest(id){
        return new Promise(resolve=>{
            mysql.query('select * from bills where user_id=? ORDER BY id DESC',[id] ,(error,result)=>{
                if(!error){
                    resolve(result);
                }else{
                    resolve(error);
                }
            } )
        }
        );
     }
     //getBillsBy ID
    static async getSalesById(id){
        return new Promise(resolve=>{
             mysql.query('select * from sales where bill=?',[id] ,(error,result)=>{
                 if(!error){
                     resolve(result);
                 }else{
                     resolve(error);
                 }
             } )
         }
         );
     }
     static async getBillsById(id){
        return new Promise(resolve=>{
             mysql.query('select * from bills where user_id=?',[id] ,(error,result)=>{
                 if(!error){
                     resolve(result);
                 }else{
                     resolve(error);
                 }
             } )
         }
         );
     }
    static async addSales(items, billId) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO sales (title, image, bill, count, item_id, price_item) VALUES ?';
            const values = items.map(item => [item.title, item.image, billId, item.count, item.id, item.price]);
            mysql.query(query, [values], (error, results, fields) => {
                if (error) {
                    console.error('Error inserting sales items:', error);
                    reject(error);
                } else {
                    console.log('Sales items inserted successfully');
                    resolve(true);
                }
            });
        });
    }
    
    static async addBill(name, phone, city, address, price, delivery, items , user_id) {
        return new Promise((resolve, reject) => {
            mysql.query('INSERT INTO bills (name, phone, city, address, price, delivery, status , user_id) VALUES (?, ?, ?, ?, ?, ?, 0 , ?)', [name, phone, city, address, price, delivery , user_id], (error, result) => {
                if (error) {
                    console.error("Error executing MySQL query:", error);
                    reject(error);
                } else {
                    const billId = result.insertId; // Get the ID of the newly inserted bill
                    console.log('Bill added successfully with ID:', billId);
                    // Now, add sales items
                    if (Array.isArray(items)) {
                        this.addSales(items, billId)
                            .then(success => resolve(true))
                            .catch(error => reject(error));
                    } else {
                        reject(new Error('Items should be an array'));
                    }
                }
            });
        });
    }
    



}
module.exports = Bill;