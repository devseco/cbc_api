const mysql = require('../config/db')

class Category {


    static async addCategory(title, image ,city) {
        return new Promise((resolve) => {
            const query = 'INSERT INTO categories (title, image , city , active) VALUES (? , ? , ? , 1)';
            mysql.query(query, [title, image , city ], (error, result) => {
                if (!error) {
                    resolve('add Successfully');
                }else{
                    resolve(error);
                }
            });
        });
    }

    static async GetAllCategories(){
        return new Promise(resolve=>{
            mysql.query('SELECT categories.*, cities.title AS city_title FROM categories JOIN cities ON categories.city = cities.id', [], (error, result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
    

    static async GetCategory(id){
        return new Promise(resolve=>{
            mysql.query('select * from categories where city = ?' , [id], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
    

}
module.exports = Category;