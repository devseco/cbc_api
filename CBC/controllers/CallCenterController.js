const CallCenter = require('../models/CallCenter');
const Card = require('../models/Card')
class CallCenterController{
    static async getCallCenter(req,res,next){
        const result = await CallCenter.getCallCenter();
        if(result)
        res.send(result)
    }

}
module.exports = CallCenterController;