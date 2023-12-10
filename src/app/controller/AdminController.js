const Product=require('../../models/Product')
const Category=require('../../models/Category')
const Order=require('../../models/Orther')
const User = require('../../models/User')
const { mutipleMongooseToObject,mongooseToObject } =require('../../util/mongoose');
const { HttpStatusCode } = require('axios');
const mongoose = require('mongoose');
let isAdmin = true;
//const { TRUE } = require('node-sass');
let messageError;
class Admincontroller{
    

  login(req, res,next) {
    const fetchData = async () => {
      try {
        

        const data = {
          isAdmin: isAdmin
          
        };

        res.render("layouts/admin/auth/login",data);
        
        
      } catch (error) {
        console.error(error);
        // Xử lý lỗi ở đây nếu cần
        return res.status(HttpStatusCode.InternalServerError).send('Lỗi khi lấy dữ liệu');
      }
    };
  
    fetchData();     
}
loginAdmin(req, res,next) {
  const fetchData = async () => {
    try {
      const username = req.body.user_name;
      const pw = req.body.password;
      console.info("username: ", username);
      console.info("password: ", pw);
      let user = await User.findOne({username: username})

      if (user) {
        if (user.password === pw) {
          if (user.role === 'admin'){
            req.session.user = {
                id: user.id, 
                role: user.role
                
              };
            return res.redirect('/admin');
          }
          else{console.log('Tài khoản không đúng phân quyền truy cập');
          return res.render('layouts/admin/auth/login', { error: 'Sai phân quyền' });}
        } else {
            console.log('Sai mật khẩu');
            return res.render('layouts/admin/auth/login', { error: 'Sai mật khẩu' });
        }
    } else {
        console.log('Người dùng không tồn tại');
        return res.render('layouts/admin/auth/login', { error: 'Người dùng không tồn tại' });
    }
      
    } catch (error) {
      console.error(error);
      // Xử lý lỗi ở đây nếu cần
      return res.status(HttpStatusCode.InternalServerError).send('Lỗi khi lấy dữ liệu');
    }
  };

  fetchData();     
}
logout(req, res,next) {
  const fetchData = async () => {
    try {
      delete req.session.user;

      const data = {
        
        isAdmin: isAdmin
        
      };

      res.redirect('/admin/login');
      
      
    } catch (error) {
      console.error(error);
      // Xử lý lỗi ở đây nếu cần
      return res.status(HttpStatusCode.InternalServerError).send('Lỗi khi lấy dữ liệu');
    }
  };

  fetchData();     
}


