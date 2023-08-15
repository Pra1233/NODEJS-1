const express = require('express');
const bodyParser = require('body-parser');
const Signup=require('../models/Signup');
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
       const response=await Signup.create({name,email,password});
       res.status(201).json({UserDetail:response})
    }
    catch(e){
        res.status(500).json(e);
        console.log("ERROR In PostAddUser",e);
    }
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
            if(user[0].password===password){
                res.status(200).json({success:true, message:'User Logged Successfully'});
                }
                else{
                   res.status(400).json({success:false, message:'Password is Incorrect'});
                }
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
    

