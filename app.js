const path = require('path');
const cors=require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const userController=require('./controllers/Usercontroller');

// const Sequelize=require('sequelize');
const sequelize=require('./util/database');
const userRoutes=require('./routes/UserRoutes');

const app = express();
app.use (cors ());

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoutes);//all routes
// {force:true}
sequelize.sync().then(()=>{
    app.listen(3000);
})
.catch(e=>console.log(e));


