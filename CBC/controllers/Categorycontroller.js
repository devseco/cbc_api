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
    static async AddCategory(req,res,next , imageUrl ){
        var title  = req.body.title;
        var city  = req.body.city;
        const result = await Category.addCategory(title , imageUrl , city);
        if(result)
        res.send(result)
    }
    static async filterAllCategories(req , res , next){
        const orderby = req.params.orderby;
        const city = req.params.city;
        const result = await Category.GetByFilterAllCategories(orderby , city);
        if(result)
        res.send(result)
    }
    static async DeleteCategory(req , res , next){
        const id = req.params.id;
        const result = await Category.DashDeleteCategory(id);
        if(result)
        res.send(result)
    }
    static async DashGetCategory(req,res,next){
        const result = await Category.DashGetCategory(req.params.id);
        if(result)
        res.send(result)
    }
    static async UpdateCategory(req,res,next){
        var title  = req.body.title;
        var city  = req.body.city;
        var id  = req.body.id;
        const result = await Category.UpdateCategory(title , id , city);
        if(result)
        res.send(result)
    }

    
    static async UpdateImageCategory(req,res,next , imageUrl ){
        var id  = req.body.id;
        const result = await Category.UpdateImageCategory(imageUrl , id);
        if(result)
        res.send(result)
    }
    static async GetAllSlider(req,res,next){
        const result = await Category.DashGetSlider();
        if(result)
        res.send(result)
    }
    static async AddSlider(req,res,next , imageUrl ){
        var id  = req.body.id;
        const result = await Category.DashAddSlider(id,imageUrl);
        if(result)
        res.send(result)
    }
    static async DeleteSlider(req , res , next){
        const id = req.params.id;
        const result = await Category.DashDeleteSlider(id);
        if(result)
        res.send(result)
    }
    
}
module.exports = Categorycontroller;