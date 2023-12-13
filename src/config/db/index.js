const mongoose = require('mongoose');
function connect(){
    const mongoURI = 'mongodb://127.0.0.1:27017/noi_that'; 
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Kết nối MongoDB thành công');
      })
      .catch((err) => {
        console.error('Lỗi kết nối đến MongoDB:', err);
      });
   
}
module.exports={connect};