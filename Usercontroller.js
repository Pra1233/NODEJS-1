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
exports.postAddUser=async(req,res,next)=>{
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
    //  const all=await Signup.findAll({where:{email:email}});
    // //  let element=all[0];
    //  if(all){
    //  console.log("User Already exist Please Login");
    //  res.status(500).json({error:element});
    //  }

  
//  const response= await Signup.create({name:name,email:email,password:password})