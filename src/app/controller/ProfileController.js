const User=require('../../models/User')
const Order=require('../../models/Orther')
const cloudinary = require('cloudinary').v2;
const { mutipleMongooseToObject,mongooseToObject } =require('../../util/mongoose')
cloudinary.config({
    cloud_name: 'dq21kejpj',
    api_key: '956346376868569',
    api_secret: 's74vWPojcmnSCeBZQgedVlQ8vnM',
  });
class ProfileController{
    index = async (req, res) => {
        const curUser=req.session.user
        let user= await User.findById(curUser.id)
        let orders = await Order.find({});
        let ordersToship = await Order.find({Status:"To Ship"});
        console.log(ordersToship)
          const data = {
            user: mongooseToObject(user),
            orders: mutipleMongooseToObject(orders),
            ordersToship:mutipleMongooseToObject(ordersToship)
          
          };
          res.render('profile',data);
              
    }

    updateAvatar = async (req, res) => {
        console.log(req.body);
        console.log(req.file);
        if (req.file) {
          
        
            // Tải hình ảnh lên Cloudinary
            try {
                const result = await cloudinary.uploader.upload(req.file.path);
                console.log(result);
                const curUser=req.session.user
                const user = await User.findOneAndUpdate(
                    { _id: curUser.id }, // Thay 'ID_nguoi_dung_cua_ban' bằng ID của người dùng cần cập nhật
                    { avatar: result.url },
                    { new: true } 
                    
                  );
                  res.redirect('/profile')
              } catch (error) {
                console.error('Lỗi khi tải lên hình ảnh:', error);
              }
          } else {
            res.status(400).send('No image file found.');
          }   
    }
    
}
module.exports=new ProfileController;