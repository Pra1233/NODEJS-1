const path = require('path');
//Importing product,User
const Product=require('./models/product');
const User=require('./models/user');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{ // req.user sequelize object which hold /database data for user as well helper method                        
  User.findByPk(1).then(user=>{ //database data for user as well helper method
    req.user=user;
    next();
  })
  .catch(e=>console.log(e));
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
User.hasMany(Product);
//sync({force:true});
sequelize.sync()
.then(result => {
    return User.findByPk(1);   //return promise 
  })
.then(user=>{
 if(!user){
  return User.create({name:'Prakash',email:'p@dfdds'});//promise
 }
 return user; //object
}) 
.then(user=>{ //promise of above  user create
  console.log(user);
  app.listen(3000);
}) 
  .catch(err => {
    console.log(err);
  });
