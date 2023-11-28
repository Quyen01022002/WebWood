const Product=require('../../models/Product')
const Category=require('../../models/Category')
const Order=require('../../models/Orther')
const User = require('../../models/User')
const { mutipleMongooseToObject,mongooseToObject } =require('../../util/mongoose');
const { HttpStatusCode } = require('axios');
//const { TRUE } = require('node-sass');
let messageError;
class Admincontroller{
    

   products(req, res) {
    var page = req.query.page;
      var quanlity  = req.query.quanlity;
        const fetchData = async () => {
          try {
            if (page) page = parseInt(page);
            else page = 1;
            if (quanlity) quanlity = parseInt(quanlity);
            else quanlity = 6;
            var skip = (page - 1)*quanlity;
            let products;
            products = await Product.find({}).skip(skip).limit(quanlity);
            var countPage = Math.ceil((await Product.find({})).length/quanlity) ;
         
            
            const data = {
              product: mutipleMongooseToObject(products),
              slsp:products.length,
              isAdmin: true,
              countPage: countPage,
              pageCurrent: page,
              quanlity: quanlity,
              
            };

            res.render("layouts/admin/product/products",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.status(HttpStatusCode.InternalServerError).send('Lỗi khi lấy dữ liệu');
          }
        };
        
      
        fetchData();
          
      }

      async deleteProduct(req, res) {
        try {
         // const productId = req.params.slug; // ID của sản phẩm cần xóa
    
          // Sử dụng Mongoose để xóa sản phẩm dựa vào ID
          const deletedProduct = await Product.findOneAndDelete({slug:req.params.slug});
    
          if (!deletedProduct) { 
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
          }
    
          // Nếu xóa thành công, có thể cập nhật lại dữ liệu hoặc trả về thông báo thành công
          // Ví dụ cập nhật lại danh sách sản phẩm trước khi render lại trang
          const updatedProducts = await Product.find({}); // Lấy danh sách sản phẩm cập nhật
          // ... (cập nhật dữ liệu hoặc làm bất kỳ thứ gì cần thiết)
    
          return res.status(200).json({ message: 'Đã xóa sản phẩm thành công rồi nha', deletedProduct });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Lỗi khi xóa sản phẩm' });
        }
      }
      
      addNewProduct(req, res) {
        const fetchData = async () => {
          try {
            let orders = await Order.find({}).skip(0).limit(5);

            const data = {
              orderCurrent: mutipleMongooseToObject(orders),
              isAdmin: true
              
            };

            res.render("layouts/admin/product/addproduct",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.status(HttpStatusCode.InternalServerError).send('Lỗi khi lấy dữ liệu');
          }
        };
      
        fetchData();     
    }

      async addProduct(req, res) {
        try {




          // Lưu sản phẩm mới vào cơ sở dữ liệu
          const savedProduct = await newProduct.save();
      
          // Trả về thông báo hoặc dữ liệu sản phẩm đã được thêm
          res.status(201).json({ message: 'Sản phẩm đã được thêm thành công', product: savedProduct });
        } catch (error) {
          console.error('Lỗi khi thêm sản phẩm:', error);
          res.status(500).json({ message: 'Lỗi khi thêm sản phẩm' });
        }
      }
    categories(req, res) {
      var page = req.query.page;
      var quanlity  = req.query.quanlity;
        const fetchData = async () => {
          try {
            if (page) page = parseInt(page);
            else page = 1;
            if (quanlity) quanlity = parseInt(quanlity);
            else quanlity = 6;
            var skip = (page - 1)*quanlity;
            let categories;
            categories = await Category.find({})
            .skip(skip).limit(quanlity);
            var countPage = Math.ceil((await Category.find({})).length/quanlity) ;
        
            const data = {
              category: mutipleMongooseToObject(categories),
              isAdmin: true,
              countPage: countPage,
              pageCurrent: page,
              quanlity: quanlity
            };
            res.render("layouts/admin/category/categories",data);
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.status(HttpStatusCode.InternalServerError).send('Lỗi khi lấy dữ liệu');
          }
        };
      
        fetchData();
          
      }

      addNewCategory(req, res) {
        const fetchData = async () => {
          try {
            const data = {
              isAdmin: true,
              message: messageError
            };

            res.render("layouts/admin/category/addcategory",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.status(HttpStatusCode.InternalServerError).send('Lỗi khi lấy dữ liệu');
          }
        };
      
        fetchData();     
    }
    async addCategory(req, res) {
      
        try {
          // const catename = req.body.catename;
          // const imgage = req.body.avatarImagePath; // Lấy thông tin sản phẩm từ body của request
            const catename = req.body.catename;
            const imgage = req.body.avatarImagePath;

            const existingCategory = await Category.findOne({ catename: catename });

    if (existingCategory) {
      messageError = "Danh mục đã tồn tại";
      return res.redirect('/admin/categories/add-category');
    }
          const newCategory = new Category({
            catename: catename,
            imgage: imgage
            // Thêm các trường thông tin sản phẩm khác nếu cần
          });
      
          const savedCategory = await newCategory.save();         
          res.redirect('/admin/categories');
          //return res.status(201).json({ message: 'Sản phẩm đã được thêm thành công', category: savedCategory });
        } catch (error) {
          console.error(error);
          // Xử lý lỗi ở đây nếu cần
          return res.status(HttpStatusCode.InternalServerError).send('Lỗi khi lấy dữ liệu á');
        }  
  }
  async deleteCategory(req, res) {
    try {
     // const productId = req.params.slug; // ID của sản phẩm cần xóa

      // Sử dụng Mongoose để xóa sản phẩm dựa vào ID
      const deletedCategory = await Category.findOneAndDelete({catename: req.params.catename});

      if (!deletedCategory) { 
        return res.status(404).json({ message: 'Không tìm thấy danh mục sản phẩm' });
      }

      // Nếu xóa thành công, có thể cập nhật lại dữ liệu hoặc trả về thông báo thành công
      // Ví dụ cập nhật lại danh sách sản phẩm trước khi render lại trang
      const updatedCategories = await Category.find({}); // Lấy danh sách sản phẩm cập nhật
      // ... (cập nhật dữ liệu hoặc làm bất kỳ thứ gì cần thiết)

      return res.status(200).json({ message: 'Đã xóa danh mục sản phẩm thành công rồi nha', deletedCategory });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Lỗi khi xóa danh mục sản phẩm ' });
    }
  }

      users(req, res) {
        var page = req.query.page;
      var quanlity  = req.query.quanlity;
        const fetchData = async () => {
          try {
            if (page) page = parseInt(page);
            else page = 1;
            if (quanlity) quanlity = parseInt(quanlity);
            else quanlity = 6;
            var skip = (page - 1)*quanlity;
            let users;
            users = await User.find({})
            .skip(skip).limit(quanlity);
            var countUser= (await User.find({})).length;
            var countPage = Math.ceil(countUser/quanlity) ;
                      
            const data = {
            
              user: mutipleMongooseToObject(users),
              countPage: countPage,
              pageCurrent: page,
              quanlity: quanlity,
              isAdmin: true,
              
            };

            res.render("layouts/admin/user/customer",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.status(HttpStatusCode.InternalServerError).send('Lỗi khi lấy dữ liệu');
          }
        };
      
        fetchData();
          
      }
      


      getUser(req, res) {
        const fetchData = async () => {
          try {
            const username = req.params.username;
            const userProfile =await User.findOne({username: req.params.username});
            const data = {
              isAdmin: true,
              user: mongooseToObject(userProfile),
              messageError: messageError
            };

            res.render("layouts/admin/user/userdetail",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.status(HttpStatusCode.InternalServerError).send('Lỗi khi lấy dữ liệu');
          }
        };
      
        fetchData();     
    }
      async deleteUser(req, res) {
        try {
         // const productId = req.params.slug; // ID của sản phẩm cần xóa

          const stt = req.params.status;
          const username = req.params.username;
          let isActive = stt === 'false';
      
          const updateUser = await User.findOneAndUpdate(
            {username: username},
            {status: isActive},
            {new: true}
            );
    
          if (!updateUser) { 
            return res.status(404).json({ message: 'Không tìm thấy danh mục sản phẩm' });
          }
    
          return res.status(200).json({ message: 'Đã xóa danh mục sản phẩm thành công rồi nha', updateUser });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Lỗi khi xóa danh mục sản phẩm '});
        }
      }
      async updateUser(req, res) {
        try {
         // const productId = req.params.slug; // ID của sản phẩm cần xóa
         
          let stt = req.body.customer_status === 'true';
          const username = req.params.username;
          messageError = stt;
          // return res.status(200).json({ message: 'Giá trị của status truyền xuống: ', stt, ak });
          
      
          const updateUser = await User.findOneAndUpdate(
            {username: username},
            {status: stt},
            {new: true}
            );
    
          if (!updateUser) { 
            return res.status(404).json({ message: 'Không tìm thấy danh mục sản phẩm' });
          }
          return res.redirect("/admin/users");
    
        //  return res.status(200).json({ message: 'Đã xóa danh mục sản phẩm thành công rồi nha', updateUser });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Lỗi khi xóa danh mục sản phẩm á nha'});
        }
      }
      orders(req, res) {
        var page = req.query.page;
      var quanlity  = req.query.quanlity;
        const fetchData = async () => {
          try {
            if (page) page = parseInt(page);
            else page = 1;
            if (quanlity) quanlity = parseInt(quanlity);
            else quanlity = 6;
            var skip = (page - 1)*quanlity;
            var countPage = Math.ceil((await Order.find({})).length/quanlity) ;
            let orders;
            orders = await Order.find({}).skip(skip).limit(quanlity);

            const data = {
              order: mutipleMongooseToObject(orders),
              isAdmin: true,
              countPage: countPage,
              pageCurrent: page,
              quanlity: quanlity,
              
            };

            res.render("layouts/admin/order/orders",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.status(HttpStatusCode.InternalServerError).send('Lỗi khi lấy dữ liệu');
          }
        };
      
        fetchData();
          
      }


    orderDetail(req, res,next) {
        const fetchData = async () => {
          try {
            const id= req.params.orderid;
            let order = await Order.findById(id);
            console.info(order);
            const userAcc = await User.findById(order.user_id);
            console.info(userAcc);

            let listProduct = order.products;
            console.info(listProduct);
            const data = {
              user: mongooseToObject(userAcc),
              order: mongooseToObject(order),
              listProduct: mutipleMongooseToObject(listProduct),
              isAdmin: true
              
            };

            res.render("layouts/admin/order/orderdetail",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.status(HttpStatusCode.InternalServerError).send('Lỗi khi lấy dữ liệu');
          }
        };
      
        fetchData();     
    }

      

    home(req, res,next) {
        const fetchData = async () => {
          try {
            let orders = await Order.find({}).skip(0).limit(5);

            const data = {
              orderCurrent: mutipleMongooseToObject(orders),
              isAdmin: true
              
            };

            res.render("layouts/admin/home",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.status(HttpStatusCode.InternalServerError).send('Lỗi khi lấy dữ liệu');
          }
        };
      
        fetchData();     
    }



}
   module.exports=new Admincontroller;