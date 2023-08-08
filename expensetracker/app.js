const path = require('path');
const cors=require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const userController=require('./controllers/Usercontroller');

// const Sequelize=require('sequelize');
const sequelize=require('./util/database');
const User=require('./models/User');

const app = express();
app.use (cors ());

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/user/addexpense',userController.postAddExpense);

app.get('/user/getexpense',userController.getExpense);

app.delete('/user/expensedelete/:id',userController.deleteExpense);

sequelize.sync().then(()=>{
    app.listen(3000);
})
.catch(e=>console.log(e));


