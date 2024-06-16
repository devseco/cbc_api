const Card = require('../models/Card')
class CardController{
    static async getCardAbout(req,res,next){
        const result = await Card.getAboutCard();
        if(result)
        res.send(result)
    }

    static async getCardType(req,res,next){
        const result = await Card.getTypeCard();
        if(result)
        res.send(result)
    }
    static async getCardSales(req,res,next){
        const result = await Card.getSalesCard();
        if(result)
        res.send(result)
    }
    static async getAllCardSales(req,res,next){
        const result = await Card.GetAllSales();
        if(result)
        res.send(result)
    }
    
    static async addFeatures(req,res,next){
        var title = req.body.title;
        const result = await Card.addFeatures(title);
        if(result)
        res.send(result)
    }
    static async addDoing(req,res,next){
        var title = req.body.title;
        const result = await Card.addDoing(title);
        if(result)
        res.send(result)
    }
    static async addType(req,res,next){
        var title = req.body.title;
        var price = req.body.price;
        const result = await Card.addType(title,price);
        if(result)
        res.send(result)
    }
    static async addOffer(req,res,next){
        var title = req.body.title;
        var price = req.body.price;
        const result = await Card.addOffer(title,price);
        if(result)
        res.send(result)
    }
    static async addSales(req,res,next , image){
        var name = req.body.name;
        var phone = req.body.phone;
        var city = req.body.city;
        const result = await Card.addSales(name,phone,city, image);
        if(result)
        res.send(result)
    }
    static async uploadFront(req,res,next,image){
        const result = await Card.uploadFront(image);
        if(result)
        res.send(result)
    }
    static async uploadBack(req,res,next,image){
        const result = await Card.uploadBack(image);
        if(result)
        res.send(result)
    }

//delete
static async DeleteFeatures(req , res , next){
    const id = req.params.id;
    const result = await Card.DeleteFeatures(id);
    if(result)
    res.send(result)
}
static async DeleteDoing(req , res , next){
    const id = req.params.id;
    const result = await Card.DeleteDoing(id);
    if(result)
    res.send(result)
}
static async DeleteType(req , res , next){
    const id = req.params.id;
    const result = await Card.DeleteType(id);
    if(result)
    res.send(result)
}
static async DeleteOffer(req , res , next){
    const id = req.params.id;
    const result = await Card.DeleteOffer(id);
    if(result)
    res.send(result)
}
static async DeleteSales(req , res , next){
    const id = req.params.id;
    const result = await Card.DeleteSales(id);
    if(result)
    res.send(result)
}





}
module.exports = CardController;