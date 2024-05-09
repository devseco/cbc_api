const City = require('../models/City')
class CityController{
    static async GetCities(req,res,next){
        const result = await City.GetAllCities();
        if(result)
        res.send(result)
    }
}
module.exports = CityController;