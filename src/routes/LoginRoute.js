const express =require('express');
const router=express.Router();

const logincontroller=require('../app/controller/LoginController');
router.post('/',logincontroller.login);
router.post('/signup',logincontroller.signUp);
router.get('/otp',logincontroller.OTP);
router.post('/otp',logincontroller.CheckOtp);
router.get('/',logincontroller.login);
module.exports=router;