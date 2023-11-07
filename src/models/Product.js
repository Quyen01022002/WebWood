const mongoose = require('mongoose');




const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  colors: [
    {
      name: String,
      code:String,
      images: [
        {url:String }
      ],
    }
  ],
  BuyPrice: Number,
  category: String,
  SellPrice: Number,
  quantity: Number,
  soldquantity: Number,
  brand: String,
  isselling: Boolean,
  slug: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
