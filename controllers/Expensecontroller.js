const Expense=require('../models/Expense');

// const express = require('express');
// const bcrypt =require('bcrypt');
// const bodyParser = require('body-parser');

const User=require('../models/Signup');
const sequelize=require('../util/database');
// const app = express();
// // app.use (cors ());
// app.use(bodyParser.json({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));


function isstringValid(string){
if(string==undefined||string.length===0)return true;
else return false;
}

exports.postExpense=async(req,res)=>{
  const t=await sequelize.transaction();
  try{
const {amount,description,category}=req.body;
if(isstringValid(amount)||isstringValid(description)||isstringValid(category)){
  document.body.innerHTML+=`<h3 style="color:red;">${e}</h3>` 
  return res.status(400).json({e:"Bad Parameter, Something is missing"});
      }

//  const response=await Expense.create({amount,description,category,userId:req.user.id},{transaction:t});//user.id attach in middleware
const response=await req.user.createExpense({amount,description,category},{transaction:t});
const totalExpense=Number(req.user.totalExpense) + Number(amount);
await User.update({
  totalExpense:totalExpense
},{
  where:{id:req.user.id},
  transaction:t,
})

await t.commit();
res.status(200).json({expense:response})
  }
  catch(e){
      await t.rollback();
      res.status(500).json({success:false,error:e})
  }
}

exports.deleteExpense=async(req,res)=>{
  const t=sequelize.transaction();
  const id=req.params.id; 
  try{
    if(!req.params.id ||id.length===0){
      res.status(400).json({err:'Not define ID'});
      console.log("Id Is Missing");
      }  
      await User.update({
        totalExpense:totalExpense
      },{
        where:{id:req.user.id},
        transaction:t,
      })  

   const noofrows= await Expense.destroy({where:{id:id, userId:req.user.id}});//authenticate user only allowed to delete
   await User.update({

   })
   if(noofrows===0){
    return res.status(404).json({success:false,message:'Expense Doesnt belong to user'})
   }
   res.status(200).json({success:true, msg:"Deleted Successful"})
  }
  catch(e){
    res.status(500).json({error:e});
    console.log('Delete user is fail',e);
}

}

exports.getExpenses=async(req,res)=>{
  try{
//  const expenses= await req.user.getExpenses();

const expenses=await Expense.findAll({where:{userId:req.user.id}});
// const expenses=await Expense.findAll();
  res.status(200).json({success:true,getExpense:expenses});
  }
  catch(e){
    res.status(500).json({error:e});
    console.log('Get Expense is fail',e);
  }
}
