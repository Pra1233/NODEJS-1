const  Sequelize = require('sequelize');
const sequelize=require('../util/database');
const User=sequelize.define('ORDER',{//name of table
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
}

});
module.exports=User;