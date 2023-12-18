const Product=require('../../models/Product')
const Cart=require('../../models/Cart')
const Order=require('../../models/Orther')
const { mutipleMongooseToObject,mongooseToObject } =require('../../util/mongoose')
const axios = require('axios');
class PaymentController {
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

        return res.render('payment', { products: productList });
      }
    } catch (error) {
      res.redirect('/login');
    }
  }
  
  async addOrder(req, res) {
    try {
      const user = req.session.user;
      const carts = await Cart.find({ user_id: user.id });

      if (carts) {
        const productList = [];
        let total =0;
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
                product_id:productInfo.product_id
              }
              //Xóa số lượng sản phẩm
              for (const color of product.colors)
              {
                if (color.name === productInfo.color)
                  {
                    color.quantity_color = color.quantity_color - productInfo.quantity;
                    product.quantity = product.quantity - productInfo.quantity;
                    product.soldquantity+=1;
                    
                  }
              }
              
              total += productInfo.quantity*product.SellPrice;
              console.log('giá cộng sp ' +total);
              const updatePro = await Product.findByIdAndUpdate(
                {_id: productInfo.product_id},
                {colors: product.colors,
                quantity: product.quantity},
                {new: true}
              )
                console.log(updatePro);
                ////////////////////////////////////

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
        const user = req.session.user;
        console.log(productList)
        let order={
        user_id:user.id,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        Total:total,
        Status:"PendingConfirmation",
        penddingDate: new Date(),
        Address:req.body.diachi,
        Method:"Tiền mặt",
        products:productList,
      }
      Order.insertMany(order)
        return res.render('intro');
      }
    } catch (error) {
      res.redirect('/login');
    }
     
    

      

      return res.render('payment');
    
     
  }

  //Xác nhận đơn hàng
  async ConfirmOrder(req,res){
    try {
      const user = req.session.user;
   
      const orderid = req.body.orderid;
  console.log("Dô")
          if (orderid)
          {
            const updateOrder = await Order.findOneAndUpdate(
              {_id: orderid},
              {Status: 'Confirmation',
              confirmDate: new Date()},
              {new: true});
           
          }
 
     } catch (error) {
       console.error(error);
       return res.redirect('/login')
     }





  }



}
   
  
  module.exports = new PaymentController();
  