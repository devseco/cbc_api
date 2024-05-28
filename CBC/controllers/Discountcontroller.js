const Discount = require('../models/Discount')
class DiscountController{
    //Recently
    static async getRecently(req,res,next){
        const result = await Discount.GetRecently();
        if(result)
        res.send(result)
    }
   //Highest
    static async getHighest(req,res,next){
        const result = await Discount.GetHighest();
        if(result)
        res.send(result)
    }
    static async getAll(req,res,next){
        const result = await Discount.GetRecently();
        if(result)
        res.send(result)
    }
}
module.exports = DiscountController;