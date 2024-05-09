const Usermodel = require('../models/User');

class UserController {
    static async getAllUsers(req,res,next){
        const results = await Usermodel.getUser(req,res,next);
        if(results)
        res.send(results);
    }

    static async addnewuser(req,res,next){
        var name = req.body.name;
        var password = req.body.password;
        var email = req.body.email;
        const results = await Usermodel.addNewUser(name,password,email);
        if(results)
        res.send('Add Users Success')
        else
        res.send('Add user Failed')
    }

    static async login(req,res,next){
    const phone = req.body.phone;
    const result = await Usermodel.login(phone);
    res.send(result)
    }

}
module.exports = UserController;