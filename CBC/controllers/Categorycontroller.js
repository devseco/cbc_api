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
    
}
module.exports = Categorycontroller;