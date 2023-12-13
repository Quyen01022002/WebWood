const express =require('express');
const router=express.Router();

const newcontroller=require('../app/controller/Productcontroller');
router.get('/:slug/:colors',newcontroller.home);
router.post('/search',newcontroller.search);
router.get('/',newcontroller.index);

module.exports=router;