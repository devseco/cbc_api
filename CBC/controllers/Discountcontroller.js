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
    static async addDiscount(req,res,next){
        var id = req.body.id;
        var title = req.body.title;
        var discount = req.body.discount;
        const result = await Discount.AddDiscount(id , title , discount);
        if(result)
        res.send(result)
    }
}
module.exports = DiscountController;