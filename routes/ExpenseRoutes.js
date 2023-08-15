const express=require('express');
const router=express.Router();
const expenseController=require('../controllers/Expensecontroller');

router.post('/user/postexpense',expenseController.postExpense);

router.delete('/expense/deleteexpense/:id',expenseController.deleteExpense);


module.exports=router;