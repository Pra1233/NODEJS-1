const express = require('express');
const bodyParser = require('body-parser');
const User=require('../models/User');
const app = express();
// app.use (cors ());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

exports.postAddExpense=async(req,res,next)=>{
    try{
const price=req.body.price;
const dish=req.body.dish;
const select=req.body.select;
const data= await User.create({price:price,dish:dish,select:select});
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
const uid=req.params.id;
await User.destroy({where:{id:uid}});
res.status(200).json({msg:"Deleted Successful"})
}
catch(e){
    res.status(500).json({error:m});
    console.log('Delete user is fail',e);
}
}  

// try{
//     if(!req.params.id){
//     res.status(400).json({err:'Not define ID'});
//     console.log("Id Is Missing");
//     }
//  const uid=req.params.id;//url
// await User.destroy({where:{id:uid}});
// res.status(200).json({msg:"Deleted Succeed"})
// }
// catch(e){
//     res.status(500).json({error:m});
//     console.log('Delete user is fail',e);
// }