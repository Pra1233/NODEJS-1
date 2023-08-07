// const Sequelize=require('sequelize');
// const sequelize=new Sequelize('node-complete','root','prabhat',    //object creation
// {dialect:'my-sql',                //connect mysql database only
// host:'localhost'                   //bydefault optional
// });    
// module.exports=sequelize; 



// sequelize use mysql behind
const mysql=require('mysql2');
const pool=mysql.createPool({//pool of connection
host:'localhost', // running on local machine
user:'root',
database:'node-complete',
password:'prabhat', //installation
});  
module.exports=pool.promise();//app.js