const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    catename: String,
    imgage: String,
    

  });
  module.exports= mongoose.model('category',Category);