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
 
}
module.exports = StoriesController;