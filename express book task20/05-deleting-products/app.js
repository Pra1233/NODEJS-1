const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Product=require('./models/product');
const User=require('./models/user');
const Cart=require('./models/cart');
const CartItem=require('./models/cart-item');

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

//Association
Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
User.hasMany(Product);

User.hasOne(Cart);
// Cart.belongsTo(User);//optional
Cart.belongsToMany(Product,{through:CartItem}); //cart and product connection store in 
Product.belongsToMany(Cart,{through:CartItem});//optional

sequelize.
// sync({force:true})
sync()
.then(result => {
    return User.findByPk(1);   //return promise 
  })
.then(user=>{
 if(!user){
  return User.create({name:'Prakash',email:'p@dfdds'});//promise
 }
 return user; //object
}) 
.then(user=>{           //promise of above  user create
  console.log(user);        //if we get user
return user.createCart({});
}) 
.then(cart=>{
  app.listen(3000);
})
  .catch(err => {
    console.log(err);
  });
