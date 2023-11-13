const express =require('express');
const router=express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const ProfileController=require('../app/controller/ProfileController');


router.get('/',ProfileController.index);
router.post('/', upload.single('image'),ProfileController.updateAvatar);
module.exports=router;