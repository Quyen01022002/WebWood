const express =require('express');
const router=express.Router();

const PaymentController=require('../app/controller/PaymentController');

router.get('/',PaymentController.index);
router.post('/',PaymentController.index);
module.exports=router;