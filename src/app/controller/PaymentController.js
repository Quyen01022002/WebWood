const Product=require('../../models/Product')
const Cart=require('../../models/Cart')
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
}  
  
  module.exports = new PaymentController();
  