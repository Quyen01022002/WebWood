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
        let order;
        let ordersToship = await Order.find({Status:"To Ship"});
        let ordersPendingConfirmation = await Order.find({Status:"PendingConfirmation"});
      
        console.log(order)
    
          const data = {
            user: mongooseToObject(user),
            orders: mutipleMongooseToObject(orders),
            ordersToship:mutipleMongooseToObject(ordersToship),
            PendingConfirmation:mutipleMongooseToObject(ordersPendingConfirmation),
          };
          res.render('profile',data);
              
    }
     detail = async (req, res) => {
      try {
          let order;
  
          if (req.query.productId != null) {
              order = await Order.findOne({ _id: req.query.productId });
          }
  
          if (!order) {
              res.status(404).json({ error: 'Order not found' });
              return;
          }
          console.log(order)
  
          const data = {
              Detail: mongooseToObject(order),
          };
  
          // Send JSON response instead of rendering HTML
          res.json(data);
      } catch (error) {
          console.error('Error fetching order details:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  };
  updateStatus = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
        try {
          
            const user = await Order.findOneAndUpdate(
                { _id:  req.query.productId },
                { status: "Confirmated" },
                { new: true } 
                
              );
              res.redirect('/profile')
          } catch (error) {
            console.error('Lỗi khi update status:', error);
          }

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
                    { _id: curUser.id },
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