const express =require('express');
const router=express.Router();

const admincontroller=require('../app/controller/AdminController');


router.get('/',admincontroller.home);
router.get('/products',admincontroller.products);
router.get('/products/add-product', admincontroller.addNewProduct);
//router.post('/products/add-product', admincontroller.addProduct);
router.delete('/products/:slug', admincontroller.deleteProduct);

router.get('/categories',admincontroller.categories);
router.get('/categories/add-category', admincontroller.addNewCategory);
router.post('/categories/add-category', admincontroller.addCategory);
router.delete('/categories/:catename', admincontroller.deleteCategory);


router.get('/users',admincontroller.users);
router.get('/users/:username', admincontroller.getUser);
router.post('/users/:username', admincontroller.updateUser);
router.put('/users/:username/:status', admincontroller.deleteUser);


router.get('/orders', admincontroller.orders);
router.get('/orders/:orderid', admincontroller.orderDetail);


module.exports=router;