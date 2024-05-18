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

}
module.exports = CardController;