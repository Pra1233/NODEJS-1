const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  
  req.user.getCart().then((cart)=>{
    // console.log(cart);
    return cart.getProducts() //we can return product from cart 
    .then(products=>{ //becase of association  
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });                          
  })
  .catch(e=>console.log(e));
  })
  .catch(e=>console.log(e))
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
let fetchedcart;
let newQuantity = 1;
 req.user
 .getCart()
 .then(cart=>{
fetchedcart=cart; 
  return cart.getProducts({where:{id:prodId}}) //in cart product exist increment by 1
 })
 .then(products=>{//array of single product
  let product; //undefine
  if(products.length>0){
    product=products[0];
  }

  if(product){//not undefine
const oldQuantity=product.cartItem.quantity;//sequelize help us to access in between table
newQuantity=oldQuantity+1;
return product;
// return fetchedcart.addProduct(product,{through:{quantity:newQuantity}})
  }
  //not product found of that id
  return Product.findByPk(prodId);
})
  .then(product=>{ //adding product first time
   return fetchedcart.addProduct(product,{through:{quantity:newQuantity}}); 
 
})
.then(() => {
  res.redirect('/cart');
})
.catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
req.user.getCart()
.then(cart=>{
  return cart.getProducts({where:{id:prodId}});
})
.then(products=>{
 const product=products[0];
 return product.cartItem.destroy();
})
  .then((res)=>{
    res.redirect('/cart');
  })
  .catch(e=>console.log(e));


};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
