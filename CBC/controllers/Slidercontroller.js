const Slider = require('../models/Slider');
class SliderController {
    static async GetAllProducts(req , res , next){
        const result = await Slider.GetAllSliders();
        if(result)
        res.send(result)
    }
    static async AddSlider(req,res,next , imageUrl ){
        var title  = req.body.title;
        const result = await Slider.addSlider(title , imageUrl);
        if(result)
        res.send(result)
    }
    static async DeleteSlider(req , res , next){
        const id = req.params.id;
        const result = await Slider.DashDeleteSlider(id);
        if(result)
        res.send(result)
    }
  
}
module.exports = SliderController;