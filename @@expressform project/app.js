const path = require('path');
const cors=require('cors');
const express = require('express');
const bodyParser = require('body-parser');

// const Sequelize=require('sequelize');
const sequelize=require('./util/database');
const User=require('./models/User');

const app = express();
app.use (cors ());


app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/user/adduser',async (req,res,next)=>{
    try{
        if(!req.body.phone){
            throw new Error('Phone no is mandatory'); 
        }
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
 const data= await User.create({name:name,email:email,phone:phone }) ;
 res.status(201).json({newUserDetail:data});  
    }
    catch(e){
        res.status(201).json({error:e});  
    }
})

app.get('/user/getuser',async (req,res)=>{
    try{
        const users=await User.findAll();
        res.status(200).json({allUsers:users});  
    }
catch(e){
    console.log('Get user is fail',JSON.stringify(e));
    res.status(500).json({error:e});
}
})

app.delete('/user/:id',async (req,res,next)=>{
try{
    if(!req.params.id){
        res.status(400).json({err:'Not define ID'});
        console.log("Id Is Missing");
    }
    const uid=req.params.id;
  await User.destroy({where:{id:uid}});
     res.sendStatus(200);
}
catch(e){
    console.log('Delete user is fail',e);
    res.status(500).json({error:e});
}
})

sequelize.sync().then(()=>{
    app.listen(3000);
})
.catch(e=>console.log(e));


