const express = require('express');
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');
const bodyParser = require('body-parser');
const Signup=require('../models/Signup');
const Expense=require('../models/Expense');
const app = express();
// app.use (cors ());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

function isstringValid(string){
if(string==undefined||string.length===0)return true;
else return false;
}
exports.postSignup=async(req,res,next)=>{
    try{
        const {name,email,password}=req.body;
if(isstringValid(name)||isstringValid(email)||isstringValid(password)){
    document.body.innerHTML+=`<h3 style="color:red;">${e}</h3>` 
    return res.status(400).json({e:"Bad Parameter, Something is missing"});
        }

    let salt=10;
    bcrypt.hash(password,salt,async(err,hash)=>{
        const response=await Signup.create({name,email,password:hash});
        res.status(201).json({UserDetail:response})
    })    

    }
    catch(e){
        res.status(500).json(e);
        console.log("ERROR In PostAddUser",e);
    }
}

function generateToken(id,name){
    return jwt.sign({userId:id,name:name},'secretkey');
}

exports.postLogin=async(req,res,next)=>{
    try{

        const {email,password}=req.body;
if(isstringValid(email)||isstringValid(password)){
    document.body.innerHTML+=`<h3 style="color:red;">${e}</h3>` 
    return res.status(400).json({e:"Bad Parameter, Something is missing"});
        }
    const user=await Signup.findAll({where:{email}});//where will give  user of that email
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,resp)=>{
               if(err){
                throw new Error("Something is wrong");
               }
                
                if(resp==true){
                 return  res.status(200).json({success:true, message:'User Logged Successfully',token:generateToken(user[0].id,user[0].name)});
                  
                }
                else{
                 return    res.status(400).json({success:false, message:'Password is Incorrect'});
                 }
            })
        }

       else{
            res.status(404).json({success:false,message:'User Doesnt Exist'})
       }
    
    }
   catch(e){
    res.status(500).json({success:false,message:e});
    console.log("ERROR In PostLogin",e);
   }
    
}
  





