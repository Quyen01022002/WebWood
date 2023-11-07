
const express=require('express');
const path=require('path');
const session = require('express-session');
const {engine}=require('express-handlebars');
const route=require('./routes');
const db=require('./config/db');
const bodyParser = require('body-parser');
require('./util/handlebars-helpers.js');
//conect db
db.connect();

const port = 3000
const app = express();
//sử dụng body
app.use(bodyParser.urlencoded({ extended: true }));
//session
app.use(session({
  secret: 'quyen', 
  resave: false, // Không lưu lại phiên sau mỗi yêu cầu
  saveUninitialized: true, // Lưu phiên cho người dùng chưa được khởi tạo (ví dụ: khách truy cập)
}));
app.use(express.static(path.join(__dirname,'public')));
app.engine('handlebars',engine());
app.set('view engine', 'handlebars');
app.set('views', './src/resourse/views');
route(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})