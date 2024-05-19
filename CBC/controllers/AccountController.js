const Account = require('../models/Account')
class AccountController{
    static async GetAccount(req,res,next){
        const number = req.params.number;
        const result = await Account.GetAccount(number);
        if (result.length > 0) {
            res.send(result)
        }else{
            res.send(null)
        }
       
    }
}
module.exports = AccountController;