const User=require('../../models/User')
const { mutipleMongooseToObject,mongooseToObject } =require('../../util/mongoose')
class Logincontroller{
    login = async (req, res) => {
        try {
            let user = await User.findOne({ email: req.body.username });

            if (user) {
                if (user.password === req.body.password) {
                    req.session.user = {
                        username: user.username,
                        password:user.password,
                        id: user.id
                        
                      };
                      console.log(user.id);
                    return res.redirect('/product');
                } else {
                    console.log('Sai mật khẩu');
                    return res.render('login', { error: 'Sai mật khẩu' });
                }
            } else {
                console.log('Người dùng không tồn tại');
                return res.render('login', { error: 'Người dùng không tồn tại' });
            }
        } catch (error) {
            console.error('Lỗi khi tìm kiếm người dùng:', error);
            return res.status(500).send('Đã xảy ra lỗi');
        }
    }
}
module.exports=new Logincontroller;