const Product=require('../../models/Product')
const Cart=require('../../models/Cart')
const { mutipleMongooseToObject,mongooseToObject } =require('../../util/mongoose')
class Cartcontroller {
    async index(req, res) {
      try {
        const user = req.session.user;
        const carts = await Cart.find({ user_id: user.id });
  
        if (carts) {
          const productList = [];
  
          for (const cart of carts) {
            if (cart.products && cart.products.length > 0) {
              for (const productInfo of cart.products) {
                const product = await Product.findById(productInfo.product_id);
                const productcart=
                {
                  name:product.name,
                  quantity:productInfo.quantity,
                  color:productInfo.color,
                  price:product.SellPrice.toLocaleString(),
                  images:product.colors.find(item=>item.name==productInfo.color).images[0].url,
                  productid:productInfo.product_id
                }
  
                if (productcart) {
                  productList.push(productcart);
                } else {
                  console.log(`Không tìm thấy sản phẩm với ID: ${productInfo.product_id}`);
                }
              }
            } else {
              console.log('Giỏ hàng không có sản phẩm.');
            }
          }
  
          return res.render('cart', { carts: productList });
        }
      } catch (error) {
        res.redirect('/login');
      }
    }
  
    async add(req, res) {
      
      try {
        const user = req.session.user;
        console.log("user"+user)
        const cart = await Cart.findOne({ user_id: user.id }).lean();
        const product = await Product.findOne({ slug: req.params.slug });
    
        const cartVersion = parseInt(req.body.cartVersion);
        const addproduct = {
          product_id: product.id,
          quantity: req.body.soluong,
          color: req.params.colors
        };
      
        if (!cart.products) {
          cart.products = [];
        }
        const existingProductIndex = cart.products.findIndex(item => (
          item.product_id.toString() === addproduct.product_id &&
          item.color === addproduct.color
        ));        
        if (existingProductIndex !== -1) {
      
          cart.products[existingProductIndex].quantity =parseInt(cart.products[existingProductIndex].quantity)+ parseInt(addproduct.quantity);
        } else {
       
          cart.products.push(addproduct);
        }
    
        await Cart.updateOne({ _id: cart._id }, { $inc: { __v: 1 }, $set: { products: cart.products } });
        const Updatecart = await Cart.find({ user_id: user.id }).lean();
        if (Updatecart) {
          const productList = [];
  
          for (const cart of Updatecart) {
            if (cart.products && cart.products.length > 0) {
              for (const productInfo of cart.products) {
                const product = await Product.findById(productInfo.product_id);
                const productcart=
                {
                  name:product.name,
                  quantity:productInfo.quantity,
                  color:productInfo.color,
                  price:product.SellPrice.toLocaleString(),
                  images:product.colors.find(item=>item.name==productInfo.color).images[0].url,
                  productid:productInfo.product_id
                }
                
              
  
                if (productcart) {
                  productList.push(productcart);
                } else {
                  console.log(`Không tìm thấy sản phẩm với ID: ${productInfo.product_id}`);
                }
              }
            } else {
              console.log('Giỏ hàng không có sản phẩm.');
            }
          }
  
          return res.render('cart', { carts: productList });
        }
  
      } catch (error) {
        res.redirect('/login');
      }
    }
    
    async change(req, res) {
      try {
        const user = req.session.user;
        const cart = await Cart.findOne({ user_id: user.id }).lean();
        if (!cart.products) {
          cart.products = [];
        }
        console.log(req.body.newQuantity);
        const existingProductIndex = cart.products.findIndex(item => (
          item.product_id.toString() === req.body.productId &&
          item.color === req.body.color
        ));    
           
        if (existingProductIndex !== -1) {
          if(req.body.newQuantity>=1)
          { 
          cart.products[existingProductIndex].quantity =req.body.newQuantity;
          }
          else
          {
            cart.products.splice(existingProductIndex, 1);
          }
        } 

        await Cart.updateOne({ _id: cart._id }, { $inc: { __v: 1 }, $set: { products: cart.products } });
        
        const Updatecart = await Cart.find({ user_id: user.id }).lean();
       
        if (Updatecart) {
          const productList = [];
  
          for (const cart of Updatecart) {
            if (cart.products && cart.products.length > 0) {
              for (const productInfo of cart.products) {
                const product = await Product.findById(productInfo.product_id);
                const productcart=
                {
                  name:product.name,
                  quantity:productInfo.quantity,
                  color:productInfo.color,
                  price:product.SellPrice.toLocaleString(),
                  images:product.colors.find(item=>item.name==productInfo.color).images[0].url,
                  productid:productInfo.product_id
                }
                if (productcart) {
                  productList.push(productcart);
                } else {
                  console.log(`Không tìm thấy sản phẩm với ID: ${productInfo.product_id}`);
                }
               
              }
            } else {
              res.render('cart', { carts: productList });
            }
          }
          console.log( productList)
         res.render('cart', { carts: productList });
        }
  
      } catch (error) {
        res.redirect('/login');
      }
     
    }
    
    
  }    
  
  module.exports = new Cartcontroller();
  