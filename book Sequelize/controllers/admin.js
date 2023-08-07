const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => { 
  const title = req.body.title;//input
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
  title:title,
  imageUrl:imageUrl,
  price:price,
  description:description,
  }) .then((result)=>{
console.log("created product");
res.redirect('/admin/products');
  })
  .catch(e=>console.log(e));

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId) //findbyid replace with findbyprimarykey also use findall 
  .then((product)=>{ 
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch(e=>console.log(e));
};

exports.postEditProduct = (req, res, next) => { //save edit product in database
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
  .then(product=>{
    product.title=updatedTitle;
    product.price=updatedPrice;
    product.imageUrl=updatedImageUrl;
    product.description=updatedDesc;
   return product.save(); //inbuit sequelize 
  })
  .then((result)=>{
 console.log("Product Updated");
 res.redirect('/admin/products'); //we  will not reload page
  }) //return then
  .catch(e=>console.log(e));

};

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(e=>console.log(e));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
 Product.findByPk(prodId).then(product=>{
  return product.destroy(); //inbuit sequelize 
 })
 .then((result)=>{ //then is of destroy, return promise
  console.log("Product Removed Successfull");
  res.redirect('/admin/products');
 })
 .catch(e=>console.log(e));

};
