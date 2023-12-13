const express =require('express');
const router=express.Router();

const newcontroller=require('../app/controller/Categorycontroller');
router.get('/:slug',newcontroller.index);

module.exports=router;