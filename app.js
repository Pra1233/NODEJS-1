const path = require('path');
const cors=require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const userController=require('./controllers/Usercontroller');


const User=require('./models/Signup');
const Expense=require('./models/Expense');

// const Sequelize=require('sequelize');
const sequelize=require('./util/database');
const userRoutes=require('./routes/UserRoutes');
const expenseRoutes=require('./routes/ExpenseRoutes');

const app = express();
app.use (cors ());

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

User.hasMany(Expense); //user primary key store in expense as foreign key
Expense.belongsTo(User);



app.use(userRoutes);//all routes
app.use(expenseRoutes);
// {force:true}
sequelize.sync().then(()=>{
    app.listen(3000);
})
.catch(e=>console.log(e));


