const City = require('../models/City')
class CityController{
    static async GetCities(req,res,next){
        const result = await City.GetAllCities();
        if(result)
        res.send(result)
    }
    static async AddCity(req,res,next , imageUrl ){
        var title  = req.body.title;
        const result = await City.addCity(title , imageUrl);
        if(result)
        res.send(result)
    }
}
module.exports = CityController;