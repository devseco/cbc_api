const City = require('../models/City')
class CityController{
    static async DashGetCity(req,res,next){
        const result = await City.DashGetCity(req.params.id);
        if(result)
        res.send(result)
    }

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
    static async DeleteCity(req , res , next){
        const id = req.params.id;
        const result = await City.DashDeleteCity(id);
        if(result)
        res.send(result)
    }
    static async UpdateCity(req,res,next){
        var title  = req.body.title;
        var id  = req.body.id;
        const result = await City.UpdateCity(title , id );
        if(result)
        res.send(result)
    }

    static async UpdateImageCity(req,res,next , imageUrl ){
        var id  = req.body.id;
        const result = await City.UpdateImageCity(imageUrl , id);
        if(result)
        res.send(result)
    }
}
module.exports = CityController;