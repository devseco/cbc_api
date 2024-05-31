const Category = require('../models/Category')
class Categorycontroller{
    static async GetCategory(req,res,next){
        const result = await Category.GetCategory(req.params.id);
        if(result)
        res.send(result)
    }
    static async GetAllCategories(req,res,next){
        const result = await Category.GetAllCategories();
        if(result)
        res.send(result)
    }
    static async AddGategory(req,res,next , imageUrl ){
        var title  = req.body.title;
        var city  = req.body.city;
        

        const result = await Category.addCategory(title , imageUrl , city);
        if(result)
        res.send(result)
    }
    
}
module.exports = Categorycontroller;