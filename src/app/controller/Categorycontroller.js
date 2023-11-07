const Product=require('../../models/Product')
const Category=require('../../models/Category')
const { mutipleMongooseToObject,mongooseToObject } =require('../../util/mongoose')
class Categorycontroller{
    index(req, res) {
      const fetchData = async () => {
        try {
          
            const products = await Product.find({ category: req.params.slug });
            const categories = await Category.find({})
          
          // Gom dữ liệu lại thành một đối tượng
          const data = {
            product: mutipleMongooseToObject(products),
            category: mutipleMongooseToObject(categories),
            slsp:products.length
          };
    
          // Sau khi lấy xong dữ liệu, render trang với dữ liệu đã gom lại
          res.render('home', data);
          
          
        } catch (error) {
          console.error(error);
          // Xử lý lỗi ở đây nếu cần
          res.status(500).send('Lỗi khi lấy dữ liệu');
        }
      };
    
      fetchData();
        
    }
    
}
   module.exports=new Categorycontroller;