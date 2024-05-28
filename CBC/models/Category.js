const mysql = require('../config/db')
class Category {
    static async GetAllCategories(){
        return new Promise(resolve=>{
            mysql.query('select * from categories ' , [], (error , result)=>{
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