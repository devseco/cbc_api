const Store = require('../models/Store')
class StoriesController {
    static async GetAllStories(req , res , next){
        const city  = req.params.city;
        const cate  = req.params.cate;
        const result = await Store.GetAllStories(cate , city);
        if(result)
        res.send(result)
    }
    static async GetStoreByID(req , res , next){
        const id = req.params.id;
        const result = await Store.GetStoreByID(id);
        if(result)
        res.send(result)
    }
    static async DashGetAllStories(req , res , next){
        const result = await Store.DashGetAllStories();
        if(result)
        res.send(result)
    }
    static async addStore(req,res,next , logo , images , offers , ads){
        try{
            const name = req.body.name;
            const name_kur = req.body.name_kur;
            const description = req.body.description;
            const category = req.body.category;
            const city = req.body.city;
            const facebook  = req.body.facebook;
            const instagram  = req.body.instagram;
            const whatsapp  = req.body.whatsapp;
            const telegram  = req.body.telegram;
            const branches = req.body.branches; 
        const result = await Store.addStore(name, logo, description, name_kur, category, city, facebook , instagram , telegram , whatsapp , images , offers , ads , branches);
        res.send(result)
        }catch(error){
            console.log(error)
        }
    }
  
    
    
 
}
module.exports = StoriesController;