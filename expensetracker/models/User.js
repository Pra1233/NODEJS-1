const  Sequelize = require('sequelize');
const sequelize=require('../util/database');
const User=sequelize.define('ExpenseTracker',{
id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
},
amount:{
type:Sequelize.INTEGER,
allowNull:false,
},

description:{
    type:Sequelize.STRING,
},

category:{
    type:Sequelize.STRING,
    allowNull:false,
}

});
module.exports=User;