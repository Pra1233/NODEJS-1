
const Sequelize=require('sequelize');
const sequelize =new Sequelize('node-complete','root','prabhat',{
  dialect:'mysql',
  host:'localhost'
});
module.exports=sequelize;
