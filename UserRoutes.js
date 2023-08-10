const express=require('express');
const router=express.Router();
const userController=require('../controllers/Usercontroller');

router.post('/user/addorder',userController.postAddExpense);

router.get('/user/getorder',userController.getExpense);

router.delete('/user/orderdelete/:id',userController.deleteExpense);

module.exports=router;

