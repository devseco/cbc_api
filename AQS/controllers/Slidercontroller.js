const Slider = require('../models/Slider');
class SliderController {
    static async GetAllProducts(req , res , next){
        const result = await Slider.GetAllSliders();
        if(result)
        res.send(result)
    }
}
module.exports = SliderController;