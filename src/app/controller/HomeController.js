const User=require('../../models/User')
const { mutipleMongooseToObject,mongooseToObject } =require('../../util/mongoose')
class HomeController{
    index = async (req, res) => {
        
        return res.render('intro');
              
    }
}
module.exports=new HomeController;