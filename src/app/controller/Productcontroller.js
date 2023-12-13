const Product=require('../../models/Product')
const Category=require('../../models/Category')

const { mutipleMongooseToObject,mongooseToObject } =require('../../util/mongoose')
class Productcontroller{
    index(req, res) {
      const fetchData = async () => {
        try {
          let products, categories;
          let islogin = false;
          if (req.params.slug != null) {
            products = await Product.findOne({ slug: req.params.slug });
            categories = await Category.find({});
          } else {
            products = await Product.find({});
            categories = await Category.find({});
          }
        
          const user = req.session.user;
          if(user)
          {islogin=true;}
          // Gom dữ liệu lại thành một đối tượng
          const data = {
            product: mutipleMongooseToObject(products),
            category: mutipleMongooseToObject(categories),
            isLogin:islogin,
            slsp:products.length,
            
          };
          
          res.render('home', data);
          
          
        } catch (error) {
          console.error(error);
          // Xử lý lỗi ở đây nếu cần
          res.status(500).send('Lỗi khi lấy dữ liệu');
        }
      };
    
      fetchData();
        
    }
    home(req, res,next) {
      Product.findOne({slug:req.params.slug}).then((product)=>{
        let listcolors;
        product.colors.forEach(item => {
          if(item.name===req.params.colors)
          {
            listcolors=item
            
          }
        });
        const data = {
          product: mongooseToObject(product),
          colors: mongooseToObject(listcolors),
          listcolor:mutipleMongooseToObject(product.colors)
        };
        res.render('detail',data)
      }
       
        ).catch(next)
       
    }
    search(req, res) {
      const fetchData = async () => {
        try {
          let products, categories;
          let islogin = false;
          if (req.params.slug != null) {
            products = await Product.findOne({ slug: req.params.slug });
            categories = await Category.find({});
          } else {
            products = await Product.find({});
            categories = await Category.find({});
          }
          let search=req.body.search;
          console.log(search)
          search = search.toLowerCase(); 
         
          const suggestions = products.name.filter(name => name.toLowerCase().startsWith(search));
        
          const user = req.session.user;
          if(user)
          {islogin=true;}
          // Gom dữ liệu lại thành một đối tượng
          const data = {
            product: mutipleMongooseToObject(suggestions),
            category: mutipleMongooseToObject(categories),
            isLogin:islogin,
            slsp:products.length,
            
          };
          
          res.render('home', data);
          
          
        } catch (error) {
          console.error(error);
          // Xử lý lỗi ở đây nếu cần
          res.status(500).send('Lỗi khi lấy dữ liệu');
        }
      };
    
      fetchData();
        
    }
    category(req, res,next) {
      Product.findOne({slug:req.params.slug}).then((product)=>{
        res.render('detail',{product:mongooseToObject(product)});
       }
       
        ).catch(next)
       
    }
}
   module.exports=new Productcontroller;