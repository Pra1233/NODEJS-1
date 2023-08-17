const express = require('express');
const bcrypt =require('bcrypt');
const bodyParser = require('body-parser');
const Expense=require('../models/Expense');
const app = express();
// app.use (cors ());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));


function isstringValid(string){
if(string==undefined||string.length===0)return true;
else return false;
}

exports.postExpense=async(req,res)=>{
  try{
const {amount,description,category}=req.body;
if(isstringValid(amount)||isstringValid(description)||isstringValid(category)){
  document.body.innerHTML+=`<h3 style="color:red;">${e}</h3>` 
  return res.status(400).json({e:"Bad Parameter, Something is missing"});
      }

      const response=await req.user.createExpense({amount,description,category});
// const response=await Expense.create({amount,description,category,userId:req.user.id});//user.id attach in middleware
res.status(201).json({expense:response})
  }
  catch(e){
      res.status(500).json(e);
  }
}

exports.deleteExpense=async(req,res)=>{
  const id=req.params.id; 
  try{
    if(!req.params.id){
      res.status(400).json({err:'Not define ID'});
      console.log("Id Is Missing");
      }  
    
     await Expense.destroy({where:{id:id}});
    res.status(200).json({success:true, msg:"Deleted Successful"})
  }
  catch(e){
    res.status(500).json({error:e});
    console.log('Delete user is fail',e);
}
  
}

exports.getExpenses=async(req,res)=>{
  try{
 const expenses= await req.user.getExpenses();
    res.status(200).json({success:true,getExpense:expenses});
// const response=await Expense.findAll({where:{userId:req.user.id}});
// res.status(200).json({success:true,getExpense:response});
  }
  catch(e){
    res.status(500).json({error:e});
    console.log('Get Expense is fail',e);
  }
}
