const MessageModel = require('../models/Message');
class MessagesController{
    static async getAllMessages(req,res,next){
        const result = await MessageModel.getMessages();
        if(result)
        res.send(result)
    }
}
module.exports = MessagesController;