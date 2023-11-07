const express =require('express');
const router=express.Router();

const admincontroller=require('../app/controller/admin/AdminController');


router.get('/',admincontroller.home);
module.exports=router;