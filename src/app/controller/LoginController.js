const User=require('../../models/User')
const { mutipleMongooseToObject,mongooseToObject } =require('../../util/mongoose')

const nodemailer = require('nodemailer');

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
                      console.log('đã vào tới đây '+user.id);
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
    signUp = async (req, res) => {
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
            
                res.status(400).json({ error: 'Email đã tồn tại' });
              } else {
                
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'tranbuuquyen2002@gmail.com', 
                      pass: 'srobonhcbobeohfe', 
                    },
                  });
                  const otp = Math.floor(100000 + Math.random() * 900000);
               
                  const mailOptions = {
                    from: 'tranbuuquyen2002@gmail.com', 
                    to: req.body.email, 
                    subject: 'Registration Successful',
                    html: '<p>Mã xác nhận cảu bạn là: <strong>'+otp+'</strong>xin đừng chia sẽ cho người khác!</p>',
                  };
              
                
                  await transporter.sendMail(mailOptions);
              
                req.session.signUp = {
                    username: req.body.email,
                    password:req.body.password,
                    name: req.body.name,
                    phone:req.body.phone,
                    otp:otp
                    
                  };
                  console.log(req.body.password);
                  console.log("Nó nè")
                  res.status(200).json({ success: 'Đăng ký thành công' });

              }
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: 'Internal server error' });
            }
    }
    OTP = async (req, res) => {
     
           
        
      return res.render('otp');
              
    }
    CheckOtp = async (req, res) => {
      const signUpData = req.session.signUp
      console.log(req.body.otp);
      console.log(signUpData.password);
      if (req.body.otp == signUpData.otp) {
        const userData = {
          username: signUpData.username,
          email: signUpData.username, 
          password: signUpData.password,
          name: '',
          address: '',
          phone: signUpData.phone,
          avatar: '',
          role: 'user',
          status: true
        };
      
        const newUser = new User(userData);
      
        // Save the new user to the database using promises
        newUser.save()
          .then(() => {
            res.status(200).json({ success: 'Đăng ký thành công' });
          })
          .catch(err => {
            console.error('Error saving user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          });
      } else {
        res.status(400).json({ error: 'Mã OTP không đúng' });
      }
      
              
    }
}
module.exports=new Logincontroller;