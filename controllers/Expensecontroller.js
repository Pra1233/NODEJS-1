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


// const response=await Expense.create({amount,description,category,userId:req.user.id});//user.id attach in middleware
const response=await req.user.createExpense({amount,description,category});
res.status(201).json({expense:response})
  }
  catch(e){
      res.status(500).json(e);
  }
}

exports.deleteExpense=async(req,res)=>{
  const id=req.params.id; 
  try{
    if(!req.params.id ||id.length===0){
      res.status(400).json({err:'Not define ID'});
      console.log("Id Is Missing");
      }  
    
   const noofrows= await Expense.destroy({where:{id:id, userId:req.user.id}});//authenticate user only allowed to delete
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

// const expenses=await Expense.findAll({where:{userId:req.user.id}});
const expenses=await Expense.findAll();
  res.status(200).json({success:true,getExpense:expenses});
  }
  catch(e){
    res.status(500).json({error:e});
    console.log('Get Expense is fail',e);
  }
}
