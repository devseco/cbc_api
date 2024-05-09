const mysql = require('../config/db')
const auth_new = require('../middleware/auth')
class UserModel{
    static async login(phone) {
        return new Promise((resolve, reject) => {
            mysql.query('SELECT * FROM users WHERE phone = ?', [phone], (error, results) => {
                if(error) {
                    resolve({'message': error , 'status_code':400}); // Reject the promise if an error occurs
                } else {
                    if(results && results.length > 0) {
                        resolve({"message":"Login Successfully",
                        "status_code":200,
                        "user_id": results[0]['id'],
                        'access_token':auth_new.generateAccessToken({username: results[0]}),
                        'username' : results[0]['name'],
                        'phone' : results[0]['phone']
                    }); // Resolve with access token if results are found
                    } else {
                        resolve({"message":"No user found" , 'status_code':404}); // Reject if no results are found
                    }
                }
            });
        });
    }
    static async getUser(req,res,next){
        return new Promise(resolve=>{
            mysql.query('select * from users' , [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
    
    static async addNewUser(name , password , email){
        return new Promise(resolve=>{
            mysql.query('insert into users (name,password,email) values(?,?,?)' , [name,password,email],(error,r)=>{
                if(!error)
                resolve(true)
                else
                resolve(false)
            });
        })
    }
}
module.exports = UserModel;