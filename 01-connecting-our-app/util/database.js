const mysql=require('mysql2');
const pool=mysql.createPool({//pool of connection
host:'localhost', // running on local machine
user:'root',
database:'node-complete',
password:'prabhat', //installation
});  
module.exports=pool.promise();//app.js