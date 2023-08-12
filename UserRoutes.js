const express=require('express');
const router=express.Router();
const userController=require('../controllers/Usercontroller');

router.post('/user/adduser',userController.postAddUser);

// router.post('/user/addorder',userController.postAddOrder);

// router.get('/user/getorder',userController.getOrder);

// router.delete('/user/orderdelete/:id',userController.deleteOrder);

module.exports=router;

