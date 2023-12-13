const mongoose = require("mongoose");

const Cart = new mongoose.Schema({
  user_id:String,
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    },
  ],

});

const cart = mongoose.model("cart", Cart);

module.exports = cart;
