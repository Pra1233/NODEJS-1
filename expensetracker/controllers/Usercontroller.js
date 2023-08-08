
const cors=require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize=require('../util/database');
const User=require('../models/User');
const app = express();
app.use (cors ());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

exports.postAddExpense=async(req,res,next)=>{
    try{
     const amount=req.body.amount;
     const description=req.body.description;
     const category=req.body.category;
     const data= await User.create({amount:amount, description:description, category:category});
     res.status(201).json({newUserDetail:data}) 
    }
    catch(e){
        res.status(404).json({error:e});
    }
    }

exports.getExpense = async (req, res, next) => {
        try{
            const users=await User.findAll();
            res.status(200).json({allUsers:users});  
        }
    catch(e){
        console.log('Get user is fail',JSON.stringify(e));
        res.status(500).json({error:e});
    } 
  };

exports.deleteExpense=async(req,res)=>{
    try{
        if(!req.params.id){
        res.status(400).json({err:'Not define ID'});
        console.log("Id Is Missing");
        }
     const uid=req.params.id;//url
    await User.destroy({where:{id:uid}});
    res.status(200).json({msg:"Deleted Succeed"})
    }
    catch(e){
        res.status(500).json({error:m});
        console.log('Delete user is fail',e);
    }
}  