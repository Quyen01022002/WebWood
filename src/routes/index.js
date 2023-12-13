const Productroute=require('./Productroute');
const LoginRoute=require('./LoginRoute');
const CategoryRoute=require('./CategoryRoute');
const AdminRoute=require('./AdminRoute');
const payment=require('./PaymentRoute');
const CartRoute=require('./CartRoute');
const ProfileRoute=require("./ProfileRoute");
const HomeRoute=require("./HomeRoute");

function route(app){
    app.use('/login',LoginRoute);
    app.use('/payment',payment);
    app.use('/product',Productroute);
    app.use('/profile',ProfileRoute);
    app.use('/category',CategoryRoute);
    app.use('/cart',CartRoute);

    app.use('/',HomeRoute);
    app.use('/admin',AdminRoute);

}
module.exports=route;