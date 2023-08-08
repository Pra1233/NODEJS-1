const  Sequelize = require('sequelize');
const sequelize=require('../util/database');
const User=sequelize.define('username',{
id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
},
name:Sequelize.STRING,

email:{
    type:Sequelize.STRING,
    unique:true,
},

phone:{
    type:Sequelize.STRING,
    unique:true,   
}

});
module.exports=User;