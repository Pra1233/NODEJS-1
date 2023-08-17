const express=require('express');
const router=express.Router();
const userController=require('../controllers/Usercontroller');

router.post('/user/adduser',userController.postSignup);

router.post('/user/login',userController.postLogin);



module.exports=router;

