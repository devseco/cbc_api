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
    static async getDiscount(req,res,next){
        var id = req.params.id;
        const result = await Discount.GetDiscount(id);
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
    static async DeleteDiscount(req , res , next){
        const id = req.params.id;
        const result = await Discount.DashDeleteDiscount(id);
        if(result)
        res.send(result)
    }
    static async DashDeleteDiscount(req , res , next){
        const id = req.params.id;
        const title = req.params.title;
        const result = await Discount.DeleteDiscount(id , title);
        if(result)
        res.send(result)
    }
    static async EditDiscount(req,res,next){
        var id = req.body.id;
        var title = req.body.title;
        var discount = req.body.discount;
        var idDiscount = req.body.idDiscount;
        const result = await Discount.EditDiscount(id , title , discount , idDiscount);
        if(result)
        res.send(result)
    }
}
module.exports = DiscountController;