const db=require('../util/database');
const Cart = require('./cart');

module.exports = class Product { //add new product admin.js
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() { //reach the database and save data there
   return  db.execute('Insert into products (title,price,description,imageUrl) values(?,?,?,?)',
    [this.title,this.price,this.description,this.imageUrl]);
   
  }

  static deleteById(id) {
   return db.execute('Delete from products where products.id =?',[id]);
  }

  static fetchAll() { //called in shop.js 25
 return  db.execute('SELECT * FROM products') //return promise
  }

  static findById(id) {
return db.execute('select * from products where products.id= ?',[id]);
  }
};
