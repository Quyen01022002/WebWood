const express =require('express');
const router=express.Router();

const admincontroller=require('../app/controller/AdminController');

router.get('/login', admincontroller.login);
router.post('/login', admincontroller.loginAdmin);
router.post('/logout', admincontroller.logout);

router.get('/',admincontroller.home);
router.get('/products',admincontroller.products);
router.get('/products/add-product', admincontroller.addNewProduct);
router.post('/products/add-product', admincontroller.addProduct);
router.delete('/products/:productid', admincontroller.deleteProduct);
router.get('/products/:productid', admincontroller.getProduct);
router.post('/products/:productid', admincontroller.updateProduct);

router.get('/categories',admincontroller.categories);
router.get('/categories/add-category', admincontroller.addNewCategory);
router.post('/categories/add-category', admincontroller.addCategory);
router.delete('/categories/:categoryid', admincontroller.deleteCategory);
router.get('/categories/:categoryid', admincontroller.getCategory);
router.post('/categories/:categoryid', admincontroller.updateCategory);

router.get('/users',admincontroller.users);
router.get('/users/:userid', admincontroller.getUser);
router.post('/users/:userid', admincontroller.updateUser);
router.put('/users/:userid/:status', admincontroller.deleteUser);


router.get('/orders', admincontroller.orders);
router.get('/orders/:orderid', admincontroller.orderDetail);
router.post('/orders/:orderid', admincontroller.setStatus);


module.exports=router;