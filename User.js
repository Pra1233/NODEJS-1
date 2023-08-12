

const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const Order=sequelize.define('orderdetail',{

 id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
 },
 price:{
    type:Sequelize.INTEGER,
    allowNull:false,
 },
 dish:{
    type:Sequelize.STRING, 
 },

 select:{
    type:Sequelize.INTEGER,
    allowNull:false,
 },
 

})
module.exports=Order;