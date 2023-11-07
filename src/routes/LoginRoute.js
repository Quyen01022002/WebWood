const express =require('express');
const router=express.Router();

const logincontroller=require('../app/controller/LoginController');

router.post('/',logincontroller.login);
router.get('/',logincontroller.login);
module.exports=router;