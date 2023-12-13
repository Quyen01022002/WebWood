const mongoose = require("mongoose");

const Order = new mongoose.Schema({
  user_id:String,
  name:String,
  email:String,
  phone:String,
  Total:Number,
  Status:String,
  Address:String,
  Method:String,
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
      price: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      images: {
        type: String,
        required: true,
      },
    },
  ],
  penddingDate: Date,
  confirmDate: Date, 
  packingDate: Date,
  shippingDate: Date,
  completeDate: Date,
  cancelDate: Date,
});

const order = mongoose.model("order", Order);

module.exports = order;
