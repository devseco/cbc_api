const Card = require('../models/Card')
class CardController{
    static async getCardAbout(req,res,next){
        const result = await Card.getAboutCard();
        if(result)
        res.send(result)
    }
}
module.exports = CardController;