const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    email:String,
    password: String,
    name:String,
    address:String,
    phone:String,
    avatar:String,
    role:String,
    status: Boolean

  });
  
  module.exports= mongoose.model('user',User);