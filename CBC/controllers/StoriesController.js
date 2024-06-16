const Store = require('../models/Store')
const Joi = require('joi');
const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    name_kur: Joi.string(),
    description: Joi.string(),
    category: Joi.string(),
    city: Joi.string(),
    facebook: Joi.string().uri(),
    instagram: Joi.string().uri(),
    whatsapp: Joi.string(),
    telegram: Joi.string().uri()
});

const schemabranch = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().required(),
    phone: Joi.string().required(),
    location: Joi.string().required(),

});
class StoriesController {

    static async DeleteAds(req , res , next){
        const id = req.body.id;
        const image = req.body.image;
        const result = await Store.DashDeleteAds(id , image);
        if(result)
        res.send(result)
    }

    static async DeleteOffers(req , res , next){
        const id = req.body.id;
        const image = req.body.image;
        const result = await Store.DashDeleteOffers(id , image);
        if(result)
        res.send(result)
    }


    static async DeleteImages(req , res , next){
        const id = req.body.id;
        const image = req.body.image;
        const result = await Store.DashDeleteImages(id , image);
        if(result)
        res.send(result)
    }
    static async uploadAds(req , res , next , imageUrl){
        const id = req.body.id;
        const result = await Store.DashUploadAds(id , imageUrl);
        if(result)
        res.send(result)
    }
    static async uploadOffers(req , res , next , imageUrl){
        const id = req.body.id;
        const result = await Store.DashUploadOffers(id , imageUrl);
        if(result)
        res.send(result)
    }

    static async uploadImages(req , res , next , imageUrl){
        const id = req.body.id;
        const result = await Store.DashUploadImages(id , imageUrl);
        if(result)
        res.send(result)
    }


    static async addBranches(req, res, next) {
        try {
            // Validate request body against the schema
            const { error, value } = schemabranch.validate(req.body);
            // If validation fails, send back a 400 Bad Request response with the validation error
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const { id, title, phone, location } = value;
            const result = await Store.DashAddBranches(id , title , phone , location);
            
            // Send the result back to the client
            res.send(result);
        } catch (error) {
            // Handle any unexpected errors
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async updateStore(req, res, next) {
        try {
            // Validate request body against the schema
            const { error, value } = schema.validate(req.body);
            // If validation fails, send back a 400 Bad Request response with the validation error
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
    
            const { id, name, name_kur, description, category, city, facebook, instagram, whatsapp, telegram } = value;
            const result = await Store.DashUpdateStore(id, name, description, name_kur, category, city, facebook, instagram, telegram, whatsapp);
            
            // Send the result back to the client
            res.send(result);
        } catch (error) {
            // Handle any unexpected errors
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
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
            const discount = req.body.discount; 
        const result = await Store.addStore(name, logo, description, name_kur, category, city, facebook , instagram , telegram , whatsapp , images , offers , ads , branches , discount);
        res.send(result)
        }catch(error){
            console.log(error)
        }
    }
  static async DeleteStore(req , res , next){
    const id = req.params.id;
    const result = await Store.DashDeleteStore(id);
    if(result)
    res.send(result)
}
    static async FilterStories(req , res , next){
        const name = req.params.name;
        const result = await Store.searchStore(name);
        if(result)
        res.send(result)
    }

    static async filterStoriesBy(req , res , next){
        const cate = req.params.cate;
        const city = req.params.city;
        const orderby = req.params.orderby;
        const result = await Store.GetByFilter(cate , city , orderby);
        if(result)
        res.send(result)
    }
    static async filterAllStories(req , res , next){
        const orderby = req.params.orderby;
        const city = req.params.city;
        const result = await Store.GetByFilterAllStories(orderby , city);
        if(result)
        res.send(result)
    }
 
}
module.exports = StoriesController;