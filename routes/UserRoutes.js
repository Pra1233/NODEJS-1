const express=require('express');
const router=express.Router();
const userController=require('../controllers/Usercontroller');

router.post('/user/adduser',userController.postSignup);

router.post('/user/login',userController.postLogin);

// router.post('/user/postexpense',userController.postExpense);

module.exports=router;

