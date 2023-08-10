const express=require('express');
const router=express.Router();
const userController=require('../controllers/Usercontroller');

router.post('/user/addexpense',userController.postAddExpense);

router.get('/user/getexpense',userController.getExpense);

router.delete('/user/expensedelete/:id',userController.deleteExpense);

module.exports=router;

