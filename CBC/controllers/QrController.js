const QrModel = require('../models/qr');
class QrController{
    static async getQr(req,res,next){
        const result = await QrModel.getQr();
        if(result)
        res.send(result)
    }
}
module.exports = QrController;