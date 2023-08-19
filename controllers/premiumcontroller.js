const User=require('../models/Signup');
const Expense=require('../models/Expense');
const sequelize=require('../util/database');

exports.leaderboard=async(req,res)=>{
    try{
    const users=await User.findAll();
    const expenses=await Expense.findAll();
    const userAggregatedExpenses={};
    console.log(expenses);
    // {
        // "ram":123, //name-expense
        //"shyam";234,
    // }
    expenses.forEach((expense)=>{
        if( userAggregatedExpenses[expense.UserId]){//already exist keep adding
    userAggregatedExpenses[expense.UserId]=userAggregatedExpenses[expense.UserId]+expense.amount;    
        }
        else{
            userAggregatedExpenses[expense.UserId]=expense.amount  
        }
    })
    var userLeaderBoardDetails=[];
    users.forEach((user)=>{
        console.log("User",user);
        userLeaderBoardDetails.push({name:user.name ,total_cost:userAggregatedExpenses[user.id]})
    })

    console.log("e342",userLeaderBoardDetails);
    userLeaderBoardDetails.sort((a,b)=>b.total_cost -a.total_cost)
    res.status(200).json(userLeaderBoardDetails);
    }
    catch(e){
        console.log(e);
        res.status(500).json({error:err,message:'Something went wrong'}); 
    }
    }