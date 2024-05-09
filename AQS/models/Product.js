const mysql = require('../config/db')
class Product {

    static async getProducts(){
        return new Promise(resolve=>{
            mysql.query('select * from products', [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
    static async getProductsRecently(){
        return new Promise(resolve=>{
            mysql.query('select * from products ORDER BY id DESC', [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }

    static async searchProduct(title) {
    return new Promise(resolve => {
        const query = 'SELECT * FROM products WHERE title LIKE ? ORDER BY id DESC';
        mysql.query(query, ['%' + title + '%'], (error, result) => {
            if (!error) {
                resolve(result);
            }
        });
    });
}

    static async getProduct(id){
        return new Promise(resolve=>{
            mysql.query('select * from products where id = ?' , [id], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
    static async getProductByCategory(id){
        return new Promise(resolve=>{
            mysql.query('select * from products where category = ?' , [id], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
}
module.exports = Product;