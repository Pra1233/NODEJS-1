const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', { //add-[roduct]
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false, //edit
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/'); 
};

exports.getEditProduct = (req, res, next) => {//2
  const editMode=req.query.edit; //query parameter url give value extracted value is
   //" true"  (if edit mode empty than false)
   if(!editMode){
    return res.redirect('/');
   }
   const id=req.params.productId;   // line 15 route
   Product.findById(id,product=>{
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', { //  show file
      pageTitle: 'Edit Product', //passing to ejs
      path: '/admin/edit-product',
      editing:editMode,
      product:product,
    });
   })
};

exports.postEditProduct = (req, res, next) => {
//create new product remove existing product
const prodId=req.body.productId; //hidden in ejs
const updatedTitle=req.body.title;  
const updatedPrice=req.body.price;
const updatedImageUrl=req.body.imageUrl;
const updatedDescription =req.body.description;
const updatedProduct=new Product(prodId,updatedTitle,updatedImageUrl,updatedPrice,updatedDescription);
updatedProduct.save();
res.redirect('/admin/products');
}; 

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
