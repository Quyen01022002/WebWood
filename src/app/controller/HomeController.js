const User=require('../../models/User')
const { mutipleMongooseToObject,mongooseToObject } =require('../../util/mongoose')
class HomeController{
    index = async (req, res) => {
        const user = req.session.user;
        let islogin = false;
        if(user)
        {islogin=true;}
        return res.render('intro');
              
    }
}
module.exports=new HomeController;