   products(req, res) {
    var page = req.query.page;
      var quanlity  = req.query.quanlity;
      const keyword = req.query.q;
        const fetchData = async () => {
          try {
            const user = req.session.user;
            const userInfo = await User.findById(user.id);
            if (userInfo.role == 'user'){
              delete req.session.user;
                return res.redirect('/admin/login')}

            if (page) page = parseInt(page);
            else page = 1;
            if (quanlity) quanlity = parseInt(quanlity);
            else quanlity = 6;
            var skip = (page - 1)*quanlity;
            let products;
            if (keyword != null){
              products = await Product.find({
                name: { $regex: new RegExp(keyword, 'i') }, 
              }).skip(skip).limit(quanlity);
              var countPage = Math.ceil((await Product.find({ name: { $regex: new RegExp(keyword, 'i') },})).length/quanlity) ;
              //console.info(mutipleMongooseToObject(categories));
          }
          if (keyword == null){
            products = await Product.find({}).skip(skip).limit(quanlity);
            var countPage = Math.ceil((await Product.find({})).length/quanlity) ;
          }
            
            const data = {
              product: mutipleMongooseToObject(products),
              slsp:products.length,
              isAdmin: isAdmin,
              countPage: countPage,
              pageCurrent: page,
              quanlity: quanlity,
              userAdmin: mongooseToObject(userInfo),
              keyword: keyword
            };

            res.render("layouts/admin/product/products",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.redirect('/admin/login')
          }
        };
        
      
        fetchData();
          
      }
      getProduct(req, res) {
        const fetchData = async () => {
          try {
            const user = req.session.user;
            const userInfo = await User.findById(user.id);
            if (userInfo.role == 'user'){
              delete req.session.user;
                return res.redirect('/admin/login')}

            const idpro = req.params.productid;
            const product = await Product.findById(idpro);
            const categories = await Category.find({});

            const data = {
              categories: mutipleMongooseToObject(categories),
              isAdmin: isAdmin,
              product: mongooseToObject(product),
              userAdmin: mongooseToObject(userInfo)
              
            };

            res.render("layouts/admin/product/updateproduct",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.redirect('/admin/login')
          }
        };
      
        fetchData();     
    }
    async updateProduct(req, res) {
      try {
        const user = req.session.user;
          const userInfo = await User.findById(user.id);
          if (userInfo.role == 'user'){
            delete req.session.user;
              return res.redirect('/admin/login')}
        // Lưu sản phẩm mới vào cơ sở dữ liệu
        
        const idpro = req.params.productid;
        const productNew = req.body;
        console.log(productNew);
        const updateProduct = await Product.findOneAndUpdate(
          {_id: idpro},
          { name: productNew.name,
            description: productNew.description,
            category: productNew.category,
            colors: productNew.colors,
            BuyPrice: productNew.buyPrice,
            SellPrice: productNew.sellPrice,
            quantity: productNew.quantity,
            soldquantity: productNew.soldquantity,
            brand: productNew.brand,
            slug: productNew.slug,
            isselling: productNew.isSell},
            
          {new: true}

        )
        res.redirect('/admin/products');

        

    
        // Trả về thông báo hoặc dữ liệu sản phẩm đã được thêm
      
      } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
        return res.redirect('/admin/login')
      }
    }
      async deleteProduct(req, res) {
        try {
         // const productId = req.params.slug; // ID của sản phẩm cần xóa
         const user = req.session.user;
         const userInfo = await User.findById(user.id);
         if (userInfo.role == 'user'){
          delete req.session.user;
            return res.redirect('/admin/login')}
          // Sử dụng Mongoose để xóa sản phẩm dựa vào ID
          const deletedProduct = await Product.findOneAndDelete({_id:req.params.productid});
    
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
          return res.redirect('/admin/login')
        }
      }
      
      addNewProduct(req, res) {
        const fetchData = async () => {
          try {
            const user = req.session.user;
            const userInfo = await User.findById(user.id);
            if (userInfo.role == 'user'){
              delete req.session.user;
                return res.redirect('/admin/login')}
            const categories = await Category.find({});

            const data = {
              categories: mutipleMongooseToObject(categories),
              isAdmin: isAdmin,
              userAdmin: mongooseToObject(userInfo)
              
            };

            res.render("layouts/admin/product/addproduct",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.redirect('/admin/login')
          }
        };
      
        fetchData();     
    }

      async addProduct(req, res) {
        try {
          const user = req.session.user;
          const userInfo = await User.findById(user.id);
          if (userInfo.role == 'user'){
            delete req.session.user;
              return res.redirect('/admin/login')}
          // Lưu sản phẩm mới vào cơ sở dữ liệu
          

          const productNew = req.body;
          console.log(productNew);
          const proAll = await Product.find({});
          

          const newProduct = new Product({
            name: productNew.name,
            description: productNew.description,
            category: productNew.category,
            colors: productNew.colors,
            BuyPrice: productNew.buyPrice,
            SellPrice: productNew.sellPrice,
            quantity: productNew.quantity,
            soldquantity: productNew.soldquantity,
            brand: productNew.brand,
            slug: productNew.slug,
            isselling: productNew.isSell
          })
          const savePro = await newProduct.save();
          

      
          // Trả về thông báo hoặc dữ liệu sản phẩm đã được thêm
          res.redirect('/admin/products')
        } catch (error) {
          console.error('Lỗi khi thêm sản phẩm:', error);
          return res.redirect('/admin/login')
        }
      }
    categories(req, res) {
      
      var page = req.query.page;
      var quanlity  = req.query.quanlity;
      const keyword = req.query.q;
        const fetchData = async () => {
          try {
            const user = req.session.user;
            const userInfo = await User.findById(user.id);
            if (userInfo.role == 'user'){
              delete req.session.user;
                return res.redirect('/admin/login')}
            if (page) page = parseInt(page);
            else page = 1;
            if (quanlity) quanlity = parseInt(quanlity);
            else quanlity = 6;
            var skip = (page - 1)*quanlity;
            let categories;
            console.info(keyword);
if (keyword != null){
      categories = await Category.find({
        catename: { $regex: new RegExp(keyword, 'i') }, 
      }).skip(skip).limit(quanlity);
      var countPage = Math.ceil((await Category.find({ catename: { $regex: new RegExp(keyword, 'i') },})).length/quanlity) ;
      //console.info(mutipleMongooseToObject(categories));
  }
if (keyword == null){
            categories = await Category.find({})
            .skip(skip).limit(quanlity);
            var countPage = Math.ceil((await Category.find({})).length/quanlity) ;}
            //console.info(mutipleMongooseToObject(categories));
            
           const data = {
              category: mutipleMongooseToObject(categories),
              isAdmin: isAdmin,
              countPage: countPage,
              pageCurrent: page,
              keyword: keyword,
              quanlity: quanlity,
              userAdmin: mongooseToObject(userInfo)
            };
            res.render("layouts/admin/category/categories",data);
          } catch (error) {
            return res.redirect('/admin/login')
          }
        };
      
        fetchData();
          
      }

      addNewCategory(req, res) {
        const fetchData = async () => {
          try {
            const user = req.session.user;
            const userInfo = await User.findById(user.id);
            if (userInfo.role == 'user'){
              delete req.session.user;
                return res.redirect('/admin/login')}
            const data = {
              isAdmin: isAdmin,
              message: messageError,
              userAdmin: mongooseToObject(userInfo)
            };

            res.render("layouts/admin/category/addcategory",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.redirect('/admin/login')
          }
        };
      
        fetchData();     
    }
    getCategory(req, res) {
      const fetchData = async () => {
        try {
          const user = req.session.user;
            const userInfo = await User.findById(user.id);
            if (userInfo.role == 'user'){
              delete req.session.user;
                return res.redirect('/admin/login')}
            const idCate = req.params.categoryid;
            const category= await Category.findById(idCate);
          const data = {
            category: mongooseToObject(category),
            isAdmin: isAdmin,
            message: messageError,
            userAdmin: mongooseToObject(userInfo)
          };

          res.render("layouts/admin/category/updatecategory",data);
          
          
        } catch (error) {
          console.error(error);
          // Xử lý lỗi ở đây nếu cần
          return res.redirect('/admin/login')
        }
      };
    
      fetchData();     
  }
  async updateCategory(req, res) {
      
    try {
      const user = req.session.user;
            const userInfo = await User.findById(user.id);
            if (userInfo.role == 'user'){
              delete req.session.user;
                return res.redirect('/admin/login')}
      // const catename = req.body.catename;
      // const imgage = req.body.avatarImagePath; // Lấy thông tin sản phẩm từ body của request
        const catename = req.body.catename;
        const imgages = req.body.avatarImagePath;
        const id = req.params.categoryid;
console.info(id);
console.info(catename);
console.info(imgages);


        const updateCategory = await Category.findByIdAndUpdate(
          {_id: id},
          { catename: catename, imgage: imgages },
              {new: true}
          );    
          console.info(updateCategory);
      res.redirect('/admin/categories');
      //return res.status(201).json({ message: 'Sản phẩm đã được thêm thành công', category: savedCategory });
    } catch (error) {
      console.error(error);
      // Xử lý lỗi ở đây nếu cần
      return res.redirect('/admin/login')
    }  
}
    
    async addCategory(req, res) {
      
        try {
          const user = req.session.user;
            const userInfo = await User.findById(user.id);
            if (userInfo.role == 'user'){
              delete req.session.user;
                return res.redirect('/admin/login')}
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
          return res.redirect('/admin/login');
        }  
  }

  async deleteCategory(req, res) {
    try {
     // const productId = req.params.slug; // ID của sản phẩm cần xóa
     const user = req.session.user;
     const userInfo = await User.findById(user.id);
     if (userInfo.role == 'user'){
      delete req.session.user;
        return res.redirect('/admin/login')}
      // Sử dụng Mongoose để xóa sản phẩm dựa vào ID
      const deletedCategory = await Category.findByIdAndDelete({_id: req.params.categoryid});

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
      return res.redirect('/admin/login')
    }
  }

  async searchCategory(req, res) {
    try {
      const keyword = req.query.q; // Lấy từ khóa tìm kiếm từ query parameters
      const user = req.session.user;
      if (userInfo.role == 'user'){
        delete req.session.user;
          return res.redirect('/admin/login')}
            const userInfo = await User.findById(user.id);
      // Tìm kiếm danh mục theo từ khóa
      let categories = await Category.find({
        catename: { $regex: new RegExp(keyword, 'i') }, // Tìm kiếm theo tên danh mục, 'i' để không phân biệt hoa thường
      });

      // Trả về kết quả tìm kiếm

      console.info(mutipleMongooseToObject(categories));
      return null;
    } catch (error) {
      console.error(error);
      return res.redirect('/admin/login');
    }
  }
      users(req, res) {
        var page = req.query.page;
      var quanlity  = req.query.quanlity;
      const keyword = req.query.q;
        const fetchData = async () => {
          try {
            const user = req.session.user;
            const userInfo = await User.findById(user.id);
            if (userInfo.role == 'user'){
              delete req.session.user;
                return res.redirect('/admin/login')}
            if (page) page = parseInt(page);
            else page = 1;
            if (quanlity) quanlity = parseInt(quanlity);
            else quanlity = 6;
            var skip = (page - 1)*quanlity;
            let users;
            if (keyword != null){
              users = await User.find({
                $or: [
                  { name: { $regex: new RegExp(keyword, 'i') } },
                  { email: { $regex: new RegExp(keyword, 'i') } },
                  { phone: { $regex: new RegExp(keyword, 'i') } }
                ]
              }).skip(skip).limit(quanlity);
              var countPage = Math.ceil((await User.find({
                $or: [
                  { name: { $regex: new RegExp(keyword, 'i') } },
                  { email: { $regex: new RegExp(keyword, 'i') } },
                  { phone: { $regex: new RegExp(keyword, 'i') } }
                ]
              })).length/quanlity) ;
              //console.info(mutipleMongooseToObject(categories));
          }
        if (keyword == null){
            users = await User.find({})
            .skip(skip).limit(quanlity);
            var countUser= (await User.find({})).length;
            var countPage = Math.ceil(countUser/quanlity) ;
        }
            const data = {
            
              user: mutipleMongooseToObject(users),
              countPage: countPage,
              pageCurrent: page,
              quanlity: quanlity,
              isAdmin: isAdmin,
              userAdmin: mongooseToObject(userInfo),
              keyword: keyword
            };

            res.render("layouts/admin/user/customer",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.redirect('/admin/login')
          }
        };
      
        fetchData();
          
      }
      


      getUser(req, res) {
        const fetchData = async () => {
          try {
            const user = req.session.user;
            const userInfo = await User.findById(user.id);
            if (userInfo.role == 'user'){
              delete req.session.user;
                return res.redirect('/admin/login')}
            const id = req.params.userid;
            const userProfile =await User.findById(id);
            const data = {
              isAdmin: true,
              user: mongooseToObject(userProfile),
              messageError: messageError,
              userAdmin: mongooseToObject(userInfo)
            };

            res.render("layouts/admin/user/userdetail",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.redirect('/admin/login')
          }
        };
      
        fetchData();     
    }
      async deleteUser(req, res) {
        try {
         // const productId = req.params.slug; // ID của sản phẩm cần xóa
         const user = req.session.user;
         const userInfo = await User.findById(user.id);
         if (userInfo.role == 'user'){
          delete req.session.user;
            return res.redirect('/admin/login')}
          const stt = req.params.status;
          const id = req.params.userid;
          let isActive = stt === 'false';
      
          const updateUser = await User.findOneAndUpdate(
            {_id: id},
            {status: isActive},
            {new: true}
            );
    
          if (!updateUser) { 
            return res.status(404).json({ message: 'Không tìm thấy danh mục sản phẩm' });
          }
    
          return res.status(200).json({ message: 'Đã xóa danh mục sản phẩm thành công rồi nha', updateUser });
        } catch (error) {
          console.error(error);
          return res.redirect('/admin/login')
        }
      }
      async updateUser(req, res) {
        try {
         // const productId = req.params.slug; // ID của sản phẩm cần xóa
         const user = req.session.user;
            const userInfo = await User.findById(user.id);
            if (userInfo.role == 'user'){
              delete req.session.user;
                return res.redirect('/admin/login')}
          let stt = req.body.customer_status === 'true';
          const id = req.params.userid;
          messageError = stt;
          // return res.status(200).json({ message: 'Giá trị của status truyền xuống: ', stt, ak });
          
      
          const updateUser = await User.findOneAndUpdate(
            {_id: id},
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
          return res.redirect('/admin/login')
        }
      }
      orders(req, res) {
        var page = req.query.page;
      var quanlity  = req.query.quanlity;
      const keyword = req.query.q;
        const fetchData = async () => {
          try {
            const user = req.session.user;
            const userInfo = await User.findById(user.id);
            if (userInfo.role == 'user'){
              delete req.session.user;
                return res.redirect('/admin/login')}

            if (page) page = parseInt(page);
            else page = 1;
            if (quanlity) quanlity = parseInt(quanlity);
            else quanlity = 6;
            var skip = (page - 1)*quanlity;
            let orders;
            console.info('từ khóa tìm kiếm: ', keyword);
            if (keyword != null){
              const isObjectId = mongoose.Types.ObjectId.isValid(keyword);
              if (isObjectId) {
                orders = await Order.find({
                  $or: [{name: { $regex: new RegExp(keyword, 'i') } },
                {_id: keyword}
              ]
              }).skip(skip).limit(quanlity);
              var countPage = Math.ceil((await Order.find({
                $or: [{name: { $regex: new RegExp(keyword, 'i') } },
              {_id: keyword}
            ]
            })).length/quanlity) ;
             }
              else{
                 orders = await Order.find({
                  name: { $regex: new RegExp(keyword, 'i') } 
              }).skip(skip).limit(quanlity);
              var countPage = Math.ceil((await Order.find({ name: { $regex: new RegExp(keyword, 'i') },})).length/quanlity) ;
            }


          }
        if (keyword == null){
            orders = await Order.find({}).skip(skip).limit(quanlity);
            var countPage = Math.ceil((await Order.find({})).length/quanlity) ;}
            const data = {
              order: mutipleMongooseToObject(orders),
              isAdmin:isAdmin,
              countPage: countPage,
              pageCurrent: page,
              quanlity: quanlity,
              userAdmin: mongooseToObject(userInfo),
              keyword: keyword
              
            };

            res.render("layouts/admin/order/orders",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.redirect('/admin/login')
          }
        };
      
        fetchData();
          
      }


    orderDetail(req, res,next) {
        const fetchData = async () => {
          try {
            const user = req.session.user;
            const userInfo = await User.findById(user.id);
            if (userInfo.role == 'user'){
              delete req.session.user;
                return res.redirect('/admin/login')}

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
              isAdmin: isAdmin,
              userAdmin: mongooseToObject(userInfo)
              
            };

            res.render("layouts/admin/order/orderdetail",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.redirect('/admin/login')
          }
        };
      
        fetchData();     
    }
    async setStatus(req,res){
      try {
        // const productId = req.params.slug; // ID của sản phẩm cần xóa
        const user = req.session.user;
        const userInfo = await User.findById(user.id);
        if (userInfo.role == 'user'){
          delete req.session.user;
            return res.redirect('/admin/login')}
        
        const orderid = req.params.orderid;
        const status = req.body.statusOrder;
        console.log('status được nhận về: ', status);
        // if (status === 'PendingConfirmation')
        //     {
        //       const updateOrder = await Order.findOneAndUpdate(
        //         {_id: orderid},
        //         {Status: status,
        //         penddingDate: new Date()},
        //         {new: true});
        //     }
        //   if (status === 'Confirmation')
        //     {
        //       const updateOrder = await Order.findOneAndUpdate(
        //         {_id: orderid},
        //         {Status: status,
        //           confirmDate: new Date()},
        //         {new: true});
        //     }
            if (status === 'Packaging')
            {
              const updateOrder = await Order.findOneAndUpdate(
                {_id: orderid},
                {Status: status,
                packingDate: new Date()},
                {new: true});
            }
            if (status === 'OnDelivery')
            {
              const updateOrder = await Order.findOneAndUpdate(
                {_id: orderid},
                {Status: status,
                shippingDate: new Date()},
                {new: true});
            }
            if (status === 'Completed')
            {
              const updateOrder = await Order.findOneAndUpdate(
                {_id: orderid},
                {Status: status,
                completeDate: new Date()},
                {new: true});
            }
            if (status === 'OrderCancellation')
            {
              const updateOrder = await Order.findOneAndUpdate(
                {_id: orderid},
                {Status: status,
                cancelDate: new Date()},
                {new: true});
            }

        res.redirect('/admin/orders/'+orderid);


   
       //  return res.status(200).json({ message: 'Đã xóa danh mục sản phẩm thành công rồi nha', updateUser });
       } catch (error) {
         console.error(error);
         return res.redirect('/admin/login')
       }





    }



      

    home(req, res,next) {
        const fetchData = async () => {
          try {
            let orders = await Order.find({}).skip(0).limit(5);
            const user = req.session.user;
            const userInfo = await User.findById(user.id);
            if (userInfo.role == 'user'){
              delete req.session.user;
                return res.redirect('/admin/login')}

            var countOrderCompleted = (await Order.find({Status: 'Completed'})).length;
            var countOrder = (await Order.find({})).length;
            let doanhthu = 0;
            const listorders = await Order.find({});
            for (let i=0; i<listorders.length; i++){
              doanhthu += listorders[i].Total;
            }
            var countUser = (await User.find({role: 'user'})).length;

            


            console.log(countOrderCompleted);
            const data = {
              orderCurrent: mutipleMongooseToObject(orders),
              isAdmin: isAdmin,
              userAdmin: mongooseToObject(userInfo),
              countOrderCompleted: countOrderCompleted,
              countOrder: countOrder,
              doanhthu: doanhthu,
              countUser: countUser
              
            };

            res.render("layouts/admin/home",data);
            
            
          } catch (error) {
            console.error(error);
            // Xử lý lỗi ở đây nếu cần
            return res.redirect('/admin/login')
          }
        };
      
        fetchData();     
    }

}
   module.exports=new Admincontroller;