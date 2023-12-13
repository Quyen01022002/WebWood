const express =require('express');
const router=express.Router();

const Cartcontroller=require('../app/controller/CartController');

router.post('/:slug/:colors',Cartcontroller.add);
router.post('/changequantity',Cartcontroller.change);
router.get('/',Cartcontroller.index);
module.exports=router;