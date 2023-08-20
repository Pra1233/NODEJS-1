const path = require('path');
const cors=require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const userController=require('./controllers/Usercontroller');


const User=require('./models/Signup');
const Expense=require('./models/Expense');
const Order=require('./models/orders');

// const Sequelize=require('sequelize');
const sequelize=require('./util/database');
const userRoutes=require('./routes/UserRoutes');
const expenseRoutes=require('./routes/ExpenseRoutes');
const purchaseRoutes=require('./routes/purchaseRoutes');
const premiumRoutes=require('./routes/premiumRoutes');

const app = express();
app.use (cors ());

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);//all routes
app.use(expenseRoutes);
app.use('/purchase',purchaseRoutes);
app.use(premiumRoutes);

User.hasMany(Expense); //user primary key store in expense as foreign key
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);


// {force:true}
sequelize.sync().then(()=>{
    app.listen(3000);
})
.catch(e=>console.log(e));


