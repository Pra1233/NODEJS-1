const User=require('../models/Signup');
const Expense=require('../models/Expense');
const sequelize=require('../util/database');

exports.leaderboard=async(req,res)=>{
    try{
    const leaderboardusers=await User.findAll({
        attributes:['name','id',[sequelize.fn('sum',sequelize.col('amount')),'total_cost']], //takeout name,id,totalcost
        include:[             //include which tbel
           {
            model:Expense,
            attributes:[]
           } 
        ] , 
        group:['user.id'] ,
        order:[['total_cost','DESC']]// col totalcost to desc                             
    });

    console.log(leaderboardusers);
    res.status(200).json(leaderboardusers);
    }
    catch(e){
        console.log(e);
        res.status(500).json({error:e,message:'Something went wrong'}); 
    }
    }