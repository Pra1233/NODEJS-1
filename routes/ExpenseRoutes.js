const express=require('express');

const userauthentication=require('../middleware/auth');
const expenseController=require('../controllers/Expensecontroller');
const router=express.Router();

router.post('/user/postexpense', userauthentication.auth ,expenseController.postExpense);

router.get('/expense/getexpense', userauthentication.auth ,expenseController.getExpenses);//middleware

router.delete('/expense/deleteexpense/:id',userauthentication.auth,expenseController.deleteExpense);


module.exports=router;