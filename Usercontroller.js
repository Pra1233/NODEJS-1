const express = require('express');
const bodyParser = require('body-parser');
const Signup=require('../models/Signup');
const app = express();
// app.use (cors ());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));


exports.postAddUser=async(req,res,next)=>{
    try{
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
 const response= await Signup.create({name:name,email:email,password:password})
       res.status(200).json({UserDetail:response})
    }
    catch(e){
        res.status(500).json({error:e});
        console.log("ERROR In PostAddUser",e);
    }
}
